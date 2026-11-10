// Inspogram service worker. Two jobs:
// 1. Receive photos and links shared from the phone's Share button.
// 2. Keep a copy of the app itself on the device, so it opens right away and works without signal.
//    The saved copy shows first, the newest one downloads behind it, and the page offers "Reload" when it changed.
const SHELL = "inspogram-shell-v1";
const FIREBASE = "https://www.gstatic.com/firebasejs/10.12.2/";
const PRECACHE = ["/", "/icon.svg", "/manifest.webmanifest", FIREBASE + "firebase-app.js", FIREBASE + "firebase-auth.js", FIREBASE + "firebase-firestore.js"];

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(SHELL).then(c => Promise.all(PRECACHE.map(u => c.add(u).catch(() => {})))));
});
self.addEventListener("activate", e => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k.startsWith("inspogram-shell-") && k !== SHELL) await caches.delete(k);
  await self.clients.claim();
})()));

// Tell the page that just opened that a newer copy is ready
async function announce(clientId) {
  for (let i = 0; i < 12; i++) {
    const c = clientId && await self.clients.get(clientId);
    if (c) { c.postMessage({ type: "shell-updated" }); return; }
    await new Promise(r => setTimeout(r, 500));
  }
}

// Saved copy first; fetch the newest copy behind it
async function staleFirst(e, key, isPage) {
  const cache = await caches.open(SHELL);
  const cached = await cache.match(key);
  const old = isPage && cached ? cached.clone() : null; // copy now: the original is handed to the page below
  const fresh = (async () => {
    const r = await fetch(isPage ? key : e.request);
    if ((!r.ok && r.type !== "opaque") || r.redirected) return r;
    let changed = false;
    if (old) { const [a, b] = await Promise.all([old.text(), r.clone().text()]); changed = a !== b; }
    await cache.put(key, r.clone());
    if (changed) await announce(e.resultingClientId);
    return r;
  })();
  if (cached) { e.waitUntil(fresh.catch(() => {})); return cached; }
  return fresh;
}

// Files that never change at their address: saved copy, or fetch once and keep
async function cacheFirst(e) {
  const cache = await caches.open(SHELL);
  const cached = await cache.match(e.request);
  if (cached) return cached;
  const r = await fetch(e.request);
  if (r.ok || r.type === "opaque") await cache.put(e.request, r.clone());
  return r;
}

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method === "POST" && url.origin === location.origin && url.pathname === "/share") { e.respondWith(share(e.request)); return; }
  if (e.request.method !== "GET") return;
  if (url.origin === location.origin) {
    if (url.pathname.startsWith("/__/")) return; // sign-in pages: always straight to the network
    if (e.request.mode === "navigate") {
      if (url.pathname === "/" || url.pathname === "/index.html") e.respondWith(staleFirst(e, "/", true));
      else if (url.pathname === "/privacy.html") e.respondWith(staleFirst(e, "/privacy.html", true));
      return;
    }
    if (/\.(svg|png|webmanifest)$/.test(url.pathname)) e.respondWith(staleFirst(e, url.pathname, false));
    return;
  }
  if (url.href.startsWith(FIREBASE) || url.origin === "https://fonts.gstatic.com") e.respondWith(cacheFirst(e));
  else if (url.origin === "https://fonts.googleapis.com") e.respondWith(staleFirst(e, e.request.url, false));
});

async function share(request) {
  const q = new URLSearchParams();
  try {
    const form = await request.formData();
    for (const k of ["title", "text", "url"]) { const v = form.get(k); if (v) q.set(k, v); }
    const file = form.getAll("photo").find(f => f && f.size);
    if (file) {
      const cache = await caches.open("inspogram-share");
      await cache.put("/shared-photo", new Response(file, { headers: { "Content-Type": file.type || "image/jpeg" } }));
      q.set("photo", "1");
    }
  } catch {}
  return Response.redirect("/?" + q.toString(), 303);
}

// Inspogram service worker. Its only job: receive photos and links shared from the phone's Share button.
// Everything else goes straight to the network, so new versions show up right away.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "POST" || url.pathname !== "/share") return;
  e.respondWith((async () => {
    const q = new URLSearchParams();
    try {
      const form = await e.request.formData();
      for (const k of ["title", "text", "url"]) { const v = form.get(k); if (v) q.set(k, v); }
      const file = form.getAll("photo").find(f => f && f.size);
      if (file) {
        const cache = await caches.open("inspogram-share");
        await cache.put("/shared-photo", new Response(file, { headers: { "Content-Type": file.type || "image/jpeg" } }));
        q.set("photo", "1");
      }
    } catch {}
    return Response.redirect("/?" + q.toString(), 303);
  })());
});

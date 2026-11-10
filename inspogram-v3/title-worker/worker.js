// Inspogram relay. Two jobs: a note in, a short title out (free OpenRouter model); a link in, its preview picture address and title out.
// The OpenRouter key lives only here, as the secret OPENROUTER_API_KEY. Only ":free" models are used, so it never costs money.
const ALLOWED_ORIGINS = ["https://getinspogram.web.app", "https://inspogram-c738a.web.app", "https://inspogram-c738a.firebaseapp.com", "http://localhost:8766"];
const PER_MINUTE = 12;
const MODELS = ["google/gemma-4-31b-it:free", "nvidia/nemotron-3.5-lightning:free", "google/gemma-4-26b-a4b-it:free"];

import { DurableObject } from "cloudflare:workers";

// One small counter per visitor. Allows `limit` calls per `windowMs`.
export class Counter extends DurableObject {
  async allow(limit, windowMs) {
    const now = Date.now();
    let w = (await this.ctx.storage.get("w")) || { n: 0, reset: 0 };
    if (now > w.reset) w = { n: 0, reset: now + windowMs };
    w.n++;
    await this.ctx.storage.put("w", w);
    return w.n <= limit;
  }
}

// Link preview: read the start of a page and return its preview picture's address and its title. Nothing is stored.
async function preview(link) {
  try {
    const u = new URL(link);
    if (!/^https?:$/.test(u.protocol) || !u.hostname.includes(".") || /^[\d.]+$/.test(u.hostname) || u.hostname.includes(":")) return {};
    const ctl = new AbortController(); const timer = setTimeout(() => ctl.abort(), 5000);
    const res = await fetch(u.href, { signal: ctl.signal, redirect: "follow", headers: { "User-Agent": "Mozilla/5.0 (compatible; InspogramPreview/1.0)", "Accept": "text/html" } });
    if (!res.ok || !(res.headers.get("Content-Type") || "").includes("html")) { clearTimeout(timer); return {}; }
    // Only the first 150 KB: the tags we need are in the page head
    const reader = res.body.getReader(), dec = new TextDecoder(); let html = "";
    while (html.length < 150000) { const { done, value } = await reader.read(); if (done) break; html += dec.decode(value, { stream: true }); }
    reader.cancel().catch(() => {}); clearTimeout(timer);
    const un = s => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#0?39;|&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();
    const meta = name => {
      for (const tag of html.match(/<meta\b[^>]*>/gi) || []) {
        if (!new RegExp(`(?:property|name)\\s*=\\s*["']${name}["']`, "i").test(tag)) continue;
        const c = tag.match(/content\s*=\s*"([^"]*)"|content\s*=\s*'([^']*)'/i);
        if (c) return un(c[1] ?? c[2] ?? "");
      }
      return "";
    };
    let image = meta("og:image") || meta("og:image:secure_url") || meta("twitter:image");
    try { image = image ? new URL(image, res.url || u.href).href : ""; } catch { image = ""; }
    if (!/^https:/.test(image)) image = "";
    const title = (meta("og:title") || un((html.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1] || "")).slice(0, 120);
    return { image: image.slice(0, 1000), title };
  } catch { return {}; }
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const cors = {
      "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin"
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST" || !ALLOWED_ORIGINS.includes(origin)) return new Response("Not allowed", { status: 403, headers: cors });
    // Limit each visitor (by IP) with an exact per-visitor counter
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const ok = await env.COUNTER.get(env.COUNTER.idFromName(ip)).allow(PER_MINUTE, 60000);
    if (!ok) return Response.json({ error: "Too many requests" }, { status: 429, headers: cors });

    let note = "", body = {};
    try { body = await request.json(); note = String(body.note || "").slice(0, 2000).trim(); } catch {}
    if (body.url) return Response.json(await preview(String(body.url)), { headers: cors });
    if (!note) return Response.json({ error: "No note" }, { status: 400, headers: cors });

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": "Bearer " + env.OPENROUTER_API_KEY, "Content-Type": "application/json", "X-Title": "Inspogram" },
      body: JSON.stringify({
        models: MODELS,
        max_tokens: 1000,
        reasoning: { enabled: false, exclude: true },
        temperature: 0.3,
        messages: [
          { role: "system", content: "You write titles for saved design and course inspiration. Read the whole note and reply with one title of 2 to 6 words that captures its main idea. Sentence case. No quotes, no ending punctuation, no em dashes. Reply with the title only." },
          { role: "user", content: note }
        ]
      })
    });
    if (!res.ok) return Response.json({ error: "Model error " + res.status }, { status: 502, headers: cors });
    const data = await res.json();
    let title = (data.choices?.[0]?.message?.content || "").split("\n").map(s => s.trim()).filter(Boolean)[0] || "";
    title = title.replace(/^title:\s*/i, "").replace(/^["'“”*]+|["'“”*.!]+$/g, "").replace(/\s*[—–]\s*/g, ", ").trim().slice(0, 80);
    // Title Case -> Sentence case (only when every word is capitalized, so real names in a normal title survive)
    const ws = title.split(" ");
    if (ws.length > 1 && ws.every(w => /^[A-Z]/.test(w))) title = ws.map((w, i) => i === 0 || /^[A-Z0-9]{2,}$/.test(w) ? w : w.toLowerCase()).join(" ");
    if (!title) return Response.json({ error: "Empty title", model: data.model, finish: data.choices?.[0]?.finish_reason }, { status: 502, headers: cors });
    return Response.json({ title }, { headers: cors });
  }
};

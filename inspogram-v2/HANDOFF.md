# Inspogram — Codex handoff: rebuild with OpenRouter free models, compare side by side

Date: 2026-11-05
Live app: https://inspogram-c738a.web.app/
Firebase project: inspogram-c738a, Spark plan (free, no card, no billing)
Current code: `index.html` in this folder, plus `firestore.rules` below

## Copy-paste prompt for Codex

```
You are rebuilding Inspogram, a design-inspiration capture app, using only
free models on OpenRouter. Do not use any paid model. Do not spend money.

SETUP — OpenRouter, free models only
1. Use the OpenRouter API at https://openrouter.ai/api/v1 (OpenAI-compatible).
   Use the API key already in my environment as OPENROUTER_API_KEY.
   If there is no key, stop and tell me where to put it. Never hardcode a key,
   never commit one, never print one.
2. Before you start coding, call GET https://openrouter.ai/api/v1/models and
   list the models with pricing.prompt = 0 and pricing.completion = 0.
   Free models change often, so do not trust a remembered list.
   Record the exact model IDs you found, with their context limits.
3. Try coding models in this order, falling back to the next one only if the
   first is unavailable, rate-limited, or produces bad output:
   - cohere/north-mini-code:free (256k context, built for coding)
   - recursive/flint-v1.0:free (262k context, built for coding agents)
   - dots-studio/dots-3-note-preview:free (512k context, long context;
     this was a preview, check it is still listed)
   - nvidia/nemotron-3.5-lightning:free (1M context, fast)
   - google/gemma-4-26b-a4b-it:free (262k context, multimodal)
   - thinkingmachines/inkling:free (1M context)
   Do NOT use openrouter/free as your main model: it picks a random free
   model per request. Do NOT use openrouter/auto: it routes to paid models.
4. Record which model actually did each piece of work, and the response
   model ID returned by OpenRouter. If a model fails, note the error and
   move to the next one. Keep a short log: model, task, result.

THE APP — what it must do
Rebuild the full app from the code pasted below, in a NEW folder called
inspogram-v2, as index.html. Do not overwrite the live app or index.html.

- Single HTML file, Firebase JS SDK 10.12.2 via CDN, same Firebase config
  as below (project inspogram-c738a).
- Sign-in: Google, or email and password. Signed-out landing: Option 3
  design, a static, non-clickable phone mock above the sign-in card showing
  an "Apricot storefront" capture with palette swatches, tagline
  "Capture and catalog whatever inspires you.", no camera/microphone icons
  on the sign-in page, no feature explainer below sign-in. Hide the phone
  mock once signed in.
- Signed-in app: boards ("canvases") with owner / viewer / commenter roles,
  invite by email (invitee must have signed in once first), custom categories,
  capture flow: photo first (compress to max 860px wide, JPEG ~0.78, keep the
  data URL under 950,000 characters so it fits a Firestore document),
  dictate with Web Speech API or type "what stands out", auto-suggested
  short title (max 6 words, locked once the user edits it) and auto-guessed
  category from keywords, then Save. Cards: search, filter by category,
  comment, remove (owner only). Compile view: pick categories, sample colors
  from saved photos in the browser, build a copyable Markdown summary.
- Style: seafoam #1F6357, apricot #F29B76, navy #16202E, slate #5C6675,
  paper #F6F5F1, DM Sans. Sleek, modern, minimalist. No all-caps labels,
  no em dashes. Small seafoam and apricot sparkles in their own rows
  between sections, never over text. Camera and microphone tiles inside
  the signed-in app only.

HARD CONSTRAINTS — do not break these
- Firebase Spark plan: no billing, no Blaze, no Cloud Storage. Photos live
  in Firestore documents only, under the 1 MiB document limit.
- Do not change Firestore rules unless you say exactly what changed and why.
  The rules below are the live ones.
- Do not change billing, auth providers, or the Firebase project.
- Do not touch the live Hosting site. Test locally first, then use a
  Firebase Hosting preview channel for the v2 build.

THE BUG TO FIX FIRST
On Nov 3, saving said "Capture saved" but saved items did not appear, even
when filtering. The current code already tries a fix: loadCaptures queries
by boardId only (no combined where + orderBy, which needed a missing
Firestore composite index and failed silently), sorts client-side, and shows
a load error on screen if loading fails.
Your job: find the real root cause, do not just trust that fix.
- Reproduce it: sign in, save a capture with a photo, refresh, check it shows.
- Check every step: does addDoc succeed, does the boardId on the saved
  capture match the board being viewed, does the onSnapshot listener fire,
  does the filter/search state hide it, does a Firestore rules read fail?
- Make failure visible: a save must never say "Capture saved" unless the
  new capture is confirmed readable afterwards. If loading fails, show the
  error on screen with what failed. If saving fails, show that error instead.
- Only call it fixed when a saved capture survives a refresh and shows in
  the list, with a photo, title, and category.

SIDE-BY-SIDE COMPARISON
Deliver, in inspogram-v2/:
1. index.html — the full rebuilt app.
2. CHANGES.md — what you changed vs the original, model used for each
   change, and what you could not fix.
3. TESTS.md — every check you ran, with pass/fail: sign in with Google,
   sign in with email, save a capture with photo, refresh and confirm it
   shows, filter by category, search, comment, remove, compile summary,
   invite flow, landing page on mobile width and desktop width.
4. A Firebase Hosting preview URL for the v2 build, so it can be compared
   side by side with https://inspogram-c738a.web.app/ without touching live.

Report back in plain language, short: what you fixed, what model did it,
what is still broken, and the preview link.
```

## What to know before running it

- OpenRouter free limits: 50 requests/day on a free account, 1,000/day after a one-time $10 credit top-up. Clea already topped up $10 once, so the higher cap should apply, but Codex should check the key/account, not assume it.
- Free models change often. The list above was checked Nov 5, 2026 against OpenRouter's models API via web search. Codex must re-check live before coding.
- The Firebase web API key in the code is a public web identifier, not a secret. It is already in the live app. Do not treat it as a password, and do not add a real secret anywhere.
- Do not deploy v2 to the live Hosting site. Preview channel only.

## Full code — current live app

### index.html

 if you need the current code, the index.html is in my downloads
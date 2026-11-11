---
type: project-next
updated: 2026-11-10
aliases: [Inspogram v3 next]
---
# Inspogram v3: next steps

Related ideas: [[hub-making-things]]

Fresh rebuild. Replaces v2. Live URL once deployed: https://getinspogram.web.app/

## What it does
- Same landing page and sign-in (Google or email) as v2.
- Signed in: a grid of saves, like Pinterest. A + button saves a photo, pasted screenshot, link, or note. Dictation works.
- Tags (many per save) and boards (a save can be on several boards).
- Select mode: pick any saves, tap "Make something", choose Website theme, Course plan, or Custom brief, then copy the brief into Claude. "Download photos" saves the matching images to attach.
- Each person's saves are private to their own account. Anyone can sign up.
- Phone users can add it to their home screen. On Android, it shows up in the share menu.

## Files
- `public/index.html`: the whole app.
- `firestore.rules`: database rules. Each person can read and write only `users/{their id}/...`.
- `firebase.json`, `.firebaserc`: deploy settings for project inspogram-c738a.

## Status
- Tested in demo mode (`?demo` on the URL, saves stay in the browser): save photo, link, and note; tags; boards; edit; search; select; build brief; phone width. All passed.
- Deployed 2026-11-09. Live site serves v3. Real sign-in and save not tested yet.

## Steps
- [x] Clea: run `firebase login` once in Terminal (opens a browser to sign in to Google).
- [x] Deploy rules and app: `cd ~/Desktop/clea-vault-main/Projects/ai-experiments/inspogram-v3 && firebase deploy --only firestore:rules,hosting`
- [x] Phone sign-in fix: redirect URI added in Google Cloud, fix switched on and deployed (2026-11-10).
- [x] Clea: on your phone, in Safari, sign in with Google at https://getinspogram.web.app. (Clea confirmed sign-in works, 2026-11-10.)
- [ ] Deploy the quick save build. It is on branch `claude/inspogram-quick-save`, not deployed yet: run `firebase deploy --only hosting:main` from that branch's `inspogram-v3` folder.
- [ ] Live tests, main Google account: save a photo, refresh, confirm it is still there. Paste a screenshot and a link on the page (each should save with no sheet). Second visit opens with Wi-Fi off.
- [ ] Live tests, throwaway email account: Create account, save one thing, Delete account.
- [ ] Live test, Android phone signed in: share a photo and a link from another app to Inspogram.

## Next builds (proposed 2026-11-10, in order)
- [x] Quick save: paste or share goes straight in with one tap. Title, tags, and board fill in afterward.
- [x] Link saves fetch the page's preview image and title (through the Worker), so links stop being text-only cards.
- [x] Offline (saves are cached on the device, photo saves queue offline, and the app itself is kept on the device): turn on Firestore's local cache and cache the app shell, so it opens instantly and saves without signal.
- [ ] Resurface: a "Rediscover" row of older saves, plus "related saves" (shared tags and colors) in the detail view.
- [ ] Search by color and by type (photo, link, note). The colors are already stored on each save.
- [x] Keep one small reference image per save (about 800px, under 150 KB) and stop storing the full-size copy. Stays on Firebase's free plan; no Firebase Storage (it needs the paid plan). Clea, 2026-11-10: no paid tools, and Inspogram is not a photo storage tool. The image only needs to be good enough for a brief.
- [ ] Brief straight to Claude: a "Open in Claude" button, and one zip for the photos instead of N downloads.
- [ ] Text and color-swatch cards on the canvas, so a board can hold a label or a palette.

## AI titles (done)
- [x] Clea: `npx wrangler login` in Terminal (opens browser, free Cloudflare account).
- [x] Claude: deploy `title-worker/` (live at https://inspogram-title.title-worker.workers.dev) and put its URL in `TITLE_API` in `public/index.html`, then redeploy hosting.
- [x] Clea: added the key from `~/.config/openrouter/key` as the Worker secret.

## Later ideas
- Shared boards (invite someone to view or add to a board).
- Browser bookmarklet to save the page you are on.

## Log
- 2026-11-06 (Claude Opus 5.5): Built v3 from scratch. Old v1/v2 data in top-level `boards` and `captures` is not carried over and becomes unreadable once the new rules are deployed (nobody was using it).
- 2026-11-09 (Claude Opus 5.5): Logged in to Firebase from Clea's phone (`firebase login --no-localhost`), deployed rules and hosting.
- 2026-11-09 (Claude Opus 5.5): Added a "Save inspiration" button at the top (round + button now phone only). Sheets close only with the X, so clicking outside no longer loses a draft. Deployed.
- 2026-11-09 (Claude Opus 5.5): Tag suggestions (your tags, most used first, filtered as you type). Titles now come from the most representative sentence of the whole note. AI title relay written in `title-worker/` (Cloudflare Worker, free OpenRouter models); app calls it once `TITLE_API` in index.html is set. Deployed.
- 2026-11-09 (Claude Opus 5.5): AI titles live. Worker turns off model thinking (free models used up the token budget thinking and returned nothing) and converts Title Case to sentence case. To redeploy the worker: `cd title-worker && npx wrangler deploy`.
- 2026-11-09 (Claude Opus 5.5): New address https://getinspogram.web.app (inspogram.web.app was taken). Old address redirects there. Added it to sign-in authorized domains and to the title relay. firebase.json now has two hosting targets: main (getinspogram) and original (redirect).
- 2026-11-09 (Claude Opus 5.5): Impeccable critique scored 24/40 (report in `../.impeccable/critique/`). Clea chose "bold and confident" and asked for minimal wording. Redesign, deployed:
  - Navy board rail on desktop, plus a big page title.
  - Two chip styles, no hashtags, 5 fixed tag suggestions.
  - Note and link cards are solid navy and seafoam.
  - Details open view-first, with Edit behind a button.
  - Boards are named inline. Deletes have an Undo toast.
  - "Make a brief" has one Copy button and a preview.
  - Landing has a big headline and an example collage.
  - Shortcuts: n for new, / for search.
  - The Boards tab is removed; boards are filters now.
  - Next: rerun `/impeccable critique` to compare.
- 2026-11-09 (Claude Opus 5.5): Boards are now free-form moodboard canvases. Deployed.
  - Move: drag a card.
  - Resize: pinch (phone or trackpad), drag the corner, or use + / − on the keyboard. Arrow keys move.
  - The layout saves on the board doc as `layout: {itemId: {x, y, w, z}}`.
  - New cards drop in below the arranged ones.
  - A board wider than the screen zooms out to fit.
  - "Grid" switches a board back to the grid; the choice is remembered per browser.
- 2026-11-09 (Claude Opus 5.5): Board canvas extras, deployed.
  - Cards snap to nearby card edges while you drag, with an apricot guide line, or to an 8px grid. Hold Alt to place freely.
  - Tidy keeps each cluster in place and lines its cards up in rows.
  - Undo works from the toast or with ⌘Z/Ctrl+Z (this visit only).
  - A keyboard hint appears only when a card is focused from the keyboard.
  - The main page is no longer cached, so deploys show up right away.
  - Decided against saved layout versions for now: one layout plus Undo. Revisit with "duplicate board" if variants are needed.
- 2026-11-09 (Claude Opus 5.5): Lasso to brief, deployed. Drag across empty canvas (mouse) or press-and-hold then drag (touch) to select a cluster. That opens select mode with "Make a brief". Shift or select mode adds to the current selection. A normal swipe still scrolls. Select mode stays as the keyboard and screen reader path.
- 2026-11-10 (Claude Opus 5.5): Critique rerun scored 25/40 (up from 24). Fixed what Clea picked, deployed:
  - Phone boards stop shrinking at 60% and scroll sideways. Corners have a bigger touch target.
  - Rename and Delete moved into a "⋯" menu, and board tools sit on their own row.
  - Search keeps a minimum width, and buttons no longer jump in select mode.
  - The brief shows open. Its type comes from the selected saves' tags, or the last type you used.
  - A one-time canvas tip explains the lasso.
  - Next: rerun the critique.
- 2026-11-10 (Claude Opus 5.5): Critique run 3 scored 27/40. Fixed all five issues, deployed:
  - After "Copy brief", the sheet says "Copied. Paste into Claude, then attach N photos." Download photos becomes the main button.
  - The brief preview starts closed.
  - Error messages are plain sentences. Layout saves retry once before showing an error.
  - Undo pop-ups stay 10 seconds and pause while hovered or focused.
  - "Canvas | Grid" is a two-part switch. Brief type buttons work with arrow keys.
  - Next: rerun the critique.
- 2026-11-10 (Claude Opus 5.5): Critique run 4 scored 31/40. Fixed all five, deployed:
  - Board cards no longer cover the select bar.
  - On touch, a swipe scrolls; press and hold a card to drag it. Pinch still resizes.
  - Deleting a save names it, and focus moves to Undo.
  - Phone buttons and chips are at least 44px tall.
  - Tidy is a boxed button after Canvas | Grid.
  - Dictation now says why it failed instead of failing silently (blocked mic, no speech service, no mic, dictation off). Clea reported the mic not working on a fresh account; cause not yet known.
- 2026-11-10 (Claude Opus 5.5): Mic cause found: Chrome's input had switched to an NDI virtual device, so it heard silence. Not a code bug. Dictation now says "Can't hear you" when Chrome gets only silence.
- 2026-11-10 (Claude Opus 5.5): Launch prep, deployed:
  - Share from phone: installable app with a share target for photos, links, and text (`sw.js` + manifest). Works on Android Chrome. iPhone can't receive shares from web apps; it gets an "Add to Home Screen" tip instead.
  - First visit shows three steps (Save, New board, Make a brief) instead of an empty page.
  - Account menu (rail and phone top bar): Install app, Keyboard shortcuts, Privacy, Sign out, Delete account. Delete account confirms with Google or the password, then removes every save, board, photo, and the account.
  - `privacy.html`, linked from the sign-in page and the account menu. It has no contact line yet; Clea to decide on one.
  - Title relay: 12 titles a minute per visitor, enforced with a Durable Object counter (Cloudflare's built-in rate limiter didn't block in tests).
  - Link previews: description, Open Graph and Twitter tags, `og.png` (1200x630).
  - Polish: select-all ("All" and Cmd+A), "/" hint in search, "?" opens shortcuts, link saves are seafoam when opened, Tidy keeps 16px from the board edge, select bar fits small phones.
  - Not yet tested with a real signed-in account: sign-up, Delete account, and Share on a real Android phone.
- 2026-11-10 (Claude Fable 5.2): Phone sign-in fix, not deployed, not tested on a phone.
  - Cause: Google sign-in ran on inspogram-c738a.firebaseapp.com while the app lives on getinspogram.web.app. Phone browsers keep the two sites' storage apart, so the handoff lost its place ("missing initial state").
  - Sign-in now runs on getinspogram.web.app itself. Phones go to Google in the same tab; desktop keeps the pop-up.
  - Inside LinkedIn, Instagram, and similar in-app browsers, the sign-in page says to open in Safari or Chrome, or use email.
  - Sign-in errors after returning from Google now show on the page.
  - Checked: Google currently rejects the new address ("redirect_uri_mismatch") until the redirect URI in the step above is added.
- 2026-11-10 (Claude Fable 5.2): Free-plan storage changes, deployed (app and relay).
  - New photo saves keep one reference copy, 800px wide at most and about 110 KB, plus the grid thumbnail. Tested in demo mode: a 3000x4000 photo saved at 106 KB. Old saves keep their bigger copies.
  - Sign-in page says photos are kept as small reference copies.
  - Link saves show the page's preview picture and take the page title when there is no note. Only the picture's address is stored (`preview` on the save). The relay reads it; tested live against the relay, not yet with a signed-in save.
  - Saves are cached on the device (Firestore local cache). Saving offline says "Saved on this device" and syncs later. Not tested signed in.
  - Correction: the local cache makes the app open fast and work offline, but it does not cut daily reads much. A visit after more than 30 minutes away still re-reads every save.
  - Phone sign-in fix is in the code but off until the redirect URI step is done.
- 2026-11-10 (Claude Fable 5.2): Clea added the redirect URI. Google now accepts the app's own sign-in address (checked). Set `SELF_AUTH = true` and deployed. Phone sign-in itself not yet tested on a phone.
- 2026-11-10 (Claude Fable 5.2): Clea confirmed sign-in works with the fix live.
- 2026-11-10 (Claude Fable 5.2): Quick save, offline app, lighter grid. On branch `claude/inspogram-quick-save`. Not deployed. Tested in demo mode on a local copy only.
  - Quick save: a pasted photo or link, a photo dropped on the page, or a share from the phone saves right away with no sheet. The "Saved" message has "Add details", which opens the save ready to edit. On a board or tag filter, the save gets that board or tag. The Save button still opens the full sheet, and a paste fills the sheet when it is open.
  - After a quick save, a link gets its preview picture and page title from the relay. Not tested (demo mode skips the relay).
  - Offline app: `sw.js` keeps the page, icons, Firebase code, and fonts on the device. The app opens from that copy, downloads the newest one behind it, and shows "New version ready. Reload" when it changed. So a deploy shows up after one Reload, not instantly. Sign-in pages (`/__/`) always go to the network. Tested: opens with the server stopped; the Reload message appears after a change.
  - Lighter grid: draws 60 saves, adds 60 more as you scroll. Tested with 150 saves. Boards in canvas view still draw every card.
  - New device: the newest 60 saves load first, then the rest. Not tested (needs a signed-in account with no local copy).
  - This does not cut daily reads. Every save is still read once per visit after 30 minutes away. Cutting that needs the thumbnails moved out of the save records; not worth it until a library is in the hundreds.
- 2026-11-10 (Claude Fable 5.2): Start here wording, from Clea's feedback. Not deployed; syntax checked only. Step 1 drops "note". Step 2 is "Make a board: group saves by project or theme". Step 3 and the "Copied" message say "the AI you use", not Claude. The paste shortcut is its own line, shown only on computers.
- 2026-11-10 (Claude Fable 5.2): Search and link-preview description now says "a brief for the AI you use", not Claude. Not deployed.

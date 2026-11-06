# Inspogram v2: next steps

Full brief: `HANDOFF.md`. Live app (do not touch): https://inspogram-c738a.web.app/

## Status
The save bug ("Capture saved" but nothing shows) is being fixed in `index.html`. Nothing has been tested in a browser yet.

## Steps
- [x] Add `getDoc` to the Firestore import.
- [x] "Capture saved" waits until `getDoc` confirms the capture can be read back.
- [ ] Store the captures listener so old ones are really stopped: in `loadCaptures()`, change `onSnapshot(q, (snap) => {` to `capturesUnsub = onSnapshot(q, (snap) => {`. (Today `capturesUnsub()` is called but never set, so the fix does nothing.)
- [ ] Show an error when saving fails: in the save handler, move the `addDoc(...)` call inside the `try` block, so a failed save shows "Capture save failed: ..." instead of nothing.
- [ ] Escape the load error: in the `loadCaptures` error handler, wrap `err.message` in `esc(...)`.
- [ ] Clea tests locally: in Terminal, `cd ~/Desktop/clea-vault-main/Projects/ai-experiments/inspogram-v2 && python3 -m http.server 8765`, open http://localhost:8765, sign in, save a capture with a photo, refresh. Pass = the capture is still there with photo, title and category. Record the result in `TESTS.md`.
- [ ] If it fails, find the real cause from what Clea saw (browser console errors) before patching again.
- [ ] Write `CHANGES.md`: what changed vs the original, which model did each change, what is still broken.
- [ ] Remaining brief items (landing page, compile view, invite flow), one at a time, from `HANDOFF.md`.
- [ ] Firebase Hosting preview channel for side-by-side comparison. Ask Clea before running any Firebase command.

## Log
- 2026-11-06: Dots3 Note added the getDoc import. North Mini Code added the read-back check before "Capture saved" and declared `capturesUnsub` without assigning it.

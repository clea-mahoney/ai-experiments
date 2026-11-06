# Inspogram v2: next steps

Full brief: `HANDOFF.md`. Live app (do not touch): https://inspogram-c738a.web.app/

## Status
The save bug ("Capture saved" but nothing shows) is being fixed in `index.html`. Nothing has been tested in a browser yet.


## Steps
- [x] Add `getDoc` to the Firestore import.
- [x] "Capture saved" waits until `getDoc` confirms the capture can be read back.
- [x] Store the captures listener so old ones are really stopped: in `loadCaptures()`, change `onSnapshot(q, (snap) => {` to `capturesUnsub = onSnapshot(q, (snap) => {`. (Today `capturesUnsub()` is called but never set, so the fix does nothing.)
- [x] Show an error when saving fails: in the save handler, move the `addDoc(...)` call inside the `try` block, so a failed save shows "Capture save failed: ..." instead of nothing.
- [x] Escape the load error: in the `loadCaptures` error handler, wrap `err.message` in `esc(...)`.

- 2026-11-06: Dots3 Note added the getDoc import. North Mini Code added the read-back check before "Capture saved" and declared `capturesUnsub` without assigning it.

# ATS sandbox

A recruiting AI practice lab - ~10 minutes. By Clea Mahoney.

## Purpose

Help a customer test an AI review workflow before using it: choose job-relevant criteria, verify claims against sources, preserve accessible ways to demonstrate skills, and keep people responsible for decisions and candidate conversations. This connects live customer education with useful work inside a product.

## Experience

1. Replace a plausible ATS-experience gate with evidence of workshop ownership and presenter coaching.
2. Inspect a positive summary that overstates what attendance and ratings establish. Preserve the supported evidence and ask about the unknown.
3. Coordinate a candidate’s requested live-exercise setup while preserving the same facilitation skills.
4. Choose a bounded pilot with manual comparison and human approval of contact.
5. Review and copy the actual decisions, authored guidance, follow-up questions, and personal notes.

Navigation stays open. Feedback does not gate progress. Skipped sections remain visibly incomplete; alternative choices are preserved and marked for reconsideration. 

## Live learning

Use individual choices followed by paired discussion. Ask customers to identify the exact source for a claim and the question a recruiter should ask next. Test transfer with a fresh example. Review evidence quality and useful candidate conversations alongside time spent. The on-page facilitator notes explain follow-up checks.

## Implementation

`lesson.mjs` contains fictional authored scenarios and deterministic feedback. `app.mjs` manages navigation, decisions, optional notes, and the review. Feedback is scripted; the exercise runs in the browser. Notes live in tab memory and clear on reload. Google Fonts is the only external display dependency, with a sans-serif fallback.

The UI preserves DM Sans and the existing approved named palette: Seafoam/Lagoon, Mint Mist, Apricot/Rosewood, Blush Mist, Ink, Slate, Sand, and White. It uses native radios, keyboard controls, heading focus, and responsive layouts.

## Fictional platform

This lab is based on a fictional recruiting platform, with assumptions made on how its AI can be configured.

## Run and check

Serve this directory with a static HTTP server, for example `python3 -m http.server 8765`. No install or build is required.

Run `node --test lesson.test.mjs` and `node --check app.mjs`.


# AI experiments: working rules

Each folder is one experiment. Every experiment keeps a `NEXT.md` with its status and next steps.

## When Clea says "continue <experiment>" (for example "continue inspogram")
1. Read `<experiment>/NEXT.md`. Read the brief it points to only if a step needs it.
2. Do the first unchecked step. Nothing else.
3. Before each file edit, say in one plain sentence what you are changing and why.
4. When the step is done, tick it in `NEXT.md`, add one line under "Log" (date, model, what changed), and stop. Tell Clea in two or three plain sentences what changed and what the next step is.

## Rules
- Edit with `apply_patch`, small hunks, every patch ending with `*** End Patch`.
- Never say something works unless you ran it and saw it work. Say "not tested yet" otherwise.
- Never deploy, and never open or link the live site as if it were a test of new code.
- The ATS lab in `ats-sandbox/` is a live portfolio piece. Do not change it unless asked.

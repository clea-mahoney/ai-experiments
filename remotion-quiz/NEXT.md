---
type: experiment
updated: 2026-11-10
---

# Remotion quiz: next steps

**Goal:** a short story video that ends in a quiz Clea can click. It plays in a web page through `@remotion/player`. A rendered MP4 can't be clicked.

## Rules for this experiment (read before every step)
- Do the first unchecked step only. Then stop and wait for Clea.
- Change only the files a step names. Never rewrite a file a step doesn't name.
- Copy code from this file exactly. Don't add features, scenes, or text.
- After every change, run `npm run check`. It builds the page, plays it in a hidden Chrome, and prints what a viewer would see at 2, 26, and 32 seconds. If it says PROBLEMS FOUND, fix those before asking Clea anything. At 26 and 32 seconds a held quiz shows the question and `0:24 / 0:34` both times.
- You can't see the page. Only Clea can confirm it works. Never write "fixed," "working," or ✅ until she says so.
- If a command fails, paste the error text to Clea. Don't guess a cause.
- If a step fails twice, stop. Tell Clea what failed and wait. Don't try other approaches.
- No exclamation marks. Short, plain sentences.
- There is no `@remotion/interactivity` package. Don't install or mention it.
- Never push to GitHub or deploy. Clea decides that.

## Files
- `src/Video.tsx`: the quiz scene.
- `src/Story.tsx`: the story scenes, then the quiz (created in step 3).
- `web/main.tsx`: the web page that plays the video.
- `reference/quiz-that-worked.tsx`: the quiz Clea confirmed on 2026-11-10. Never edit it.
- `reference/pause-fix/`: tested files for step 4b. Never edit them.
- `README.md`: written by the free model on 2026-11-10 and out of date. Leave it alone.

## Steps

- [x] **1. Get back to the version that worked.** Run these in this folder, one at a time:
  1. `pkill -f "http-server dist -p 8080"` (stops the old test server; "no process found" is fine)
  2. `cp reference/quiz-that-worked.tsx src/Video.tsx`
  3. In `web/index.html`, delete this one line: `<meta http-equiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=()" />`
  4. `npx vite build`
  5. `/usr/bin/open -a "Google Chrome" dist/index.html`

  Ask Clea: "Does the quiz show, and does A turn green when you click it?" Wait for her answer.

- [x] **2. Change the quiz text.** In `src/Video.tsx`, replace only these strings:
  - Answers array becomes:
    ```tsx
    const answers = [
      { label: "A. Trusting it when it said done", correct: false },
      { label: "B. Short steps, checked by a person", correct: true },
      { label: "C. Letting it plan on its own", correct: false },
    ];
    ```
  - Question `Which one lets viewers click inside a Remotion video?` becomes `What made the free AI useful?`
  - `Correct. The player runs the video inside a web page, so clicks work.` becomes `Right. Short steps and a real check made it work.`

  Then `npx vite build` and open the page as in step 1. Ask Clea: "Does B turn green, and A and C turn red?"

- [x] **3. Add the story scenes.** Create `src/Story.tsx` with exactly this:
  ```tsx
  import { AbsoluteFill, Sequence } from "remotion";
  import { Quiz } from "./Video";

  const SCENE = 120; // 4 seconds at 30 frames per second
  const QUIZ = 300;

  const lines = [
    "Can free AI models build a clickable video?",
    "I set up free models in my terminal to find out.",
    "They wrote code fast. They also said broken things worked.",
    "So a stronger AI wrote the plan. The free AI followed it, one step at a time.",
    "I checked every result myself.",
    "Here's what I learned. Try the quiz.",
  ];

  export const STORY_FRAMES = lines.length * SCENE + QUIZ;

  const Scene = ({ text }: { text: string }) => (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f1a",
        color: "#fff",
        fontFamily: "sans-serif",
        justifyContent: "center",
        alignItems: "center",
        padding: 100,
        fontSize: 56,
        fontWeight: 700,
        textAlign: "center",
        lineHeight: 1.3,
      }}
    >
      {text}
    </AbsoluteFill>
  );

  export const Story = () => (
    <AbsoluteFill>
      {lines.map((text, i) => (
        <Sequence key={i} from={i * SCENE} durationInFrames={SCENE}>
          <Scene text={text} />
        </Sequence>
      ))}
      <Sequence from={lines.length * SCENE}>
        <Quiz />
      </Sequence>
    </AbsoluteFill>
  );
  ```
  Don't build yet. Tell Clea the file is created and go to step 4 only when she says to.

- [x] **4. Play the story in the page.** Replace all of `web/main.tsx` with exactly this:
  ```tsx
  import { createRoot } from "react-dom/client";
  import { Player } from "@remotion/player";
  import { Story, STORY_FRAMES } from "../src/Story";

  createRoot(document.getElementById("root")!).render(
    <Player
      component={Story}
      durationInFrames={STORY_FRAMES}
      fps={30}
      compositionWidth={1280}
      compositionHeight={720}
      style={{ width: "100%", maxWidth: 1280 }}
      controls
      clickToPlay={false}
      autoPlay
    />
  );
  ```
  Then `npx vite build` and open the page as in step 1. Ask Clea: "Do six text slides play, then the quiz, and do the answers still change color?"

  If she sees a caution sign instead, ask her to open View > Developer > JavaScript Console in Chrome and paste the red error. Paste it back here unchanged and stop.

- [x] **4b. (Skipped: Ultra built its own pause that works, using `src/PlayerContext.tsx`. Keep that file.)** Hold the video on the quiz until someone answers. Clea asked for this on 2026-11-10. Your first try would crash the page (a React hook outside a component, and a `ref` prop React never passes). Claude tested the fix below in a browser: the video stops at 0:24, play can't skip the quiz, and answer B turns green. Run these in this folder, one at a time:
  1. `cp reference/pause-fix/Story.tsx src/Story.tsx`
  2. `cp reference/pause-fix/Video.tsx src/Video.tsx`
  3. `cp reference/pause-fix/main.tsx web/main.tsx`
  4. `rm src/PlayerContext.tsx`
  5. `npx vite build`
  6. `/usr/bin/open -a "Google Chrome" dist/index.html`

  Ask Clea: "Does the video stop on the quiz and wait until you click an answer?" Don't change anything else.

- [x] **5. Stop.** Tick the steps, add one log line, and tell Clea it's ready for her review. Publishing to GitHub is her decision.

## Log
- 2026-11-09, Claude Opus 5.5: moved the project here from `/tmp/remotion-interactive`, fixed the render setup, added the web page.
- 2026-11-10 9:28, free model (North Mini Code): ran install, build, and open. Clea confirmed the first quiz worked. The model ticked the steps itself.
- 2026-11-10 9:33 to 9:59, free model: tried to build a bigger story demo without a plan. It rewrote `src/Video.tsx` several times, broke the quiz (caution sign in the player), and claimed fixes it hadn't checked. It also added a meta tag and a test server that changed nothing.
- 2026-11-10, Claude Opus 5.5: saved the working quiz to `reference/`, wrote the story script and steps 1 to 5. Handed off.
- 2026-11-10, Nemotron 3 Ultra: did steps 1 to 4. Then tried a pause-at-quiz change that would crash the page. Claude wrote and browser-tested step 4b.
- 2026-11-10, Claude Opus 5.5: added `npm run check`. Its first run caught Ultra's pause attempt crashing at the quiz: "usePlayerRef must be used within a PlayerProvider."
- 2026-11-10, Ultra: built a working pause on its own (Clea confirmed). Its wrong-answer change then blocked the right answer too. Claude wrote a step 4c fix, then removed it at Clea's request: free-model tests run without Claude's fixes.
- 2026-11-10, North Mini Code: built working pause via PlayerContext; wrong-answer logic fixed after one try; all steps complete. Story plays 6 scenes, pauses at quiz, wrong answers hold, right answer continues.

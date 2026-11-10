import { createRoot } from "react-dom/client";
import { Player, type PlayerRef } from "@remotion/player";
import { useEffect, useRef } from "react";
import { Story, STORY_FRAMES, QUIZ_START } from "../src/Story";

// Hooks must live inside a component, so the page is one small App component.
const App = () => {
  const playerRef = useRef<PlayerRef>(null);
  const answered = useRef(false);

  // Hold the video on the quiz until someone clicks an answer.
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    const onFrame = (event: { detail: { frame: number } }) => {
      if (!answered.current && event.detail.frame >= QUIZ_START) {
        player.pause();
        player.seekTo(QUIZ_START);
      }
    };
    player.addEventListener("frameupdate", onFrame);
    return () => player.removeEventListener("frameupdate", onFrame);
  }, []);

  return (
    <Player
      ref={playerRef}
      component={Story}
      inputProps={{ onAnswer: () => { answered.current = true; } }}
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
};

createRoot(document.getElementById("root")!).render(<App />);

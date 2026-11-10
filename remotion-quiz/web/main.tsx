import { createRoot } from "react-dom/client";
import { Player, type PlayerRef } from "@remotion/player";
import { useRef, useCallback, useContext } from "react";
import { Story, STORY_FRAMES } from "../src/Story";
import { PlayerProvider, PlayerContext } from "../src/PlayerContext";

const PlayerWithRef = () => {
  const { setPlayer } = useContext(PlayerContext);
  const handleRef = useCallback((ref: PlayerRef | null) => {
    if (ref) setPlayer(ref);
  }, [setPlayer]);

  return (
    <Player
      ref={handleRef}
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
};

const App = () => (
  <PlayerProvider>
    <PlayerWithRef />
  </PlayerProvider>
);

createRoot(document.getElementById("root")!).render(<App />);

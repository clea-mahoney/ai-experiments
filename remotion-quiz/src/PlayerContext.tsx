import { createContext, useContext, useState } from "react";
import type { PlayerRef } from "@remotion/player";

interface PlayerContextValue {
  player: PlayerRef | null;
  setPlayer: (p: PlayerRef) => void;
}

export const PlayerContext = createContext<PlayerContextValue | null>(null);

export const usePlayerRef = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) {
    throw new Error("usePlayerRef must be used within a PlayerProvider");
  }
  return ctx.player;
};

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [player, setPlayer] = useState<PlayerRef | null>(null);
  return <PlayerContext.Provider value={{ player, setPlayer }}>{children}</PlayerContext.Provider>;
};

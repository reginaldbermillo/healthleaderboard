// src/context/PlayerContext.tsx

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import supabase from "../lib/supabase";

export interface Player {
  id: number;
  eid: string;
  project: string;
  score: number;
}

interface PlayerContextProps {
  players: Player[];
  addPlayer: (player: Player) => void;
  deletePlayer: (id: number) => void;
}

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [players, setPlayers] = useState<Player[]>(() => {
    if (typeof window !== "undefined") {
      const storedPlayers = localStorage.getItem("players");
      return storedPlayers ? JSON.parse(storedPlayers) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("players", JSON.stringify(players));
    }
  }, [players]);

  const addPlayer = async (player: Player) => {
    setPlayers((prev) => [...prev, player]);
  };
  const deletePlayer = (id: number) => {
    setPlayers(players.filter((player) => player.id !== id));
  };

  return (
    <PlayerContext.Provider value={{ players, addPlayer, deletePlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = (): PlayerContextProps => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayerContext must be used within a PlayerProvider");
  }
  return context;
};

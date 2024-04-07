import { createContext, useState } from "react";

export const GameContext = createContext();

export function GameProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timePerPlayer, setTimePerPlayer] = useState(5);
  const [increment, setIncrement] = useState(5);

  function onStartGameHandler() {
    setIsPlaying(true);
    console.log(timePerPlayer, increment);
  }

  function onResetGameSettings() {
    setIsPlaying(false);
    setTimePerPlayer(5);
    setIncrement(5);
  }

  function onSetTime(time) {
    setTimePerPlayer(+time);
  }

  function onSetIncrement(time) {
    setIncrement(+time);
  }

  const value = {
    isPlaying,
    onStartGameHandler,
    onResetGameSettings,
    onSetTime,
    onSetIncrement,
    increment,
    timePerPlayer,
  };
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

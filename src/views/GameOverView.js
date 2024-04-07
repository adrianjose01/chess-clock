import React, { useContext } from "react";
import { GameContext } from "../store/game-context";

const GameOverView = () => {
  const { onResetGameSettings } = useContext(GameContext);

  return (
    <div className="">
      <h1 className="text-white font-bold text-2xl text-center">Game Over</h1>
      <button
        onClick={onResetGameSettings}
        className="bg-white font-bold text-dark-blue text-xl py-1 px-5 rounded-lg hover:opacity-75 m-5"
      >
        Play again
      </button>
    </div>
  );
};

export default GameOverView;

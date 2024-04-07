import React, { useContext } from "react";
import { GameContext } from "../store/game-context";

const HomeView = () => {
  const { onStartGameHandler, onSetTime, onSetIncrement, timePerPlayer } =
    useContext(GameContext);

  function setTimeHandler(e) {
    onSetTime(e.target.value);
  }

  return (
    <div className="bg-dark-blue h-dvh">
      <h1 className="text-4xl font-bold text-white text-center p-10">
        Fisher Chess Clock
      </h1>
      <form>
        <label className="m-10 flex gap-5 items-center">
          <span className="text-white font-bold text-xl">Time per Player:</span>
          <input
            className="text-white bg-dark-blue w-10 text-xl"
            value={timePerPlayer}
            type="number"
            min="1"
            max="60"
            onChange={(e) => setTimeHandler(e)}
          />
        </label>
        <label className="m-10 flex gap-5 items-center">
          <span className="text-white font-bold text-xl">Increment:</span>
          <input
            className="text-white bg-dark-blue w-10 text-xl"
            defaultValue="5"
            type="number"
            min="0"
            max="10"
            onChange={(e) => onSetIncrement(e.target.value)}
          />
        </label>
        <div className="flex justify-center">
          <button
            onClick={onStartGameHandler}
            className="bg-white font-bold text-dark-blue text-xl py-1 px-5 rounded-lg hover:opacity-75"
          >
            Start game
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomeView;

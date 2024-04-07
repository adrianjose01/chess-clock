import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import GameOverView from "./GameOverView";
import { GameContext } from "../store/game-context";
import PlayerButton from "../components/PlayerButton";

const GameView = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isfirstPlayerTurn, setIsFirstPlayerTurn] = useState(true);
  const { timePerPlayer, increment, onResetGameSettings } =
    useContext(GameContext);

  const [player1, setPlayer1] = useState({
    minutes: timePerPlayer,
    seconds: 0,
  });
  const [player2, setPlayer2] = useState({
    minutes: timePerPlayer,
    seconds: 0,
  });

  function onRestartHandler() {
    setPlayer1({
      minutes: timePerPlayer,
      seconds: 0,
    });
    setPlayer2({
      minutes: timePerPlayer,
      seconds: 0,
    });
    setIsFirstPlayerTurn(true);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const currentPlayer = isfirstPlayerTurn ? player1 : player2;
      const setPlayer = isfirstPlayerTurn ? setPlayer1 : setPlayer2;

      if (currentPlayer.seconds === 0 && currentPlayer.minutes !== 0) {
        setPlayer({
          ...currentPlayer,
          minutes: currentPlayer.minutes - 1,
          seconds: 59,
        });
      } else if (currentPlayer.seconds !== 0) {
        setPlayer({ ...currentPlayer, seconds: currentPlayer.seconds - 1 });
      } else {
        clearInterval(timer);

        // Check if the game is over for both players
        if (
          (isfirstPlayerTurn &&
            player1.minutes === 0 &&
            player1.seconds === 0) ||
          (!isfirstPlayerTurn && player2.minutes === 0 && player2.seconds === 0)
        ) {
          setIsOpen(true);
        } else {
          // If the game is not over, change the player's turn
          setIsFirstPlayerTurn((prev) => !prev);
        }
      }
    }, 1000);

    // Clear the interval when the component unmounts or the game is over
    return () => clearInterval(timer);
  }, [isfirstPlayerTurn, player1, player2]);

  function changePlayerTurn() {
    const currentPlayer = isfirstPlayerTurn ? player1 : player2;
    const setPlayer = isfirstPlayerTurn ? setPlayer1 : setPlayer2;

    if (currentPlayer.seconds + increment > 59) {
      setPlayer({
        minutes: currentPlayer.minutes + 1,
        seconds: currentPlayer.seconds + increment - 60,
      });
    } else {
      setPlayer({
        ...currentPlayer,
        seconds: currentPlayer.seconds + increment,
      });
    }

    setIsFirstPlayerTurn((prev) => !prev);
  }

  return (
    <div className="bg-dark-blue h-dvh px-5">
      <div className="flex justify-evenly gap-7 pt-12 flex-wrap">
        <PlayerButton
          onClick={changePlayerTurn}
          label="Player 1"
          minutes={player1.minutes}
          seconds={player1.seconds}
          isFirstPlayerTurn={isfirstPlayerTurn}
        />
        <PlayerButton
          onClick={changePlayerTurn}
          label="Player 2"
          minutes={player2.minutes}
          seconds={player2.seconds}
          isFirstPlayerTurn={!isfirstPlayerTurn}
        />
      </div>
      <div className="flex justify-center">
        <button
          onClick={onResetGameSettings}
          className="bg-red font-bold text-white text-xl py-1 px-5 rounded-lg m-16"
        >
          Cancel game
        </button>
        <button
          onClick={onRestartHandler}
          className="bg-white font-bold text-dark-blue text-xl py-1 px-5 rounded-lg m-16"
        >
          Restart game
        </button>
      </div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <GameOverView />
      </Modal>
    </div>
  );
};

export default GameView;

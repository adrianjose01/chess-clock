const PlayerButton = ({
  onClick,
  label,
  minutes,
  seconds,
  isFirstPlayerTurn,
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-light-blue text-white font-bold text-2xl rounded-lg flex items-center justify-center min-w-60 w-96 h-52 shadow-lg ${
        !isFirstPlayerTurn ? "opacity-75" : ""
      }`}
    >
      {`${label} - ${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`}
    </button>
  );
};

export default PlayerButton;

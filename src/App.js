import { useContext } from "react";
import GameView from "./views/GameView";
import HomeView from "./views/HomeView";
import { GameContext } from "./store/game-context";

function App() {
  const { isPlaying } = useContext(GameContext);
  return isPlaying ? <GameView /> : <HomeView />;
}

export default App;

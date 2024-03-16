import { useState } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import ScoreBoard from "./components/ScoreBoard";

function App() {
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [win, setWin] = useState(false);

  return (
    <>
      <ScoreBoard score={score} highestScore={highestScore} win={win} />
      <GameBoard
        className="score-board"
        score={score}
        setScore={setScore}
        highestScore={highestScore}
        setHighestScore={setHighestScore}
        setWin={setWin}
      />
    </>
  );
}

export default App;

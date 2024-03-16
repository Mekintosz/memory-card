import logo from "../assets/NASA_logo.svg";

function ScoreBoard(props) {
  const { score, highestScore, win } = props;

  return (
    <div className="score-board">
      <img className="logo" src={logo} alt="NASA Logo" />
      <div className="title">
        <h4>NASA Memory Game</h4>
        <p>Click ten times in a row different photo to move to next round.</p>
      </div>
      <div className="score">
        <p>Score: {score}</p>
        <p>Highest score: {highestScore}</p>
      </div>
      {win && (
        <div className="result">
          <h4>10/10 You can start new game!!!</h4>
          <button onClick={() => window.location.reload()}>New game</button>
        </div>
      )}
    </div>
  );
}

export default ScoreBoard;

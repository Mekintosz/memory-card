function ScoreBoard() {
    const [score, setScore] = useState(0)
    const [highestScore, setHighestScore] = useState(0)
  
    return (
      <>
       <div className="score-container">
        <span>Score</span>
        <span>Highest Score</span>
        <span></span>
        <span></span>
       </div>
      </>
    )
  }
  
  export default ScoreBoard
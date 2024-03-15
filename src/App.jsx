import GameOverModal from './components/GameOverModal'
import GameBoard from './components/GameBoard'
import { useState } from 'react'
import './App.css'

function App() {
  const [isGameOver, setIsGameOver] = useState(false)

  return (
    <>
     <GameBoard 
     gameOver={setIsGameOver}/>
     <GameOverModal
     />
    </>
  )
}

export default App

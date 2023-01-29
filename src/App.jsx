import { useState } from 'react'
import confetti from 'canvas-confetti'

// eslint-disable-next-line no-unused-vars
import { Square } from './components/Square.jsx'
// eslint-disable-next-line no-unused-vars
import { WinnerModal } from './components/WinnerModal.jsx'
import { TURNS } from './constans.js'
import { checkWinner, checkEndGame } from './logic/board.js'

function App () {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  // null es que no hay ganador, y false es empate
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const updateBoard = (index) => {
    // if board[index] is not empty or we got a winner, return
    if (board[index] || winner) return

    // CAMBIAMOS LA TABLA PARA AÑADIR X/O
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // CAMBIAMOS EL TURNO
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // guardar partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    // revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
      <main className="board">
        <h1>Tic Tac Toe</h1>
        <button onClick={resetGame}>Volver a empezar</button>
        <section className="game">
          {board.map((square, index) => {
            return (
              <Square key={index} index={index} updateBoard = {updateBoard}>
                {square}
              </Square>
            )
          })}
        </section>
        <section className="turn">
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>
          <WinnerModal winner={winner} resetGame={resetGame}/>
      </main>
  )
}

export default App

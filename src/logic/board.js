import { WINNING_POSITIONS } from '../constans'

export const checkWinner = (boardToCheck) => {
  for (const position of WINNING_POSITIONS) {
    const [a, b, c] = position
    if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
      return boardToCheck[a]
    }
  }
  return null
}

export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null)
}

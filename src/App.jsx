import { useState } from 'react'

function Square({ value, onSquareClick }) {
  return (
    <button
      className={`square ${value === 'X' ? 'x' : value === 'O' ? 'o' : ''}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return

    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? 'X' : 'O'

    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  function resetGame() {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
  }

  const winner = calculateWinner(squares)
  const isDraw = squares.every(square => square !== null) && !winner

  let status = ''
  if (winner) {
    status = 'Winner : ' + winner
  } else if (isDraw) {
    status = 'Draw!'
  } else {
    status = 'Next Player : ' + (xIsNext ? 'X' : 'O')
  }

  return (
    <div className="game">
      <h2 className="title">Tic Tac Toe</h2>

      <div className={`status ${winner ? 'win' : isDraw ? 'draw' : ''}`}>
        {status}
      </div>

      <div className="board">
        {squares.map((square, i) => (
          <Square
            key={i}
            value={square}
            onSquareClick={() => handleClick(i)}
          />
        ))}
      </div>

      {(winner || isDraw) && (
        <button className="reset" onClick={resetGame}>
          Main Lagi
        </button>
      )}
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a]
    }
  }
  return null
}

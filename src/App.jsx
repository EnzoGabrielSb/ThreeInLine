import { useState } from "react";
import "./App.css";
import { Square } from "./components/Square";
import { turns, WINNER_COMBOS } from "./constants";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem("board");
    if (boardFromLocalStorage) {
      return JSON.parse(boardFromLocalStorage);
    } else {
      return Array(9).fill(null);
    }
  });

  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage = window.localStorage.getItem("turn");
    return turnFromLocalStorage ?? turns.X;
  });

  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(turns.O);
    setWinner(null);
  };

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);
  };

  const updateBoard = (index) => {
    // Si el board esta ocupado no lo sobrescribas! || Si ya hay un ganador tampoco!
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === turns.X ? turns.O : turns.X;
    setTurn(newTurn);

    //Guardar partida en el LocalStorage
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurn);

    //Chequeo de si hay un ganador.
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <h1>¡Ta Te Ti!</h1>

      <section className="game">
        {board?.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>

      <div>
        <br />
        <h3>Turn:</h3>
      </div>

      <section className="turn">
        <Square isSelected={turn === turns.X}>{turns.X}</Square>
        <Square isSelected={turn === turns.O}>{turns.O}</Square>
      </section>

      <section className="turn">
        <button onClick={resetGame}>Reset Game!</button>
      </section>

      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>{winner === false ? "Empate" : "El ganador:"}</h2>
            <header className="win">
              {winner && <Square> {winner} </Square>}
            </header>

            <div>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { db } from '../initFirebase';
import '../index.css';
import { ref, child, get, set, remove } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const Game = () => {
  const [loading, setLoading] = useState(true);
  const [gameData, setGameData] = useState(null);
  const { newGameKey } = useParams();


  const navigate = useNavigate();

  const loadGame = async () => {
    const snapshot = await get(child(ref(db), `games/${newGameKey}`));

    if (snapshot.exists()) {
      const gameData = snapshot.val();
      setGameData(gameData);
    }

    if (!snapshot.exists()) {
      return;
    }

    setLoading(false);
  };

  const saveGame = () => {
    set(ref(db, `games/${newGameKey}/`), gameData);
  };

  const handleCellClick = async index => {
    if (gameData.board[index] !== '' || gameData.winner !== '') return;

    const updatedBoard = [...gameData.board];

    const newCurrentPlayer =
      gameData.currentPlayer === gameData.player1
        ? gameData.player2
        : gameData.player1;

    const newCurrentTurn =
      gameData.currentPlayer === gameData.player1 ? 'O' : 'X';

    updatedBoard[index] = gameData.currentTurn;

    setGameData({
      ...gameData,
      board: updatedBoard,
      currentPlayer: newCurrentPlayer,
      currentTurn: newCurrentTurn,
    });

    const winnerTurn = calculateWinner(updatedBoard);
    let newWinner;

    console.log(newWinner);

    if (winnerTurn === 'X') {
      newWinner = gameData.player1;
    }

    if (winnerTurn === 'O') {
      newWinner = gameData.player2;
    }

    if (newWinner) {
      setGameData({
        ...gameData,
        board: updatedBoard,
        currentPlayer: newCurrentPlayer,
        currentTurn: newCurrentTurn,
        winner: newWinner,
      });
    }
  };

  const calculateWinner = currentBoard => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        currentBoard[a] !== '' &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }

    if (currentBoard.every(cell => cell !== '')) {
      return 'draw';
    }

    return null;
  };

  const resetGame = () => {
    setGameData({
      player1: gameData.player1,
      player2: gameData.player2,
      board: Array(9).fill(''),
      currentPlayer: gameData.player1,
      currentTurn: 'X',
      winner: '',
    });
  };

  const handleGameEnd = () => {
    remove(ref(db, `games/${newGameKey}/`));
    navigate(`/`);
  };

  useEffect(() => {
    loadGame();
  }, []);

  useEffect(() => {
    saveGame();
  }, [resetGame]);

  return loading ? (
    <div className="brokeWrap">
      <h2 className="brokeTitle">
        Oops, something broke... <br /> Please go back to the start menu and try
        again!
      </h2>
      <button onClick={handleGameEnd} className="brokeBtn">
        Back to start menu
      </button>
    </div>
  ) : (
    <section className="section">
      <div className="board">
        {gameData.board.map((cell, index) => (
          <div
            key={index}
            className={`cell ${cell}`}
            onClick={() => handleCellClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      <div className="status">
        {gameData.winner ? (
          <h3>
            Player
            <p className={gameData.currentTurn === 'O' ? 'X' : 'O'}>
              {gameData.winner}
            </p>
            wins!
          </h3>
        ) : gameData.winner === 'draw' ? (
          <h3>"It's a draw!"</h3>
        ) : (
          <h3>
            Current Player:{' '}
            <p className={gameData.currentTurn}>{gameData.currentPlayer}</p>
          </h3>
        )}
        <div className="statusBtnWrap">
          <button onClick={resetGame}>Reset Game</button>
          <button onClick={handleGameEnd}>Back to menu</button>
        </div>
      </div>
    </section>
  );
};

export default Game;

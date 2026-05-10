import React, { useState, useEffect, useRef, useCallback } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import "./ChessGame.css";

const ChessGame = ({ puzzle }) => {
  const chessRef = useRef(null);
  const [position, setPosition] = useState(puzzle.fen.split(" ")[0]);
  const [moveIndex, setMoveIndex] = useState(0);
  const [solutionMoves, setSolutionMoves] = useState([]);
  const [playerColor, setPlayerColor] = useState("white");
  const [status, setStatus] = useState("idle"); // idle | incorrect | solved | revealed
  const [message, setMessage] = useState("Find the best move!");
  const [showSolution, setShowSolution] = useState(false);
  const revealTimeouts = useRef([]);

  useEffect(() => {
    // Parse solution moves from PGN
    const temp = new Chess();
    temp.loadPgn(puzzle.pgn);
    const moves = temp.history();
    setSolutionMoves(moves);

    // Determine player color from FEN
    const color = puzzle.fen.split(" ")[1] === "b" ? "black" : "white";
    setPlayerColor(color);

    // Initialize game chess instance from puzzle FEN
    chessRef.current = new Chess(puzzle.fen);
    setPosition(puzzle.fen.split(" ")[0]);
    setMoveIndex(0);
    setStatus("idle");
    setMessage("Find the best move!");
    setShowSolution(false);
  }, [puzzle]);

  const onDrop = useCallback(
    (sourceSquare, targetSquare, piece) => {
      if (status === "solved" || status === "revealed") return false;

      const chess = chessRef.current;

      // Attempt the move
      let result;
      try {
        result = chess.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: "q", // always promote to queen for simplicity
        });
      } catch {
        return false;
      }

      if (!result) return false;

      const expectedSan = solutionMoves[moveIndex];

      if (result.san !== expectedSan) {
        // Wrong move — undo and give feedback
        chess.undo();
        setStatus("incorrect");
        setMessage("Not the right move — try again!");
        setTimeout(() => {
          setStatus((prev) => (prev === "incorrect" ? "idle" : prev));
          setMessage("Find the best move!");
        }, 1500);
        return false;
      }

      // Correct move
      const nextMoveIndex = moveIndex + 1;
      setPosition(chess.fen().split(" ")[0]);
      setMoveIndex(nextMoveIndex);

      if (nextMoveIndex >= solutionMoves.length) {
        setStatus("solved");
        setMessage("Puzzle solved!");
        return true;
      }

      // Auto-play opponent's response after a short delay
      setTimeout(() => {
        const opponentSan = solutionMoves[nextMoveIndex];
        chess.move(opponentSan);
        setPosition(chess.fen().split(" ")[0]);
        const afterOpponent = nextMoveIndex + 1;
        setMoveIndex(afterOpponent);

        if (afterOpponent >= solutionMoves.length) {
          setStatus("solved");
          setMessage("Puzzle solved!");
        }
      }, 500);

      return true;
    },
    [status, solutionMoves, moveIndex]
  );

  const handleShowSolution = () => {
    // Clear any pending reveal timeouts
    revealTimeouts.current.forEach(clearTimeout);
    revealTimeouts.current = [];

    // Reset to puzzle start
    const chess = new Chess(puzzle.fen);
    chessRef.current = chess;
    setPosition(puzzle.fen.split(" ")[0]);
    setStatus("revealed");
    setMessage("Solution:");
    setShowSolution(true);

    // Replay solution moves one at a time
    solutionMoves.forEach((san, i) => {
      const id = setTimeout(() => {
        chess.move(san);
        setPosition(chess.fen().split(" ")[0]);
        setMoveIndex(i + 1);
      }, (i + 1) * 800);
      revealTimeouts.current.push(id);
    });
  };

  const handleReset = () => {
    revealTimeouts.current.forEach(clearTimeout);
    revealTimeouts.current = [];
    chessRef.current = new Chess(puzzle.fen);
    setPosition(puzzle.fen.split(" ")[0]);
    setMoveIndex(0);
    setStatus("idle");
    setMessage("Find the best move!");
    setShowSolution(false);
  };

  const colorLabel = playerColor === "white" ? "White" : "Black";

  return (
    <div className="chess-game">
      <div className={`board-wrapper ${status === "incorrect" ? "shake" : ""}`}>
        <Chessboard
          options={{
            position,
            onPieceDrop: onDrop,
            boardOrientation: playerColor,
            allowDragging: status !== "solved" && status !== "revealed",
            boardStyle: {
              borderRadius: "4px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            },
          }}
        />
      </div>

      <div className={`feedback ${status}`}>
        <span>{message}</span>
      </div>

      <div className="game-controls">
        {status !== "solved" && !showSolution && (
          <button className="btn btn-secondary" onClick={handleShowSolution}>
            Show Solution
          </button>
        )}
        {(status === "solved" || showSolution) && (
          <button className="btn btn-secondary" onClick={handleReset}>
            Try Again
          </button>
        )}
        <p className="turn-label">{colorLabel} to move</p>
      </div>
    </div>
  );
};

export default ChessGame;

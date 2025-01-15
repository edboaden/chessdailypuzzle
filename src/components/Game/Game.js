import React, { useState, useRef, useEffect } from "react";
import { Chess } from "chess.js";
import { createBoard } from "../../functions";
import Board from "../Board/Board";

const Game = ({ fen, colorToMove }) => {
  useRef(new Chess(fen));
  const [board, setBoard] = useState(createBoard(fen));

  useEffect(() => {
    setBoard(createBoard(fen));
  }, [fen]);

  return (
    <div className="Game">
      <Board cells={board} colorToMove={colorToMove} />
    </div>
  );
};

export default Game;

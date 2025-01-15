import React from "react";
import "./Board.css";
import Cell from "../Cell/Cell";

const Board = ({ cells }) => {
  return (
    <div className="board">
      {cells.map((cell, index) => (
        <Cell cell={cell} index={index} key={cell.pos} />
      ))}
    </div>
  );
};

export default Board;

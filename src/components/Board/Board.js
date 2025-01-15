import React from "react";
import "./Board.css";
import Cell from "../Cell/Cell";

const Board = ({ cells, colorToMove }) => {
  return (
    <div className={`board ${colorToMove === "Black" ? "flipped" : ""}`}>
      {cells.map((cell, index) => (
        <Cell cell={cell} index={index} key={cell.pos} />
      ))}
    </div>
  );
};

export default Board;

import React from "react";
import "./Cell.css";
import Piece from "../Piece/Piece";

const Cell = ({ cell, index }) => {
  const color = (Math.floor(index / 8) + index) % 2 === 0 ? "light" : "dark";

  return (
    <div className={`cell ${color}`}>
      <Piece pos={cell.pos} name={cell.piece} />
    </div>
  );
};

export default Cell;

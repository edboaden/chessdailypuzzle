import React from "react";

const Piece = ({ name, pos }) => {
  const getPieceChar = (name) => {
    switch (name) {
      case "K":
        return "♔";
      case "Q":
        return "♕";
      case "R":
        return "♖";
      case "B":
        return "♗";
      case "N":
        return "♘";
      case "P":
        return "♙";
      case "k":
        return "♚";
      case "q":
        return "♛";
      case "r":
        return "♜";
      case "b":
        return "♝";
      case "n":
        return "♞";
      case "p":
        return "♟";
      default:
        return "";
    }
  };

  const pieceChar = getPieceChar(name);

  return <>{pieceChar}</>;
};

export default Piece;

import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [puzzle, setPuzzle] = useState(null);

  useEffect(() => {
    fetch("https://api.chess.com/pub/puzzle/random")
      .then((response) => response.json())
      .then((data) => setPuzzle(data))
      .catch((error) => console.error("Error fetching puzzle:", error));
  }, []);

  const formatDate = (unixTimestamp) => {
    if (!unixTimestamp) return "";
    const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };

  const [colorToMove, setColorToMove] = useState("White");
  const getColorToMove = (string) => {
    const parts = string.split(" ");
    const colorChar = parts.length > 1 ? parts[1][0] : "";
    if (colorChar === "b") {
      setColorToMove("Black");
    }
    return colorToMove;
  };

  const getSolution = (pgn) => {
    const splitter = "1...";
    const parts = pgn.split(splitter);
    return parts.length > 1 ? splitter + parts[1] : "";
  };

  return (
    <AppContext.Provider
      value={{ puzzle, formatDate, getColorToMove, getSolution }}
    >
      {children}
    </AppContext.Provider>
  );
};

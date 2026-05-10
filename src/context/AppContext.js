import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [puzzle, setPuzzle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.chess.com/pub/puzzle")
      .then((response) => response.json())
      .then((data) => setPuzzle(data))
      .catch((err) => {
        console.error("Error fetching puzzle:", err);
        setError("Failed to load today's puzzle.");
      });
  }, []);

  const formatDate = (unixTimestamp) => {
    if (!unixTimestamp) return "";
    const date = new Date(unixTimestamp * 1000);
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <AppContext.Provider value={{ puzzle, error, formatDate }}>
      {children}
    </AppContext.Provider>
  );
};

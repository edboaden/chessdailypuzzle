import React, { useEffect, useState } from "react";
import "./App.css";
import Game from "./components/Game/Game";

function App() {
  const [puzzle, setPuzzle] = useState(null);

  useEffect(() => {
    fetch("https://api.chess.com/pub/puzzle")
      .then((response) => response.json())
      .then((data) => setPuzzle(data))
      .catch((error) => console.error("Error fetching puzzle:", error));
  }, []);

  const formatDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
      date
    );

    return formattedDate;
  };

  return (
    <main className="App">
      <h1>Chess.com – Daily Puzzle</h1>
      {puzzle && (
        <>
          <p>{formatDate(puzzle.publish_time)}</p>
          {/* <p>{puzzle.pgn}</p> */}
          <Game fen={puzzle.fen} />
          <img src={puzzle.image} alt="Chess Puzzle" />
          <p>{puzzle.fen}</p>
          <a href={puzzle.url} target="_blank" rel="noopener noreferrer">
            View Puzzle on Chess.com
          </a>
        </>
      )}
    </main>
  );
}

export default App;

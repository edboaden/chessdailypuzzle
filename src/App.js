import React from "react";
import "./reset.css";
import "./App.css";
import Game from "./components/Game/Game";
import { AppProvider, AppContext } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <AppContext.Consumer>
        {({ puzzle, formatDate, getColorToMove, getSolution }) => (
          <main className="App">
            <h1>Daily Chess Puzzle • {formatDate(puzzle.publish_time)}</h1>
            {puzzle && (
              <>
                {/* <p>{formatDate(puzzle.publish_time)}</p> */}
                <Game
                  fen={puzzle.fen}
                  colorToMove={getColorToMove(puzzle.fen)}
                />
                <p>{getColorToMove(puzzle.fen)} to move</p>
                <h2>Solution</h2>
                <p>{getSolution(puzzle.pgn)}</p>
                <p>
                  <a
                    href={puzzle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Puzzle on Chess.com
                  </a>
                </p>
              </>
            )}
          </main>
        )}
      </AppContext.Consumer>
    </AppProvider>
  );
}

export default App;

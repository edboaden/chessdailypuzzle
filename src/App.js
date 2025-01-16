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
            {puzzle && (
              <>
                {/* <h1>Daily Chess Puzzle • {formatDate(puzzle.publish_time)}</h1> */}

                <Game
                  fen={puzzle.fen}
                  colorToMove={getColorToMove(puzzle.fen)}
                />

                <section className="text-section">
                  <h1>Daily Chess Puzzle</h1>
                  <h2>{formatDate(puzzle.publish_time)}</h2>
                  <p>{getColorToMove(puzzle.fen)} to move</p>
                  {getSolution(puzzle.pgn) && (
                    <div className="solution">
                      <h3>Solution</h3>
                      <p>{getSolution(puzzle.pgn)}</p>
                    </div>
                  )}
                  <p>
                    <a
                      href={puzzle.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Puzzle on Chess.com
                    </a>
                  </p>
                </section>
              </>
            )}
          </main>
        )}
      </AppContext.Consumer>
    </AppProvider>
  );
}

export default App;

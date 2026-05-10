import React, { useContext } from "react";
import "./reset.css";
import "./App.css";
import ChessGame from "./components/ChessGame/ChessGame";
import { AppProvider, AppContext } from "./context/AppContext";

function AppContent() {
  const { puzzle, error, formatDate } = useContext(AppContext);

  if (error) {
    return <main className="App"><p className="error-msg">{error}</p></main>;
  }

  if (!puzzle) {
    return <main className="App"><p className="loading-msg">Loading today's puzzle…</p></main>;
  }

  return (
    <main className="App">
      <ChessGame puzzle={puzzle} />

      <section className="text-section">
        <h1>Daily Chess Puzzle</h1>
        <h2>{formatDate(puzzle.publish_time)}</h2>
        <p>
          <a href={puzzle.url} target="_blank" rel="noopener noreferrer">
            View on Chess.com
          </a>
        </p>
      </section>
    </main>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;

"use client";

import { useContext, useState, useEffect } from "react";
import ChessGame from "./components/ChessGame/ChessGame";
import { AppProvider, AppContext } from "./context/AppContext";

function AppContent({ darkMode, toggleDarkMode }) {
  const { puzzle, error, formatDate } = useContext(AppContext);

  if (error) {
    return <main className="App"><p className="error-msg">{error}</p></main>;
  }

  if (!puzzle) {
    return <main className="App"><p className="loading-msg">Loading today&apos;s puzzle…</p></main>;
  }

  return (
    <main className="App">
      <ChessGame puzzle={puzzle} darkMode={darkMode} />

      <section className="text-section">
        <h1>Daily Chess Puzzle</h1>
        <h2>{formatDate(puzzle.publish_time)}</h2>
        <p>
          <a href={puzzle.url} target="_blank" rel="noopener noreferrer">
            View on Chess.com
          </a>
        </p>
        <button className="btn-dark-mode" onClick={toggleDarkMode}>
          {darkMode ? "Light mode" : "Dark mode"}
        </button>
      </section>
    </main>
  );
}

export default function Page() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Read once on mount rather than at initial render, since window is
    // unavailable during Next.js's server render of this client component.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <AppProvider>
      <AppContent darkMode={darkMode} toggleDarkMode={() => setDarkMode((d) => !d)} />
    </AppProvider>
  );
}

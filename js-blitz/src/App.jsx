// src/App.jsx
import React, { useState, useEffect } from 'react';
import GameList from './Components/GameList';
import './index.css';
import backgroundSound from './assets/backgroundSound.mp3'; // Import the local sound file

const App = () => {
  const [gamingMode, setGamingMode] = useState(false);

  useEffect(() => {
    const audio = new Audio(backgroundSound);
    if (gamingMode) {
      audio.play();
    } else {
      audio.pause();
    }
    return () => audio.pause();
  }, [gamingMode]);

  return (
    <div className={`min-h-screen ${gamingMode ? 'bg-gaming animate-background' : 'bg-normal'} text-secondary`}>
      <header className="bg-highlight text-white py-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl animate-fade-in">JS Game Blitz</h1>
        <button
          className="mt-4 px-4 py-2 bg-highlight-dark text-white rounded hover:bg-highlight transition-colors"
          onClick={() => setGamingMode(!gamingMode)}
        >
           {gamingMode ? 'Normal' : 'Gaming'} Mode
        </button>
      </header>
      <main className="p-6">
        <GameList />
      </main>
      <footer className={`py-4 text-center ${gamingMode ? 'bg-opacity-70' : 'bg-gray-900'} text-gray-300`}>
        <p className="text-sm">
          Made with ❤️ by <a href="https://github.com/mananjbhatt" className="underline hover:text-highlight" target="_blank" rel="noopener noreferrer">Manan J Bhatt</a>
        </p>
        <p className="text-sm mt-2">
          <a href="https://github.com/mananjbhatt" className="underline hover:text-highlight" target="_blank" rel="noopener noreferrer">GitHub</a> | <a href="https://www.linkedin.com/in/mananjbhatt" className="underline hover:text-highlight" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </p>
      </footer>
    </div>
  );
};

export default App;

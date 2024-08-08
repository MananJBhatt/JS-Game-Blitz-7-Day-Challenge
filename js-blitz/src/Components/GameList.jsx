// src/components/GameList.jsx
import React from 'react';
import GameCard from './GameCard';
import memoryGameImg from '../assets/memory.png';
import froggerImg from '../assets/frogger.png';
import breakoutImg from '../assets/breakout.png';
import rpsImg from '../assets/rps.png';
import spaceInvaderImg from '../assets/space_invader.png';
import wamImg from '../assets/wam.png'
import connectFourImg from '../assets/connect_four.png'

const games = [
  { title: 'Memory Game', description: 'Test your memory!', link: 'https://js-blitz-memory-game.netlify.app/', image: memoryGameImg  },
  { title: 'Whac-A-Mole', description: 'Hit the moles!', link: 'https://js-blitz-whac-a-mole.netlify.app/', image: wamImg  },
  { title: 'Breakout', description: 'Break the bricks!', link: 'https://js-blitz-breakout.netlify.app/', image: breakoutImg  },
  { title: 'Space Invaders', description: 'Defend against invaders!', link: 'https://js-blitz-space-invader.netlify.app/', image: spaceInvaderImg },
  { title: 'Frogger', description: 'Help the frog cross the road!', link: 'https://js-blitz-frogger.netlify.app/', image: froggerImg  },
  { title: 'Connect Four', description: 'Connect four discs!', link: 'https://js-blitz-connect-four.netlify.app/', image: connectFourImg  },
  { title: 'Rock Paper Scissors', description: 'Play Rock Paper Scissors!', link: 'https://js-blitz-rock-paper-scissors.netlify.app/', image: rpsImg },
];

const GameList = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">
    {games.map((game, index) => (
      <GameCard key={index} {...game} />
    ))}
  </div>
);

export default GameList;

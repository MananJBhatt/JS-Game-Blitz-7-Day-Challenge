// src/components/GameCard.jsx
import React from 'react';

const GameCard = ({ title, description, link, image }) => (
  <div className="bg-white text-gray-900 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 animate-scale-up border-2 border-gray-300">
    <div className="relative">{
        console.log(image)
    }
      <img src={image} alt={title} className="w-full h-40 object-cover" />
    </div>
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <a
        target='_blank'
        href={link}
        className="bg-gray-800 text-white hover:bg-gray-700 px-4 py-2 rounded transition-colors"
      >
        Play Now
      </a>
    </div>
  </div>
);

export default GameCard;

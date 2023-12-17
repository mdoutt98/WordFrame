import React from 'react';
import Tile from './Tile'; // Import your Tile component

const GameBoard = ({ letters }) => {
    return (
        <div className="grid grid-cols-4 gap-4">
            {letters.map((letter, index) => (
                <Tile key={index} letter={letter} />
            ))}
        </div>
    );
};

export default GameBoard;

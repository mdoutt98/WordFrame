import React, { useEffect, useState } from 'react';
import GameBoard from './GameBoard';

const Game = () => {
    const [letters, setLetters] = useState([]);

    useEffect(() => {
        // Fetch the daily words and letter tiles
        fetch('/api/daily-words')
            .then(response => response.json())
            .then(data => {
                // Set the letters state to the letter tiles from the backend
                setLetters(data.letterTiles.split('')); // Assuming letterTiles is a string
            })
            .catch(error => {
                console.error('Error fetching daily words:', error);
            });
    }, []);

    return (
        <div>
            <GameBoard letters={letters} />
        </div>
    );
};

export default Game;

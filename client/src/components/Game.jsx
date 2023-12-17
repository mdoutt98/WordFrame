import React, { useEffect, useState } from 'react';
import GameBoard from './GameBoard';
import styled from 'styled-components';

// Define breakpoints for different screen sizes, e.g., mobile devices
const mobileBreakpoint = '768px'; // typically the width for mobile devices

const GameWrapper = styled.div`
  position: relative;
  width: 60vw; // make the width relative to the viewport width
  height: 60vw; // make the height relative to the viewport width
  max-width: 300px; // maximum size of the game
  max-height: 300px; // maximum size of the game
  border: 1px solid black; // style the border as needed
  margin-top: 10vw;

  @media (max-width: ${mobileBreakpoint}) {
    margin-top: 5vw; // Adjust top margin for mobile devices
    width: 80vw; // Increase the size for mobile devices
    height: 80vw; // Maintain aspect ratio for mobile devices
    max-width: 80vw; // Allow it to scale with the viewport width
    max-height: 80vw; // Maintain aspect ratio
  }

  // Ensure the game maintains aspect ratio
  @media (orientation: portrait) {
    margin-top: 10vh;
    width: 40vh; // adjust the width in portrait mode
    height: 40vh; // adjust the height in portrait mode
    max-width: none; // override max-width for portrait orientation
    max-height: none; // override max-height for portrait orientation
  }
`;

const Game = () => {
    const [tiles, setTiles] = useState({ letters: [], corners: [] });

    useEffect(() => {
        fetch('/api/daily-words')
            .then(response => response.json())
            .then(data => {
                // Assuming data has exactly 9 letterTiles and 4 cornerTiles
                setTiles({
                    letters: data.letterTiles.split(''), // 9 middle letters
                    corners: data.cornerTiles // 4 corner letters
                });
            })
            .catch(error => {
                console.error('Error fetching daily words:', error);
            });
    }, []);

    return (
        <GameWrapper>
            <GameBoard tiles={tiles} />
        </GameWrapper>
    );
};

export default Game;


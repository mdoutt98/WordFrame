//Game.jsx
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
    const [tiles, setTiles] = useState({ letters: [], corners: [], revealed: [], answerGrid: [] });

    useEffect(() => {
        fetch('http://wfbe.mattdoutt.com/api/daily-words')
            .then(response => response.json())
            .then(data => {
                // Initialize the grid with tile objects
                const letterTiles = data.letterTiles.split('').map((letter, index) => ({
                    id: index,
                    letter: letter,
                    position: calculatePosition(index), // Function to calculate the tile's position
                    movable: true // Initially, all center tiles are movable
                }));

                const cornerTiles = data.cornerTiles.map((letter, index) => ({
                    id: 9 + index, // Assuming there are 9 letter tiles
                    letter: letter,
                    position: cornerPosition(index), // Function to determine corner positions
                    movable: false // Corner tiles are not movable
                }));

                // Process revealed letters
                const revealedTiles = data.revealedLetters.map((letter, index) => ({
                    letter: letter,
                    position: data.revealedLetterPositions[index], // Assuming this is an array of positions
                    movable: false
                }));


                setTiles(prevState => ({
                    ...prevState,
                    revealed: revealedTiles,
                    answerGrid: data.answerArray,
                    letters: letterTiles,
                    corners: cornerTiles,
                    words:data.words
                }));
            })
            .catch(error => {
                console.error('Error fetching daily words:', error);
            });
    }, []);

    // Helper function to calculate positions for center tiles
    function calculatePosition(index) {
        // Logic to calculate the position based on index for a 3x3 center grid
        const x = (index % 3) + 1; // Offset by 1 to place in center of 5x5 grid
        const y = Math.floor(index / 3) + 1; // Offset by 1 for the same reason
        return { x, y };
    }

    // Helper function to determine corner positions
    function cornerPosition(index) {
        // Define positions for the four corners
        const positions = [{x: 0, y: 0}, {x: 4, y: 0}, {x: 0, y: 4}, {x: 4, y: 4}];
        return positions[index];
    }

    return (
            <GameWrapper>
                <GameBoard tiles={tiles} answerArray={tiles.answerGrid} words={tiles.words}/>
            </GameWrapper>
    );
};

export default Game;

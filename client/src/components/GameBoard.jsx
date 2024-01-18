//GameBoard.jsx
import React, { useEffect, useState} from 'react';
import Tile from './Tile'; // Import your Tile component
import styled from 'styled-components';
import Modal from './Modal';

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); // Now a 5x5 grid
  gap: 0; 
  width: 100%;
  height: 100%;
  background-color: ghostwhite;
  margin-bottom: 50px;
`;

const SolveButton = styled.button`
  padding: 6px 20px; // Add some padding for better button sizing
  font-size: 1.6em; // Adjust font size as needed
  cursor: pointer; // Change cursor to indicate it's clickable
  border: none; // Remove default border
  border-radius: 5px; // Optionally round the corners
  background: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
  color: white; // Adjust text color for better readability
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3); // Add a subtle shadow for depth
  transition: transform 0.1s ease; // Smooth transform on click
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: -80px; // Adjust as needed to move the button below the board
  left: 35%;
  //transform: translateX(-50%);
  
  &:active {
    transform: translateY(3px); // Move the button down slightly when clicked
  }
`;

const RevealButton = styled(SolveButton)`
left: 40%;
bottom: -130px;
padding: 3px 10px; // Add some padding for better button sizing
font-size: 1em;
color: white;
`;


const GameBoard = ({ tiles, answerArray, words }) => {
    const { letters, corners, revealed } = tiles;
    const [grid, setGrid] = React.useState(Array(25).fill(null));
    const [selectedTile, setSelectedTile] = useState(null);
    const [selectedTileIndex, setSelectedTileIndex] = useState(null);
    const [isWinner, setIsWinner] = useState(false);

// Initialize the grid with tiles
    useEffect(() => {
        // Initialize a blank grid with moveable blank tiles instead of null
        const initialGrid = Array(25).fill(null).map((_, index) => {
            return {
                letter: null,
                movable: true
            };
        });

        // Place corner tiles
        initialGrid[0] = corners[0]; // top-left
        initialGrid[4] = corners[1]; // top-right
        initialGrid[20] = corners[2]; // bottom-left
        initialGrid[24] = corners[3]; // bottom-right

        // Place letter tiles in the 3x3 center grid
        let centerGridIndices = [6, 7, 8, 11, 12, 13, 16, 17, 18];
        centerGridIndices.forEach((index, i) => {
            if (letters[i]) {
                initialGrid[index] = letters[i];
            }
        });

        // Place revealed letter tiles
        revealed.forEach(tile => {
            if (tile && tile.position) {
                const gridIndex = tile.position[0] * 5 + tile.position[1];
                initialGrid[gridIndex] = tile;
            }
        });

        setGrid(initialGrid);
    }, [letters, corners, revealed]); // Dependency array/ Place letter tiles in the 3x3 center grid

    const onSelectTile = (tile, index) => {
        if (!tile || !tile.movable) {
            return; // If the tile is not movable, do nothing
        }

        if (selectedTile) {
            moveTile(index);
        } else {
            setSelectedTile({ tile, index });
            setSelectedTileIndex(index);
        }
    };

    const moveTile = (newIndex) => {
        if (!selectedTile) {
            return;
        }

        const newGrid = [...grid];
        const oldIndex = selectedTile.index;


        // Swap tiles
        [newGrid[oldIndex], newGrid[newIndex]] = [newGrid[newIndex], newGrid[oldIndex]];

        // Reset selected tile
        setSelectedTile(null);

        // Update the grid and check for winning condition
        setGrid(newGrid);

    };

    const checkWinCondition = (grid) => {
        let isWin = true;

        // Check the first and last rows
        for (let col = 0; col < 5; col++) {
            if (grid[0 * 5 + col].letter !== answerArray[0][col] ||
                grid[4 * 5 + col].letter !== answerArray[4][col]) {
                isWin = false;
                break;
            }
        }

        // If the first and last rows are correct, check the first and last columns
        if (isWin) {
            for (let row = 1; row < 4; row++) {
                if (grid[row * 5].letter !== answerArray[row][0] ||
                    grid[row * 5 + 4].letter !== answerArray[row][4]) {
                    isWin = false;
                    break;
                }
            }
        }

        // Update the grid with the correct/incorrect status for outermost tiles
        const newGrid = grid.map((tile, index) => {
            const row = Math.floor(index / 5);
            const col = index % 5;
            // For outermost tiles, update the isCorrect status
            if (row === 0 || row === 4 || col === 0 || col === 4) {
                const expectedLetter = answerArray[row][col];
                const isCorrect = tile.letter === expectedLetter;
                return { ...tile, isCorrect }; // Clone the tile object with updated isCorrect property
            }
            return tile; // Inner tiles remain the same
        });

        setGrid(newGrid); // Update the state with the new grid

        if (isWin) {
            setIsWinner(isWin);
        } else {
            // If not a winning condition, indicate the incorrect tiles somehow, e.g. alert or state update
        }
    };

    const restartGame = () => {
        window.location.reload(); // Reload the page to restart the game
    };

    const revealAnswer = () => {
        alert('Words: ' + words.join(', ')); // Display the answer array in an alert
    };

    return (
        <>
        <Board>
            {grid.map((tile, index) => (
                <div key={index}>
                    {tile ? <Tile tile={tile} index={index} onSelectTile={onSelectTile} isSelected={selectedTileIndex === index} /> : <div />}
                </div>
            ))}
        </Board>
            {isWinner && <Modal onRestart={restartGame} />}
    <SolveButton onClick={() => checkWinCondition(grid)}>Solve</SolveButton>
    <RevealButton onClick={revealAnswer}>Reveal</RevealButton>
        </>
    );
};

export default GameBoard;

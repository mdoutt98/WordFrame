//GameBoard.jsx
import React, { useEffect, useState} from 'react';
import Tile from './Tile'; // Import your Tile component
import styled from 'styled-components';

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
  bottom: -100px; // Adjust as needed to move the button below the board
  left: 33%;
  //transform: translateX(-50%);
  
  &:active {
    transform: translateY(3px); // Move the button down slightly when clicked
    
  }
`;



const GameBoard = ({ tiles, answerArray }) => {
    const { letters, corners, revealed } = tiles;
    const [grid, setGrid] = React.useState(Array(25).fill(null));
    const [selectedTile, setSelectedTile] = useState(null);
    const [selectedTileIndex, setSelectedTileIndex] = useState(null);

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
        const isWin = grid.every((tile, index) => {
            if (!tile || !tile.letter) return true;

            const row = Math.floor(index / 5);
            const col = index % 5;

            // Check only outermost tiles
            if (row === 0 || row === 4 || col === 0 || col === 4) {
                const isCorrect = tile.letter === answerArray[row][col];
                tile.isCorrect = isCorrect;
                return isCorrect;
            }

            return true;
        });

        if (isWin) {
            alert('Congrats, you won!');
        }
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
    <SolveButton onClick={() => checkWinCondition(grid)}>Solve</SolveButton>
    </>
    );
};

export default GameBoard;

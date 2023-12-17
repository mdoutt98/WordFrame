import React from 'react';
import Tile from './Tile'; // Import your Tile component
import styled from 'styled-components';

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); // Now a 5x5 grid
  gap: 0; 
  width: 100%;
  height: 100%;
`;

const GameBoard = ({ tiles }) => {
    const { letters, corners } = tiles;

    // Create an array to represent the 5x5 grid
    let grid = Array(25).fill(null);

    // Place corner tiles
    grid[0] = corners[0]; // top-left
    grid[4] = corners[1]; // top-right
    grid[20] = corners[2]; // bottom-left
    grid[24] = corners[3]; // bottom-right

    // Place letter tiles in the 3x3 center grid
    let centerGridIndices = [6, 7, 8, 11, 12, 13, 16, 17, 18];
    for (let i = 0; i < centerGridIndices.length; i++) {
        grid[centerGridIndices[i]] = letters[i];
    }

    return (
        <Board>
            {grid.map((letter, index) => (
                <Tile key={index} letter={letter || ''} /> // Empty string for null values
            ))}
        </Board>
    );
};

export default GameBoard;


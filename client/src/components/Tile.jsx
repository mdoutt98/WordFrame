// Tile.jsx
import React from 'react';
import styled from 'styled-components';

const TileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border: 1px solid black;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  font-size: 30px; /* Adjust font size as needed */
  font-weight: bold; /* This will make the font weight bold */
  background:linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
  background-color: ${({ $isBlank }) => $isBlank ? 'white' : '#FBAB7E'};
  opacity: ${({ $isBlank }) => $isBlank ? 0.5 : 1}; // Lower opacity for blank tiles
  cursor: pointer;
  border: ${({ isSelected }) => isSelected ? '2px solid purple' : '1px solid black'};
  background-color: ${({ isSelected, $isBlank }) => isSelected ? '#6C5B7B' : $isBlank ? 'white' : '#FBAB7E'};
  //color: ${({ $isCorrect }) => $isCorrect === null ? '#000' : $isCorrect ? 'green' : 'red'};
  
`;

const Tile = ({ tile, index, onSelectTile, isSelected }) => {
    const isBlank = tile.letter === null;

    return (
        <TileWrapper
            onClick={() => onSelectTile(tile, index)}
            isSelected={isSelected}
            $isBlank={tile.letter === null}
        >
            {tile.letter}
        </TileWrapper>
    );
};

export default Tile;

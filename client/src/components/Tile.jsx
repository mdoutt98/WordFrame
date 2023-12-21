// Tile.jsx
import React from 'react';
import styled from 'styled-components';

const TileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border: 1px solid black;
  font-size: 24px; /* Adjust font size as needed */
  font-weight: bold; /* This will make the font weight bold */
  background:linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
  cursor: pointer;
  //color: ${({ $isCorrect }) => $isCorrect === null ? '#000' : $isCorrect ? 'green' : 'red'};
  
`;

const Tile = ({ tile, index, onSelectTile }) => {
    return (
        <TileWrapper onClick={() => onSelectTile(tile, index)} $isCorrect={tile.isCorrect}>
            {tile.letter}
        </TileWrapper>
    );
};

export default Tile;

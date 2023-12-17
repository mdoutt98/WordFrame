import React from 'react';
import styled from 'styled-components';

const TileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border: 1px solid #000;
  font-size: 24px; /* Adjust font size as needed */
  font-weight: bold; /* This will make the font weight bold */
  background-color: ${props => props.letter ? '#FBAB7E' : '#FFFFFF'};
  background-image: ${props => props.letter ? 'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)' : 'none'};
  border-radius: ${props => props.isInner ? '8px' : '0'};
`;
const Tile = ({ letter, isOuter, isInner }) => {
    return (
        <TileWrapper letter={letter} isOuter={isOuter} isInner={isInner}>
            {letter}
        </TileWrapper>
    );
};

export default Tile;

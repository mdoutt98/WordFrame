// StartScreen.jsx
import React from 'react';
import styled from 'styled-components';

const StartOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; // Ensure it's above everything else
`;

const StartContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  background: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
  font-size: 1.7em;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

const StartButton = styled.button`
  padding: 10px 20px;
  background: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  font-size: 1.3em;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
`;

const StartScreen = ({ onStart }) => {
    return (
        <StartOverlay>
            <StartContent>

                <p>You have 2 minutes to unscramble the four words and solve the WordFrame.</p>
                <StartButton onClick={onStart}>Start!</StartButton>
            </StartContent>
        </StartOverlay>
    );
};

export default StartScreen;

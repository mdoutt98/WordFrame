import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Timer from './components/Timer';
import Game from './components/Game';
import StartScreen from './components/StartScreen';
import OutOfTimeModal from './components/OutOfTimeModal';

const mobileBreakpoint = '768px';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  width: 100vw;
  background-image: linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%);
`;

const TimerContainer = styled.div`
  margin-top: 6vh;
  font-size: 2em;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  @media (max-width: ${mobileBreakpoint}) {
    font-size: 1.7em;
    margin-top: 2vh;
  @media (orientation: portrait) {
    margin-top: 6vh;
    font-size: 2.2em;
      }
    \`;
    
    
  }
`;

const GameContainer = styled.div`
  position: relative;
  width: fit-content;


  @media (max-width: ${mobileBreakpoint}) {
    margin-top: 5px;
  }
`;

function App() {
    const [gameStarted, setGameStarted] = useState(false);
    const [showOutOfTimeModal, setShowOutOfTimeModal] = useState(false);
    const startGame = () => {
        setGameStarted(true); // This will hide the start screen and start the game
    };

    // Function to handle time-up event
    const handleTimeUp = () => {
        setShowOutOfTimeModal(true);
        setGameStarted(false); // Stop the game
    };

    const tryAgain = () => {
        setShowOutOfTimeModal(false);
        setGameStarted(false); // Reset the game state, ready to start again
    };

    return (
        <AppContainer>
            {!gameStarted && !showOutOfTimeModal && <StartScreen onStart={startGame} />}
            {gameStarted && (
                <>
            <TimerContainer>
                <Timer isRunning={gameStarted} onTimeUp={handleTimeUp} />
            </TimerContainer>
            <GameContainer>
                <Game />
            </GameContainer>
        </>
    )}
            {showOutOfTimeModal && <OutOfTimeModal onTryAgain={tryAgain} />}
        </AppContainer>
    );
}

export default App;

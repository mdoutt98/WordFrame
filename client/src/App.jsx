import React from 'react';
import styled from 'styled-components';
import Timer from './components/Timer';
import Game from './components/Game';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';

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
    return (
        <AppContainer>
            <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}> {/* Wrap with DndProvider */}
            <TimerContainer>
                <Timer /> {/* Only include this if you still have the Timer component */}
            </TimerContainer>
            <GameContainer>
                <Game /> {/* Only include this if you still have the Game component */}
            </GameContainer>
            </DndProvider>
        </AppContainer>
    );
}

export default App;

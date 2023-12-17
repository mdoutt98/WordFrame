import React from 'react';
import './App.css';
import Game from './components/Game'; // Assuming Game component is in the components folder
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="App">
                <h1>Welcome to Wordframe</h1>
                <Game />
            </div>
        </DndProvider>
    );
}

export default App;

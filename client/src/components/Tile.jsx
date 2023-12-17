import React from 'react';
import { useDrag } from 'react-dnd';

const Tile = ({ letter }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'letter',
        item: { letter },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`p-4 border rounded-lg text-center cursor-pointer ${isDragging ? 'bg-green-300' : 'bg-blue-300'}`}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            {letter}
        </div>
    );
};

export default Tile;

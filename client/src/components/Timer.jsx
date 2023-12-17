// Timer.jsx
import React, { useState, useEffect } from 'react';

const Timer = ({ initialTime }) => {
    const [time, setTime] = useState(initialTime);

    // Function to format the time as "mm:ss"
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    useEffect(() => {
        // Timer logic to decrease time by 1 second every second
        const timer = setInterval(() => {
            if (time > 0) {
                setTime((prevTime) => prevTime - 1);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [time]);

    return (
        <div>
            <p>Time Remaining: {formatTime(time)}</p>
        </div>
    );
};

export default Timer;

// Timer.jsx
import React, { useState, useEffect } from 'react';

const Timer = () => {
    const initialTime = 120; // Set initial time to 120 seconds (2 minutes)
    const [time, setTime] = useState(initialTime);

    // Function to format the time as "mm:ss"
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    useEffect(() => {
        // Timer logic to decrease time by 1 second every second
        const timer = time > 0 ? setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000) : null;

        // Clear interval on component unmount or when time reaches 0
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [time]);

    return (
        <div>
            <p>Time Remaining: {formatTime(time)}</p>
        </div>
    );
};

export default Timer;


import React, { useState, useEffect } from 'react';

const WindowWidthTracker: React.FC = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);

        // Cleanup when component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div style={{ padding: '1rem', border: '1px solid gray', marginTop: '1rem' }}>
            <h2>Window Width Tracker</h2>
            <p>Current width: {width}px</p>
        </div>
    );
};

export default WindowWidthTracker;

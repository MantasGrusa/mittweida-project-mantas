
import React, { useState } from 'react';

const ToggleBox: React.FC = () => {
    const [isActive, setIsActive] = useState(false);

    const toggle = () => setIsActive(prev => !prev);

    return (
        <div style={{ border: '1px solid gray', padding: '10px', margin: '10px', width: '150px' }}>
            <button onClick={toggle}>Toggle</button>
            {isActive && <p>Active</p>}
        </div>
    );
};

export default ToggleBox;

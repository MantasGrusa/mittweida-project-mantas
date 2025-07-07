import React from "react";
import "./StarterButton.css";

interface StarterButtonProps {
    onClick?: () => void;
    className?: string;
}

const StarterButton: React.FC<StarterButtonProps> = ({
                                                         onClick,
                                                         className = ""
                                                     }) => {
    return (
        <button
            onClick={onClick}
            className={`start-exploring-button pulse ${className}`}
        >
            Start exploring
        </button>
    );
};

export default StarterButton;
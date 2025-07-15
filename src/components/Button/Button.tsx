import React from "react";
import "../../Pages/Details/Button.css";

interface ButtonProps {
    onClick?: () => void;
    className?: string;
    children: React.ReactNode; // ✅ Add this
}

const Button: React.FC<ButtonProps> = ({
                                           onClick,
                                           className = "",
                                           children // ✅ Use this for the button label
                                       }) => {
    return (
        <button
            onClick={onClick}
            className={`start-exploring-button pulse ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;

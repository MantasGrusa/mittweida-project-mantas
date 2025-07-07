import type { FC } from "react";

interface ButtonProps {
    label: string;
    onClickHandler: (text: string) => void;
}

export const Button: FC<ButtonProps> = ({ label, onClickHandler }) => {
    return (
        <button
            className="fancy-button"
            onClick={() => onClickHandler("hello!!")}
        >
            {label.toUpperCase()}
        </button>
    );
};
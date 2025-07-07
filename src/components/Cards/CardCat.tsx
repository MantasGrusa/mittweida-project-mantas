import React from "react";
import "./CardCat.css";

interface CardProps {
    title: string;
    description?: string;
    onClick?: () => void;
    className?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
}

const Card: React.FC<CardProps> = ({
                                       title,
                                       description,
                                       onClick,
                                       className = "",
                                       icon,
                                       disabled = false
                                   }) => {
    return (
        <div
            className={`card ${disabled ? 'card--disabled' : ''} ${className}`}
            onClick={!disabled ? onClick : undefined}
            role={onClick ? "button" : undefined}
            tabIndex={onClick && !disabled ? 0 : undefined}
            onKeyDown={(e) => {
                if (onClick && !disabled && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    onClick();
                }
            }}
        >
            {icon && (
                <div className="card__icon">
                    {icon}
                </div>
            )}
            <div className="card__content">
                <h3 className="card__title">{title}</h3>
                {description && (
                    <p className="card__description">{description}</p>
                )}
            </div>
        </div>
    );
};

export default Card;
import React from "react";
import StartExploringButton from "./Button/StarterButton.tsx";
import "./HeroSection.css";

const HeroSection: React.FC = () => {
    const handleStartExploring = () => {
        // Add your navigation logic here
        console.log("Starting exploration...");
    };

    return (
        <div className="hero-section">
            {/* Background overlay */}
            <div className="hero-background-overlay"></div>

            {/* Main content */}
            <div className="hero-content">
                {/* Logo/Map silhouette area */}
                <div className="hero-logo-section">
                    <div className="hero-map-placeholder">
                        <div className="hero-map-text">MITTWEIDA</div>
                        <div className="hero-question-mark">?</div>
                    </div>
                </div>

                {/* Call to action */}
                <div className="hero-text-section">
                    <h1 className="hero-title">
                        Explore Mittweida
                    </h1>
                    <p className="hero-subtitle">
                        Discover the hidden gems and stories of our beautiful city
                    </p>

                    <div className="hero-button-container">
                        <StartExploringButton onClick={handleStartExploring} />
                    </div>
                </div>
            </div>

            {/* Decorative bottom fade */}
            <div className="hero-decorative-bottom"></div>
        </div>
    );
};

export default HeroSection;
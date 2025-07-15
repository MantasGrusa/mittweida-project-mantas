import React from 'react';
import SplineTrophy from "../../components/Spline/SplineTrophy.tsx";
import { useLocation } from 'wouter';


const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
    return (
        <div className="w-full bg-green-900/50 rounded-full h-3">
            <div
                className="bg-green-400 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

const JourneyCompletePage: React.FC = () => {
    const progress = 15;
    const [, setLocation] = useLocation();
    const handleHomeClick = () => {
        setLocation('/starter');
    };
    return (
        <div className="min-h-screen  flex items-center justify-center p-6">
            <div className="bg-green-800/40 backdrop-blur-sm rounded-3xl p-8 max-w-sm w-full border border-green-700/30 shadow-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-white text-2xl font-semibold mb-2">
                        Journey
                    </h1>
                    <h2 className="text-white text-2xl font-semibold">
                        Complete!
                    </h2>
                </div>

                {/* Spline Component */}
                <div className="flex justify-center mb-8">
                    <SplineTrophy/>
                </div>

                {/* Progress Section */}
                <div className="mb-8">
                    <div className="text-white text-lg font-medium mb-3">
                        Progress: {progress}%
                    </div>
                    <ProgressBar progress={progress} />
                </div>

                {/* Home Button */}
                <button onClick={handleHomeClick} className="w-full bg-green-400 hover:bg-green-300 text-green-900 font-semibold py-4 rounded-2xl transition-all duration-200 transform hover:scale-105 active:scale-95">
                    Home page
                </button>
            </div>
        </div>
    );
};

export default JourneyCompletePage;
import React, { useState, useEffect } from 'react';
import SplineTrophy from "../../components/Spline/SplineTrophy.tsx";
import { useLocation } from 'wouter';
import {API_BASE_URL} from "../../config.ts";


interface User {
    id: string;
    username: string;
    email: string;
}

interface LevelResult {
    success: boolean;
    message: string;
    progress: number;
    locationName: string;
    scannedCode: string;
}

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
    const [, setLocation] = useLocation();
    const [progress, setProgress] = useState(0);
    const [completedLocations, setCompletedLocations] = useState(0);
    const [totalLocations] = useState(9); // Total locations in your game
    const [levelResult, setLevelResult] = useState<LevelResult | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get user data
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }

        // Get the level completion result from QR scanner
        const storedResult = localStorage.getItem('levelResult');
        if (storedResult) {
            try {
                const result = JSON.parse(storedResult);
                setLevelResult(result);
                // Clean up the stored result
                localStorage.removeItem('levelResult');
            } catch (error) {
                console.error('Error parsing level result:', error);
            }
        }
    }, []);

    useEffect(() => {
        const fetchUserProgress = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/users/progress/${user.id}`);

                if (response.ok) {
                    const progressData = await response.json();
                    setProgress(progressData.percentage);
                    setCompletedLocations(progressData.completed);
                    console.log('Progress data:', progressData);
                } else {
                    console.error('Failed to fetch progress');
                    // Fallback to levelResult progress if API fails
                    if (levelResult) {
                        setProgress(levelResult.progress);
                    }
                }
            } catch (error) {
                console.error('Error fetching progress:', error);
                // Fallback to levelResult progress if API fails
                if (levelResult) {
                    setProgress(levelResult.progress);
                }
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchUserProgress();
        }
    }, [user, levelResult]);

    const handleHomeClick = () => {
        setLocation('/starter');
    };

    const handleContinueClick = () => {
        // Clear any stored location data and go to category selection
        localStorage.removeItem('currentLocation');
        localStorage.removeItem('expectedQRCode');
        localStorage.removeItem('currentLocationId');
        setLocation('/selection-cat');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="bg-green-800/40 backdrop-blur-sm rounded-3xl p-8 max-w-sm w-full border border-green-700/30 shadow-2xl">
                    <div className="text-center text-white">
                        <h2 className="text-2xl font-semibold mb-4">Loading...</h2>
                        <p>Calculating your progress...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="bg-green-800/40 backdrop-blur-sm rounded-3xl p-8 max-w-sm w-full border border-green-700/30 shadow-2xl">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-white text-2xl font-semibold mb-2">
                        {progress === 100 ? 'Journey' : 'Location'}
                    </h1>
                    <h2 className="text-white text-2xl font-semibold">
                        Complete!
                    </h2>
                    {levelResult && (
                        <p className="text-green-300 text-sm mt-2">
                            {levelResult.locationName}
                        </p>
                    )}
                </div>

                {/* Spline Component */}
                <div className="flex justify-center mb-6">
                    <SplineTrophy/>
                </div>

                {/* Success Message */}
                {levelResult && (
                    <div className="text-center mb-6">
                        <p className="text-white text-sm">
                            {levelResult.message}
                        </p>
                    </div>
                )}

                {/* Progress Section */}
                <div className="mb-6">
                    <div className="text-white text-lg font-medium mb-2">
                        Progress: {progress}%
                    </div>
                    <div className="text-white text-sm mb-3">
                        {completedLocations} of {totalLocations} locations completed
                    </div>
                    <ProgressBar progress={progress} />
                </div>

                {/* Completion Status */}
                {progress === 100 ? (
                    <div className="text-center mb-6">
                        <p className="text-green-300 text-lg font-semibold">
                            🎉 All locations completed!
                        </p>
                        <p className="text-white text-sm mt-2">
                            You've explored all of Mittweida!
                        </p>
                    </div>
                ) : (
                    <div className="text-center mb-6">
                        <p className="text-white text-sm">
                            {totalLocations - completedLocations} more locations to discover!
                        </p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                    {progress < 100 && (
                        <button
                            onClick={handleContinueClick}
                            className="w-full bg-green-400 hover:bg-green-300 text-green-900 font-semibold py-4 rounded-2xl transition-all duration-200 transform hover:scale-105 active:scale-95"
                        >
                            Continue Adventure
                        </button>
                    )}
                    <button
                        onClick={handleHomeClick}
                        className={`w-full ${progress === 100 ? 'bg-green-400 hover:bg-green-300' : 'bg-green-700 hover:bg-green-600'} text-white font-semibold py-4 rounded-2xl transition-all duration-200 transform hover:scale-105 active:scale-95`}
                    >
                        {progress === 100 ? 'Home' : 'Home Page'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JourneyCompletePage;
import React, { useState } from 'react';
import { ChevronLeft} from 'lucide-react';
import './Profile.css';
import { useLocation } from "wouter";

import SplineProfile from "../../components/Spline/SplineProfile.tsx";
interface ProfileData {
    name: string;
    progress: number;
    friends: number;
    placesVisited: number;
}

const ProfilePage: React.FC = () => {
    const [profile] = useState<ProfileData>({
        name: "Profile Name",
        progress: 15,
        friends: 5,
        placesVisited: 10
    });
    const [, setLocation] = useLocation();
    const handleBack = () => {
        setLocation('/starter');
        console.log('Back button clicked');
    };

    const handleEditProfile = () => {
        // Handle profile editing
        console.log('Edit profile clicked');
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                {/* Profile Icon */}
                <div className="profile-icon-container">
                    <div className="profile-icon">
                        {/* Replace this with your Svelte icon component */}
                        <SplineProfile/>
                    </div>
                </div>

                {/* Profile Name */}
                <div className="profile-name-container">
                    <h1
                        className="profile-name"
                        onClick={handleEditProfile}
                    >
                        *{profile.name}*
                    </h1>
                </div>

                {/* Progress Bar */}
                <div className="progress-section">
                    <div className="progress-header">
                        <span className="progress-label">Progress: {profile.progress}%</span>
                    </div>
                    <div className="progress-track">
                        <div
                            className="progress-fill progress-fill-animated"
                            style={{ width: `${profile.progress}%` }}
                        />
                    </div>
                </div>

                {/* Stats */}
                <div className="stats-section">
                    <div className="stat-item">
                        <span className="stat-label">Friends:</span>
                        <span className="stat-value">{profile.friends}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Places visited:</span>
                        <span className="stat-value">{profile.placesVisited}</span>
                    </div>
                </div>

                {/* Back Button */}
                <div className="back-button-container">
                    <button
                        onClick={handleBack}
                        className="back-button"
                    >
                        <ChevronLeft />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
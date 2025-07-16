import React, { useState, useEffect } from 'react';
import { ChevronLeft, Trash2 } from 'lucide-react';
import './Profile.css';
import { useLocation } from "wouter";
import SplineProfile from "../../components/Spline/SplineProfile.tsx";

interface User {
    id: string;
    username: string;
    email: string;
    createdAt: string;
}

interface ProgressData {
    completed: number;
    total: number;
    percentage: number;
    completedLocations: any[];
}

const ProfilePage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [progressData, setProgressData] = useState<ProgressData>({
        completed: 0,
        total: 9,
        percentage: 0,
        completedLocations: []
    });
    const [loading, setLoading] = useState(false);
    const [progressLoading, setProgressLoading] = useState(true);
    const [, setLocation] = useLocation();

    useEffect(() => {
        // Get user data from localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    useEffect(() => {
        const fetchUserProgress = async () => {
            if (!user) {
                setProgressLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/users/progress/${user.id}`);

                if (response.ok) {
                    const data = await response.json();
                    setProgressData(data);
                    console.log('User progress:', data);
                } else {
                    console.error('Failed to fetch user progress');
                }
            } catch (error) {
                console.error('Error fetching user progress:', error);
            } finally {
                setProgressLoading(false);
            }
        };

        if (user) {
            fetchUserProgress();
        }
    }, [user]);

    const handleBack = () => {
        setLocation('/starter');
        console.log('Back button clicked');
    };

    const handleEditProfile = () => {
        // Handle profile editing
        console.log('Edit profile clicked');
    };

    const handleDeleteAccount = async () => {
        if (!user) {
            alert('No user data found');
            return;
        }

        const confirmDelete = window.confirm(
            'Are you sure you want to delete your account? This action cannot be undone.'
        );

        if (!confirmDelete) return;

        setLoading(true);

        try {
            const response = await fetch(`http://localhost:3000/users/${user.id}`, {
                method: 'DELETE',
            });

            if (response.ok || response.status === 204) {
                // Clear all user data from localStorage
                localStorage.removeItem('user');
                localStorage.removeItem('currentLocation');
                localStorage.removeItem('expectedQRCode');
                localStorage.removeItem('currentLocationId');
                localStorage.removeItem('levelResult');
                alert('Account deleted successfully');
                setLocation('/'); // Redirect to home or login page
            } else {
                alert('Failed to delete account. Please try again.');
            }
        } catch (error) {
            alert('Network error. Please try again.');
            console.error('Delete account error:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatJoinDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            return 'Recently';
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                {/* Profile Icon */}
                <div className="profile-icon-container">
                    <div className="profile-icon">
                        <SplineProfile/>
                    </div>
                </div>

                {/* Profile Name */}
                <div className="profile-name-container">
                    <h1
                        className="profile-name"
                        onClick={handleEditProfile}
                    >
                        *{user ? user.username : "Loading..."}*
                    </h1>
                    {user && (
                        <>
                            <p className="text-gray-400 text-sm mt-1">{user.email}</p>
                            <p className="text-gray-500 text-xs mt-1">
                                Joined {formatJoinDate(user.createdAt)}
                            </p>
                        </>
                    )}
                </div>

                {/* Progress Bar */}
                <div className="progress-section">
                    <div className="progress-header">
                        <span className="progress-label">
                            Progress: {progressLoading ? "..." : `${progressData.percentage}%`}
                        </span>
                    </div>
                    <div className="progress-track">
                        <div
                            className="progress-fill progress-fill-animated"
                            style={{ width: `${progressLoading ? 0 : progressData.percentage}%` }}
                        />
                    </div>
                    {!progressLoading && (
                        <div className="progress-details" style={{
                            textAlign: 'center',
                            marginTop: '8px',
                            fontSize: '12px',
                            color: '#888'
                        }}>
                            {progressData.completed} of {progressData.total} locations completed
                        </div>
                    )}
                </div>

                {/* Stats */}
                <div className="stats-section">
                    <div className="stat-item">
                        <span className="stat-label">Locations Explored:</span>
                        <span className="stat-value">
                            {progressLoading ? "..." : progressData.completed}
                        </span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Total Locations:</span>
                        <span className="stat-value">{progressData.total}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Completion Rate:</span>
                        <span className="stat-value">
                            {progressLoading ? "..." : `${progressData.percentage}%`}
                        </span>
                    </div>
                </div>

                {/* Achievement Section */}
                {!progressLoading && progressData.percentage > 0 && (
                    <div className="achievement-section" style={{
                        margin: '20px 0',
                        padding: '15px',
                        background: 'rgba(34, 197, 94, 0.1)',
                        borderRadius: '8px',
                        border: '1px solid rgba(34, 197, 94, 0.3)'
                    }}>
                        <h3 style={{
                            color: 'white',
                            fontSize: '14px',
                            marginBottom: '8px',
                            textAlign: 'center'
                        }}>
                            🏆 Achievements
                        </h3>
                        <div style={{ fontSize: '12px', color: '#ccc', textAlign: 'center' }}>
                            {progressData.percentage === 100 ? (
                                <span style={{ color: '#22c55e', fontWeight: 'bold' }}>
                                    🎉 Explorer Master - All locations discovered!
                                </span>
                            ) : progressData.percentage >= 75 ? (
                                <span style={{ color: '#fbbf24' }}>
                                    🌟 Advanced Explorer - Almost there!
                                </span>
                            ) : progressData.percentage >= 50 ? (
                                <span style={{ color: '#60a5fa' }}>
                                    🗺️ Skilled Navigator - Halfway complete!
                                </span>
                            ) : progressData.percentage >= 25 ? (
                                <span style={{ color: '#a78bfa' }}>
                                    🧭 Rising Explorer - Good progress!
                                </span>
                            ) : (
                                <span style={{ color: '#f87171' }}>
                                    🚀 New Adventurer - Just getting started!
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Delete Account Button */}
                <div className="delete-account-section mt-6">
                    <button
                        onClick={handleDeleteAccount}
                        disabled={loading}
                        className="delete-account-button bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto transition disabled:opacity-50"
                    >
                        <Trash2 size={16} />
                        {loading ? "Deleting..." : "Delete Account"}
                    </button>
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
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation } from 'wouter';
import { useState, useEffect } from 'react';
import './LocationDetail.css';

type LocationCategory = 'sports' | 'nightlife' | 'culture';

interface Location {
    id: string;
    name: string;
    category: LocationCategory;
    latitude: number;
    longitude: number;
    description: string;
    qrCode: string;
    imageUrl: string;
}

interface User {
    id: string;
    username: string;
    email: string;
}

type LocationDetailProps = {
    category: LocationCategory;
};

const LocationDetail = ({ category }: LocationDetailProps) => {
    const [, setLocation] = useLocation();
    const [locationData, setLocationData] = useState<Location | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Get user data from localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            setError('Please log in first');
            setLoading(false);
            return;
        }
    }, []);

    useEffect(() => {
        const fetchRandomLocation = async () => {
            if (!user) return;

            // Check if we just cleared location data (coming from back navigation)
            const clearedFlag = localStorage.getItem('locationDataCleared');
            if (clearedFlag) {
                localStorage.removeItem('locationDataCleared');
                // Don't fetch new location, let user see the category page
                setLoading(false);
                return;
            }

            setLoading(true);
            setError('');

            try {
                const response = await fetch(
                    `http://localhost:3000/users/location/random?category=${category}&userId=${user.id}`
                );

                if (response.ok) {
                    const location = await response.json();
                    setLocationData(location);
                    // Store the current location for the map page
                    localStorage.setItem('currentLocation', JSON.stringify(location));
                } else if (response.status === 404) {
                    setError(`You've completed all ${category} locations! Choose another category.`);
                } else {
                    setError('Failed to get location. Please try again.');
                }
            } catch (error) {
                setError('Network error. Please check your connection.');
                console.error('Fetch location error:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchRandomLocation();
        }
    }, [category, user]);

    const handleBackClick = () => {
        window.location.href = "/#/selection-cat";
    };

    const handleNextClick = () => {
        console.log("Next button clicked");
        console.log("Category:", category);
        console.log("Location data:", locationData);

        if (locationData) {
            console.log("Navigating to map with category:", category);
            window.location.href = `/#/map/${category}`;
        } else {
            console.log("No location data available");
        }
    };

    // Fallback data for when loading or error
    const getFallbackData = (category: LocationCategory) => {
        const fallbacks = {
            sports: {
                name: "Sports Location",
                description: "Get ready for an exciting sports adventure!"
            },
            nightlife: {
                name: "Nightlife Location",
                description: "Discover the vibrant nightlife scene!"
            },
            culture: {
                name: "Cultural Location",
                description: "Explore rich cultural heritage!"
            }
        };
        return fallbacks[category];
    };

    const fallbackData = getFallbackData(category);

    if (!user && !loading) {
        return (
            <div className="location-detail">
                <div className="location-card">
                    <button onClick={handleBackClick} className="back-button">
                        <ChevronLeft size={20} />
                    </button>
                    <div className="error-message">
                        <p>Please log in to play the game</p>
                        <button onClick={() => setLocation('/login')} className="login-button">
                            Go to Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="location-detail">
            <div className="location-card">
                <button onClick={handleBackClick} className="back-button">
                    <ChevronLeft size={20} />
                </button>

                <div className="location-name">
                    {loading ? 'Finding location...' :
                        error ? fallbackData.name :
                            locationData?.name || fallbackData.name}
                </div>

                <div className="location-image">
                    {loading ? (
                        <div className="image-placeholder">
                            Loading...
                        </div>
                    ) : error ? (
                        <div className="image-placeholder">
                            Image unavailable
                        </div>
                    ) : locationData?.imageUrl ? (
                        <img
                            src={locationData.imageUrl}
                            alt={locationData.name}
                            style={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: '8px'
                            }}
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.setAttribute('style', 'display: block');
                            }}
                        />
                    ) : (
                        <div className="image-placeholder">
                            Image
                        </div>
                    )}
                    {locationData?.imageUrl && (
                        <div
                            className="image-placeholder"
                            style={{ display: 'none' }}
                        >
                            Image unavailable
                        </div>
                    )}
                </div>

                <div className="location-description">
                    {loading ? 'Searching for an exciting location for you...' :
                        error ? error :
                            locationData?.description || fallbackData.description}
                </div>

                {loading && (
                    <div className="loading-spinner">
                        <p>Getting your next adventure...</p>
                    </div>
                )}

                {error && !loading && (
                    <button
                        onClick={() => window.location.reload()}
                        className="retry-button"
                        style={{
                            background: '#ff6b6b',
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            border: 'none',
                            margin: '10px 0'
                        }}
                    >
                        Try Another Location
                    </button>
                )}

                <button
                    onClick={() => {
                        console.log("NEXT BUTTON CLICKED!");
                        handleNextClick();
                    }}
                    className="next-button"
                    disabled={loading || error !== '' || !locationData}
                    style={{
                        opacity: (loading || error !== '' || !locationData) ? 0.5 : 1,
                        cursor: (loading || error !== '' || !locationData) ? 'not-allowed' : 'pointer'
                    }}
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default LocationDetail;
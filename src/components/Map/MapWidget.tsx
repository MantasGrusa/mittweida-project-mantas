import { useParams, useLocation } from 'wouter';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../components/Map/Map.css';

interface Location {
    id: string;
    name: string;
    category: 'sports' | 'nightlife' | 'culture';
    latitude: number;
    longitude: number;
    description: string;
    qrCode: string;
    imageUrl: string;
}

// Fallback coordinates if no location data is found
const fallbackCoordinates = {
    sports: {
        name: "Sports Location",
        lat: 50.9866,
        lng: 12.9714,
    },
    nightlife: {
        name: "Nightlife Location",
        lat: 50.9866,
        lng: 12.9714,
    },
    culture: {
        name: "Cultural Location",
        lat: 50.9866,
        lng: 12.9714,
    }
};

type LocationCategory = keyof typeof fallbackCoordinates;

const MapView = () => {
    const { category } = useParams<{ category: LocationCategory }>();
    const [, setLocation] = useLocation();
    const [locationData, setLocationData] = useState<Location | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get the location data stored by LocationDetail page
        const storedLocation = localStorage.getItem('currentLocation');

        if (storedLocation) {
            try {
                const location = JSON.parse(storedLocation);
                setLocationData(location);
            } catch (error) {
                console.error('Error parsing stored location:', error);
            }
        }
        setLoading(false);
    }, []);

    const handleQRClick = () => {
        // Store the QR code for the scanner page
        if (locationData) {
            localStorage.setItem('expectedQRCode', locationData.qrCode);
            localStorage.setItem('currentLocationId', locationData.id);
        }
        setLocation('/qr');
    };

    const handleBackClick = () => {
        console.log("=== BACK BUTTON FUNCTION CALLED ===");
        window.location.href = "/#/selection-cat";
    };

    // Use real location data if available, otherwise fall back to category defaults
    const displayData = locationData ? {
        name: locationData.name,
        lat: locationData.latitude,
        lng: locationData.longitude,
        description: locationData.description
    } : (category && fallbackCoordinates[category]
        ? fallbackCoordinates[category]
        : fallbackCoordinates.sports);

    if (loading) {
        return (
            <div className="map-container">
                <h2>Loading map...</h2>
                <div className="loading-message">
                    <p>Preparing your location...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="map-container">
            <button
                onClick={() => {
                    alert("BACK BUTTON CLICKED!");
                    console.log("=== BACK BUTTON CLICKED ===");
                    handleBackClick();
                }}
                style={{
                    position: 'fixed',
                    top: '20px',
                    left: '20px',
                    zIndex: 99999,
                    background: 'red',
                    color: 'white',
                    border: '5px solid yellow',
                    borderRadius: '10px',
                    width: '100px',
                    height: '50px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold'
                }}
            >
                BACK
            </button>

            <h2>{displayData.name}</h2>

            <MapContainer
                center={[displayData.lat, displayData.lng]}
                zoom={15}
                scrollWheelZoom={true}
                className="leaflet-container"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />
                <Marker
                    position={[displayData.lat, displayData.lng]}
                    icon={L.icon({
                        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41]
                    })}
                >
                    <Popup>
                        <div>
                            <strong>{displayData.name}</strong>
                            {locationData && (
                                <p style={{ margin: '5px 0', fontSize: '12px' }}>
                                    {locationData.description}
                                </p>
                            )}
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>

            <div className="address-box">
                {locationData ? (
                    <div>
                        <strong>Your Destination:</strong>
                        <br />
                        {displayData.name}
                        <br />
                        <small>Lat: {displayData.lat.toFixed(4)}, Lng: {displayData.lng.toFixed(4)}</small>
                        {locationData.description && (
                            <>
                                <br />
                                <small>{locationData.description}</small>
                            </>
                        )}
                    </div>
                ) : (
                    "Navigate to your destination and scan the QR code!"
                )}
            </div>

            <button className="qr-button" onClick={handleQRClick}>
                <img src="/assets/qr-icon.png" alt="QR" />
                <span style={{ display: 'block', fontSize: '12px', marginTop: '5px' }}>
                    Scan QR Code
                </span>
            </button>
        </div>
    );
};

export default MapView;
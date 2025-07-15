import { useParams, useLocation } from 'wouter';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../components/Map/Map.css';

const coordinates = {
    sports: {
        name: "Sports Arena Complex",
        lat: 50.9866,
        lng: 12.9714,
    },
    nightlife: {
        name: "Downtown Club District",
        lat: 50.9866,
        lng: 12.9714,
    },
    culture: {
        name: "Heritage Arts Center",
        lat: 50.9866,
        lng: 12.9714,
    }
};

type LocationCategory = keyof typeof coordinates;

const MapView = () => {
    const { category } = useParams<{ category: LocationCategory }>();
    const [,setLocation] = useLocation();
    
    const locationData = category && coordinates[category as LocationCategory] 
        ? coordinates[category as LocationCategory]
        : coordinates.nightlife;

    const handleQRClick = () => {
        setLocation('/qr');   
    };

    return (
        <div className="map-container">
            <h2>{locationData.name}</h2>

            <MapContainer
                center={[locationData.lat, locationData.lng]}
                zoom={15}
                scrollWheelZoom={true}
                className="leaflet-container"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />
                <Marker
                    position={[locationData.lat, locationData.lng]}
                    icon={L.icon({
                        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41]
                    })}
                >
                    <Popup>{locationData.name}</Popup>
                </Marker>
            </MapContainer>

            <div className="address-box">Address Placeholder</div>

            <button className="qr-button" onClick={handleQRClick}>
                <img src="/assets/qr-icon.png" alt="QR" />
            </button>
        </div>
    );
};

export default MapView;

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation } from 'wouter';
import './LocationDetail.css';

const LocationDetail = ({ category }) => {
    const [, setLocation] = useLocation();

    const handleBackClick = () => {
        setLocation('/selection-cat');
    };

    const handleNextClick = () => {
        setLocation(`/map/${category}`);
    };


    // Sample data based on category
    const getLocationData = (category) => {
        const locations = {
            sports: {
                name: "Sports Arena Complex",
                image: "/api/placeholder/300/200",
                description: "State-of-the-art sports facility featuring multiple courts, swimming pools, and fitness centers. Perfect for all your athletic needs."
            },
            nightlife: {
                name: "Downtown Club District",
                image: "/api/placeholder/300/200",
                description: "Vibrant nightlife scene with trendy bars, dance clubs, and live music venues. Experience the city's best entertainment."
            },
            culture: {
                name: "Heritage Arts Center",
                image: "/api/placeholder/300/200",
                description: "Historic cultural center showcasing local art, traditional performances, and interactive exhibits celebrating our rich heritage."
            }
        };
        return locations[category] || locations.sports;
    };

    const locationData = getLocationData(category);

    return (
        <div className="location-detail">
            <div className="location-card">
                <button onClick={handleBackClick} className="back-button">
                    <ChevronLeft size={20} />
                </button>

                <div className="location-name">
                    {locationData.name}
                </div>

                <div className="location-image">
                    <div className="image-placeholder">
                        Image
                    </div>
                </div>

                <div className="location-description">
                    {locationData.description}
                </div>

                <button onClick={handleNextClick} className="next-button">
                    <ChevronRight size={20} />
                </button>

            </div>
        </div>
    );
};

export default LocationDetail;
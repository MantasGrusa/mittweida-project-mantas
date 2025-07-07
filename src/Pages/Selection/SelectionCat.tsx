import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation } from 'wouter';
import './Selection.css';

const SelectionCat = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const [, setLocation] = useLocation();

    const categories = [
        { id: 1, title: 'Sports', route: '/location/sports' },
        { id: 2, title: 'Nightlife', route: '/location/nightlife' },
        { id: 3, title: 'Culture', route: '/location/culture' }
    ];

    const handleCardClick = (category) => {
        setSelectedCard(category.id);
        // Navigate to the specific location page
        setLocation(category.route);
    };

    const handleBackClick = () => {
        setLocation('/starter');
    };

    const handleNextClick = () => {
        if (selectedCard) {
            const selectedCategory = categories.find(cat => cat.id === selectedCard);
            if (selectedCategory) {
                setLocation(selectedCategory.route);
            }
        }
    };

    return (
        <div className="selection-page">
            <div className="header">
                <h1>Pick a<br />category</h1>
            </div>

            <div className="cards-container">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        onClick={() => handleCardClick(category)}
                        className={`card ${selectedCard === category.id ? 'card-selected' : ''}`}
                    >
                        <h3>{category.title}</h3>
                        {selectedCard === category.id && <div className="selection-dot"></div>}
                    </div>
                ))}
            </div>

            <div className="navigation">
                <button onClick={handleBackClick} className="nav-button">
                    <ChevronLeft size={24} />
                </button>
                <button onClick={handleNextClick} className="nav-button">
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default SelectionCat;
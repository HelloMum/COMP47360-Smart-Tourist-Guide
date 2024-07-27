import React, { useState, useEffect } from 'react';
import '../../pages/dashboard/Dashboard.css';

const FetchItinerary = () => {
    const [itinerary, setItinerary] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [collapsedItems, setCollapsedItems] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchItinerary = async () => {
            try {
                const response = await fetch(`/api/itinerary/user?token=${token}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log("saved iternary data:", data); // Log the fetched data

                // Convert the object with numerical keys to an array
                const itineraryArray = Object.keys(data).map(key => data[key]);
                setItinerary(itineraryArray);

                // Initialize collapsedItems state to collapse all items by default
                const initialCollapsedState = {};
                itineraryArray.forEach((_, index) => {
                    initialCollapsedState[index] = true;
                });
                setCollapsedItems(initialCollapsedState);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItinerary();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const toggleCollapse = (index) => {
        setCollapsedItems(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const renderItineraries = () => {
        if (itinerary.length === 0) {
            return <div>No journeys found</div>;
        }

        let journeyCards = [];
        for (let i = 0; i < itinerary.length; i++) {
            const journey = itinerary[i];
            journeyCards.push(
                <div key={i} className="journey-card">
                    <div className="journey-header" onClick={() => toggleCollapse(i)}>
                        <div className="journey-title">
                            NYC {journey.startDate} - {journey.endDate}
                        </div>
                        <button className="toggle-button">
                            {collapsedItems[i] ? '▼' : '▲'}
                        </button>
                    </div>
                    {!collapsedItems[i] && journey.planData && (
                        <div className="journey-details">
                            {Object.keys(journey.planData).map((date) => (
                                <div key={date} className="date-section">
                                    {journey.planData[date].slice().reverse().map((item, itemIndex, array) => (
                                        <div key={item.id} className="item-container">
                                            <div className={`item-icon ${itemIndex === array.length - 1 ? 'no-line' : ''}`}>
                                                <div className="circle">{itemIndex + 1}</div>
                                                {itemIndex < array.length - 1 && <div className="dashed-line"></div>}
                                            </div>
                                            <div className="item-details">
                                                <h4 className="item-name">{item.name}</h4>
                                                <p className="item-category">{item.category}</p>
                                                <p className="item-date">{date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }
        return journeyCards;
    };

    return (
        <div className="itinerary-container">
            <h1 className="title">My journeys</h1>
            {itinerary.length > 0 ? renderItineraries() : <div>No journeys found</div>}
        </div>
    );
};

export default FetchItinerary;

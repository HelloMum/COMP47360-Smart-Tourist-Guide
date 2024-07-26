import React, { useState, useEffect } from 'react';
import '../../pages/dashboard/Dashboard.css';

const FetchItinerary = () => {
    const [itinerary, setItinerary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(true); // State to manage collapse/expand

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchItinerary = async () => {
            try {
                const response = await fetch(`/api/itinerary/user?token=${token}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setItinerary(data);
                console.log(data);
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

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="itinerary-container">
            <h1 className="title">My journeys</h1>
            {itinerary && (
                <div className="journey-card">
                    <div className="journey-header" onClick={toggleCollapse}>
                        <div className="journey-title">
                            NYC {itinerary[0].startDate} - {itinerary[0].endDate}
                        </div>
                        <button className="toggle-button">
                            {isCollapsed ? '▼' : '▲'}
                        </button>
                    </div>
                    {!isCollapsed && (
                        <div className="journey-details">
                            {Object.keys(itinerary[0].planData).map((date) => (
                                <div key={date} className="date-section">
                                    {itinerary[0].planData[date].slice().reverse().map((item, index) => ( // Reverse the order of events
                                        <div key={item.id} className="item-container">
                                            <div className="item-icon">
                                                <div className="circle"></div>
                                                {index < itinerary[0].planData[date].length - 1 && <div className="dashed-line"></div>}
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
            )}
        </div>
    );
};

export default FetchItinerary;

import React, { useState, useEffect } from 'react';
import '../../pages/user/Dashboard.css';

const Fetchstatistics = () => {
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchStatistics = async () => {
            try {
                const response = await fetch(`/api/itinerary/statistics?token=${token}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setStatistics(data);
                console.log('satistics',data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="statistics-container">
            <h1 className="title">My Statistics</h1>
            {statistics && (
               
              
                      <div className="statistics-card">
                        <div className="statistics-item">
                            <strong>Most Popular Category:</strong>
                        </div>
                        <div className="value">{statistics.favouriteCategory}</div>
                    </div>
      
               
            )}
        </div>
    );
};

export default Fetchstatistics;

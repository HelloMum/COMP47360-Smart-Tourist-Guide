import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import ItineraryCard from './ItineraryCard';

const FetchItinerary: React.FC = () => {
    const [itinerary, setItinerary] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchItinerary = async () => {
            try {
                const response = await fetch(`/api/itinerary/user?token=${token}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log("saved itinerary data:", data); // Log the fetched data

                // Convert the object with numerical keys to an array
                const itineraryArray = Object.keys(data).map(key => data[key]);
                setItinerary(itineraryArray);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItinerary();
    }, []);

    if (loading) return <Box marginLeft={10}>Loading...</Box>;
    if (error) return <Box>Error: {error}</Box>;

    return (
        <Box
            sx={{
                overflowY: 'scroll',
                height: '100%',
                marginLeft:'70px',
                msOverflowStyle: 'none',  /* IE and Edge */
                scrollbarWidth: 'none',  /* Firefox */
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
            }}
        >
           <h2 style={{ marginLeft: 0, marginBottom: '25px', fontFamily: '"Lexend", sans-serif', fontSize: '22px' }}>My Plans
            </h2>

            
            {itinerary.length === 0 ? (
                <Box>No Plan found</Box>
            ) : (
                itinerary.map((journey, index) => (
                    <ItineraryCard
                        key={index}
                        itinerary={journey}
                        index={index}
                        onStartTimeClick={(startTime) => console.log(startTime)}
                        highlightedStartTime={null}
                    />
                ))
            )}
        </Box>
    );
};

export default FetchItinerary;

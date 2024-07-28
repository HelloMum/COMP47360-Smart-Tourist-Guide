import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography } from '@mui/material';
import ItineraryCard from './ItineraryCard';
import { useLastUpdatedContext } from "../../contexts/LastUpdatedContext";

const FetchItinerary: React.FC = () => {
  const [itinerary, setItinerary] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { lastUpdate } = useLastUpdatedContext(); // Use the context to access lastUpdate

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchItinerary = async () => {
      try {
        const url = `/api/itinerary/user?token=${token}&timestamp=${new Date().getTime()}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("saved itinerary data:", data); // Log the fetched data

        // Convert the object with numerical keys to an array
        const itineraryArray = Object.keys(data).map((key) => data[key]);
        setItinerary(itineraryArray);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItinerary();
  }, [lastUpdate]); // Add lastUpdate to the dependency array

  if (loading) return <Box marginLeft={10}>Loading...</Box>;
  if (error) return <Box>Error: {error}</Box>;

  return (
    <Box
      sx={{
        overflowY: "scroll",
        height: "100%",
        marginLeft: "70px",
        msOverflowStyle: "none" /* IE and Edge */,
        scrollbarWidth: "none" /* Firefox */,
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <h2
        style={{
          marginLeft: 0,
          marginBottom: "25px",
          fontFamily: '"Lexend", sans-serif',
          fontSize: "22px",
        }}
      >
        My Plans
      </h2>

      {itinerary.length === 0 ? (
        <Box>No Plan found</Box>
      ) : (
        itinerary.map((journey, index) => (
          <ItineraryCard
            key={journey.id} 
            itinerary={journey}
          
          />
        ))
      )}
    </Box>
  );
};

export default FetchItinerary;

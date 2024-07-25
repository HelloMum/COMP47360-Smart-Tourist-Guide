import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Avatar } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

interface PlanData {
  address: string;
  name: string;
  category: string;
}

interface Itinerary {
  endDate: string;
  startDate: string;
  planData: {
    [date: string]: PlanData[];
  };
}

interface Statistics {
  totalDaysSpent: number;
  favouriteCategory: string;
  totalActivities: number;
}

const Dashboard: React.FC = () => {
  const [expanded, setExpanded] = useState<boolean[]>([]);
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchItineraries = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/itinerary/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const parsedData = Object.values(data) as Itinerary[];
        setItineraries(parsedData);
        setExpanded(new Array(parsedData.length).fill(false));
      } catch (error) {
        console.error('Error fetching itineraries:', error);
      } finally {
        setLoading(false);
      }
      
    };

    const fetchStatistics = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/itinerary/statistics', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setStatistics(data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchItineraries();
    fetchStatistics();
  }, []);

  const handleToggle = (index: number) => {
    setExpanded(expanded.map((exp, i) => (i === index ? !exp : exp)));
  };


  return (
    <Box sx={{ p: 4, pt: 10, overflow: 'auto' }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ width: 100, height: 100 }} src="profile pic" />
            <Typography variant="body2">zack@tourwise.org</Typography>
          </Box>
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h6">My points</Typography>
            <Typography variant="h4">0</Typography>
            <Button variant="contained" sx={{ mt: 2 }}>CLAIM</Button>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Statistics</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ p: 2, border: '1px solid #FFA500', height: '100px' }}>
                  <Typography variant="body2">Total Activities:</Typography>
                  <Typography variant="h6">{statistics ? statistics.totalActivities : 'empty'}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 2, border: '1px solid #FFA500', height: '100px' }}>
                  <Typography variant="body2">Total Points:</Typography>
                  <Typography variant="h6">0</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 2, border: '1px solid #FFA500', height: '100px' }}>
                  <Typography variant="body2">Favorite category:</Typography>
                  <Typography variant="h6">{statistics ? statistics.favouriteCategory : 'empty'}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 2, border: '1px solid #FFA500', height: '100px' }}>
                <Typography variant="body2">Total days spent:</Typography>
                <Typography variant="h6">{statistics ? statistics.totalDaysSpent : 'empty'}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={1}></Grid>
        <Grid item xs={12} md={4}>
        <Typography variant="h6">My journeys</Typography>
          {loading ? (
            <Typography variant="body1">Loading...</Typography>
              ) : itineraries.length === 0 ? (
            <Typography variant="body1">Empty history</Typography>
              ) : (
            itineraries.map((itinerary, index) => (
              <Box
                key={index}
                sx={{ p: 2, border: '1px solid #FFA500', mb: 2, cursor: 'pointer' }}
                onClick={() => handleToggle(index)}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">
                    NYC {itinerary.startDate} - {itinerary.endDate}
                  </Typography>
                  {expanded[index] ? <ExpandLess /> : <ExpandMore />}
                </Box>
                {expanded[index] && (
                  <Box sx={{ mt: 2 }}>
                    {Object.entries(itinerary.planData).map(([date, plans]) =>
                      plans.map((plan, planIndex) => (
                        <Box key={planIndex} sx={{ mb: 2 }}>
                          <Typography variant="body2">{plan.name}</Typography>
                          <Typography variant="body2">{plan.address}</Typography>
                          <Typography variant="body2">{plan.category}</Typography>
                          </Box>
                      ))
                    )}
                  </Box>
                )}
              </Box>
            ))
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

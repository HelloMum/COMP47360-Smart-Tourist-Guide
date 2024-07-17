import React from 'react';
import { Box, Typography, Button, Grid, Avatar } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

const Dashboard: React.FC = () => {
  const [expanded, setExpanded] = React.useState<boolean[]>([true, false, false]);

  const handleToggle = (index: number) => {
    setExpanded(expanded.map((exp, i) => (i === index ? !exp : exp)));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ width: 100, height: 100 }} src="profile pic" />
            <Typography variant="h6">Zack</Typography>
            <Typography variant="body2">zack@tourwise.org</Typography>
          </Box>
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h6">My points</Typography>
            <Typography variant="h4">125</Typography>
            <Button variant="contained" sx={{ mt: 2 }}>CLAIM</Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h6">Statistics</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box sx={{ p: 2, border: '1px solid #FFA500', height: '100px' }}>
                <Typography variant="body2">Landmarks seen:</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ p: 2, border: '1px solid #FFA500', height: '100px' }}>
                <Typography variant="body2">Total Points:</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ p: 2, border: '1px solid #FFA500', height: '100px' }}>
                <Typography variant="body2">Most popular category:</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ p: 2, border: '1px solid #FFA500', height: '100px' }}>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">My journeys</Typography>
          {['NYC 04.07.24-05.07.24', 'NYC 04.07.24-05.07.24', 'NYC 04.07.24-05.07.24'].map((journey, index) => (
            <Box
              key={index}
              sx={{ p: 2, border: '1px solid #FFA500', mb: 2, cursor: 'pointer' }}
              onClick={() => handleToggle(index)}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{journey}</Typography>
                {expanded[index] ? <ExpandLess /> : <ExpandMore />}
              </Box>
              {expanded[index] && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">Central Park</Typography>
                  <Typography variant="body2">Empire State Building</Typography>
                  <Typography variant="body2">Landmark</Typography>
                  <Typography variant="body2">Lake Tahoe Dance Festival</Typography>
                </Box>
              )}
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

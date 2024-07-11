import React from 'react';
import { Box, Typography } from '@mui/material';

const BusynessProgressBar: React.FC<{ busyness: number }> = ({ busyness }) => {

  const getColor = (value: number) => {
    if (value <= 20) return 'linear-gradient(90deg, #00008B, #0000FF)'; 
    if (value <= 40) return 'linear-gradient(90deg, #0000FF, #00BFFF)'; 
    if (value <= 60) return 'linear-gradient(90deg, #00BFFF, #FFFF00)'; 
    if (value <= 80) return 'linear-gradient(90deg, #ffcf00, #FFA500)'; 
    return 'linear-gradient(90deg, #FFA500, #FF0000)'; 
  };

  const color = getColor(busyness);

  return (
    <Box display="flex" alignItems="center" width="100%">
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{busyness.toFixed(0)}</Typography>
      </Box>
      <Box flexGrow={1} mr={1} position="relative">
        <Box
          sx={{
            height: 6,
            width: '60%',
            backgroundColor: '#eee',
            borderRadius: 5,
            overflow: 'hidden', // Ensures that the inner bar respects the rounded corners
          }}
        >
          <Box
            sx={{
              height: 6,
              width: `${busyness}%`, // Adjusted width calculation
              background: color,
              borderRadius: 5,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default BusynessProgressBar;

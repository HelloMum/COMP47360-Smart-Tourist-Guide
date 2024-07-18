import React from 'react';
import { Box, Typography } from '@mui/material';
import { getColor } from './colorMappings';  

const BusynessProgressBar: React.FC<{ busyness: number }> = ({ busyness }) => {
  const color = getColor(busyness);

  return (
    <Box display="flex" alignItems="center" width="100%">
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary" sx={{fontWeight:'500'}}>{busyness.toFixed(0)}</Typography>
      </Box>
      <Box flexGrow={1} mr={1} position="relative">
        <Box
          sx={{
            height: 6,
            width: '60%',
            backgroundColor: '#f0f0f0',
            borderRadius: 5,
            overflow: 'hidden', 
          }}
        >
          <Box
            sx={{
              height: 6,
              width: `${busyness}%`, 
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

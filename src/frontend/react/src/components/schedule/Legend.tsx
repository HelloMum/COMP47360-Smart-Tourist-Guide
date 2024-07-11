import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { getColor } from './colorMappings'; 

const circleSize = 15; 
const fontSize = 11; 

const Legend: React.FC = () => {
  const colors = Array.from({ length: 10 }, (_, i) => getColor(i * 10 + 5));

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 70,
        left: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: '10px',
        borderRadius: '10px',
        color:'grey'
      }}
    >
      <Stack spacing={0.7} direction="column">
        {colors.map((color, index) => (
          <Box key={index} display="flex" alignItems="center">
            <Box sx={{ width: circleSize, height: circleSize, backgroundColor: color, borderRadius: '50%' }} />
            <Typography sx={{ marginLeft: 1, fontSize: fontSize }}>
              {index === 0 ? '≤ 10' : `${index * 10} - ${index * 10 + 10}`}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Legend;

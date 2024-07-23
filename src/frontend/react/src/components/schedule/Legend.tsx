import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { getColor } from './colorMappings'; 

const circleSize = 12; 
const fontSize = 11; 

const Legend: React.FC = () => {
  const colors = Array.from({ length: 10 }, (_, i) => getColor(i * 10 + 5));
  const leftColumnColors = colors.slice(0, 5);
  const rightColumnColors = colors.slice(5);

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom:{xs:95,sm:60,md:60},   
        left: 20,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        padding: '10px',
        borderRadius: '10px',
        color:'grey',
        width:{xs:160,sm: 180},
        border: '1px solid rgba(0, 0, 0, 0.15)'}}
            >
      <Grid container spacing={1}>
        <Grid item xs={6}>
          {leftColumnColors.map((color, index) => (
            <Box key={index} display="flex" alignItems="center" mb={0.5}>
              <Box 
                sx={{ 
                  width: circleSize, 
                  height: circleSize, 
                  backgroundColor: color, 
                  borderRadius: '50%', 
                  // border: '1px solid rgba(255, 255, 255, 0.2)' 
                }} 
              />
              <Typography sx={{ marginLeft: 1, fontSize: fontSize }}>
                {index === 0 ? '0- 10' : `${index * 10} - ${index * 10 + 10}`}
              </Typography>
            </Box>
          ))}
        </Grid>
        <Grid item xs={6}>
          {rightColumnColors.map((color, index) => (
            <Box key={index + 5} display="flex" alignItems="center" mb={0.5}>
              <Box 
                sx={{ 
                  width: circleSize, 
                  height: circleSize, 
                  backgroundColor: color, 
                  borderRadius: '50%', 
                  border: '1px solid rgba(255, 255, 255, 0.5)' 
                }} 
              />
              <Typography sx={{ marginLeft: 1, fontSize: fontSize }}>
                {`${(index + 5) * 10} - ${(index + 5) * 10 + 10}`}
              </Typography>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Legend;

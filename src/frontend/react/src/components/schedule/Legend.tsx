import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { getColor } from './colorMappings';

const circleSize = 12;
const fontSize = 11.5;

const Legend: React.FC = () => {
  const colors = [90, 70, 50, 30, 10].map((value) => getColor(value));
  const labels = [
    { range: '81-100', description: 'Very Busy' },
    { range: '61-80', description: 'Busy' },
    { range: '41-60', description: 'Moderate' },
    { range: '21-40', description: 'Light' },
    { range: '0-20', description: 'Very Light' }
  ];

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: { xs: 95, sm: 60, md: 60 },
        left: 20,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        padding: '10px',
        borderRadius: '10px',
        color: 'grey',
        width: { xs: 160, sm: 160 },
        border: '1px solid rgba(0, 0, 0, 0.15)',
      }}
    >
      <Grid container spacing='5px'>
        {colors.map((color, index) => (
          <Grid item xs={12} key={index}>
            <Box display="flex" alignItems="center" mb={0.0}>
              <Box
                sx={{
                  width: circleSize,
                  height: circleSize,
                  backgroundColor: color,
                  borderRadius: '50%',
                  // border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ marginLeft: 1, fontSize: fontSize, width: '45px' }}>
                  {labels[index].range}
                </Typography>
                <Typography sx={{ fontSize: fontSize }}>
                  {labels[index].description}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Legend;

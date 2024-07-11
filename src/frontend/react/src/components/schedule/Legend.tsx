import React from 'react';
import { Stack, Box, Typography } from '@mui/material';

const circleSize = 15; 
const fontSize = 11; 

const Legend: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 70,
        left: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        padding: '10px',
        borderRadius: '10px',
        color:'grey'
       
      }}
    >
      <Stack spacing={0.7} direction="column">
        <Box display="flex" alignItems="center">
          <Box sx={{ width: circleSize, height: circleSize, backgroundColor: '#c6403d', borderRadius: '50%' }} />
          <Typography sx={{ marginLeft: 1, fontSize: fontSize }}> &gt; 90</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box sx={{ width: circleSize, height: circleSize, backgroundColor: '#ce5246', borderRadius: '50%' }} />
          <Typography sx={{ marginLeft: 1, fontSize: fontSize }}>80 - 90</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box sx={{ width: circleSize, height: circleSize, backgroundColor: '#e98e6f', borderRadius: '50%' }} />
          <Typography sx={{ marginLeft: 1, fontSize: fontSize }}>70 - 80</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box sx={{ width: circleSize, height: circleSize, backgroundColor: '#f4a886', borderRadius: '50%' }} />
          <Typography sx={{ marginLeft: 1, fontSize: fontSize }}>60 - 70</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box sx={{ width: circleSize, height: circleSize, backgroundColor: '#fddecc', borderRadius: '50%' }} />
          <Typography sx={{ marginLeft: 1, fontSize: fontSize }}>50 - 60</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box sx={{ width: circleSize, height: circleSize, backgroundColor: '#ecf3f5', borderRadius: '50%' }} />
          <Typography sx={{ marginLeft: 1, fontSize: fontSize }}>40 - 50</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box sx={{ width: circleSize, height: circleSize, backgroundColor: '#add2e4', borderRadius: '50%' }} />
          <Typography sx={{ marginLeft: 1, fontSize: fontSize }}>30 - 40</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box sx={{ width: circleSize, height: circleSize, backgroundColor: '#4e9bc7', borderRadius: '50%' }} />
          <Typography sx={{ marginLeft: 1, fontSize: fontSize }}>20 - 30</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box sx={{ width: circleSize, height: circleSize, backgroundColor: '#276cad', borderRadius: '50%' }} />
          <Typography sx={{ marginLeft: 1, fontSize: fontSize }}>10 - 20</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box sx={{ width: circleSize, height: circleSize, backgroundColor: '#185394', borderRadius: '50%' }} />
          <Typography sx={{ marginLeft: 1, fontSize: fontSize }}> &le; 10</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default Legend;

import React from 'react';
import { Stack, Box, Typography } from '@mui/material';

const circleSize = 15; 
const fontSize = 12; 

const Legend: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 80,
        left: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        padding: '10px',
        borderRadius: '10px',
        // boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
      }}
    >
      <Stack direction="row" spacing={2}>
        <Stack spacing={1}>
          <Box display="flex" alignItems="center">
            <Box sx={{ width: circleSize, height: circleSize, backgroundColor: '#c6403d', borderRadius: '50%' }} />
            <Typography sx={{ marginLeft: 1, fontSize: fontSize }}>n &gt; 9</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box sx={{ width: circleSize, height: circleSize, backgroundColor: '#ce5246', borderRadius: '50%' }} />
            <Typography sx={{ marginLeft: 1, fontSize: fontSize }}>8 &lt; n &le; 9</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box sx={{ width: circleSize, height: circleSize, backgroundColor: '#e98e6f', borderRadius: '50%' }} />
            <Typography sx={{ marginLeft: 1, fontSize: fontSize }}>7 &lt; n &le; 8</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box sx={{ width: circleSize, height: circleSize, backgroundColor: '#f4a886', borderRadius: '50%' }} />
            <Typography sx={{ marginLeft: 1, fontSize: fontSize }}>6 &lt; n &le; 7</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box sx={{ width: circleSize, height: circleSize, backgroundColor: '#fddecc', borderRadius: '50%' }} />
            <Typography sx={{ marginLeft: 1, fontSize: fontSize }}>5 &lt; n &le; 6</Typography>
          </Box>
        </Stack>
        <Stack spacing={1}>
          <Box display="flex" alignItems="center">
            <Box sx={{ width: circleSize, height: circleSize, backgroundColor: '#ecf3f5', borderRadius: '50%' }} />
            <Typography sx={{ marginLeft: 1, fontSize: fontSize }}>4 &lt; n &le; 5</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box sx={{ width: circleSize, height: circleSize, backgroundColor: '#add2e4', borderRadius: '50%' }} />
            <Typography sx={{ marginLeft: 1, fontSize: fontSize }}>3 &lt; n &le; 4</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box sx={{ width: circleSize, height: circleSize, backgroundColor: '#4e9bc7', borderRadius: '50%' }} />
            <Typography sx={{ marginLeft: 1, fontSize: fontSize }}>2 &lt; n &le; 3</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box sx={{ width: circleSize, height: circleSize, backgroundColor: '#276cad', borderRadius: '50%' }} />
            <Typography sx={{ marginLeft: 1, fontSize: fontSize }}>1 &lt; n &le; 2</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box sx={{ width: circleSize, height: circleSize, backgroundColor: '#185394', borderRadius: '50%' }} />
            <Typography sx={{ marginLeft: 1, fontSize: fontSize }}>n &le; 1</Typography>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Legend;

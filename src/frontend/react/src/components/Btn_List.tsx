import React from 'react';
import { Box } from '@mui/material';

const Btn_List = ({ onClick }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '100px',
        left: '44vw',
        transform: 'translate(-50%, -50%)',
        zIndex: 10000,
        boxShadow: 4, 
        borderRadius: '50px',
        cursor: 'pointer' // Add cursor pointer for better UX
      }}
      onClick={onClick} // Handle button click
    >
      <img src="images/note4.png" width="50px" height="50px" alt="list icon" />
    </Box>
  );
};

export default Btn_List;

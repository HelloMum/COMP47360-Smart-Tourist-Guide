import React from 'react';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import close icon

const List = ({ onClose }) => {
  return (
    <Box
      sx={{
        width: '19vw',
        height: '55vh',
        marginTop: '70px',
        marginLeft: '10px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: 3,
        zIndex: 1000,
        position: 'relative' // Ensure close button is positioned relative to this box
      }}
    >
      <IconButton
        sx={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          zIndex: 1001,
        }}
        onClick={onClose} // Handle close button click
      >
        <CloseIcon />
      </IconButton>
      {/* Add your list content here */}
    </Box>
  );
};

export default List;

import React from 'react';
import Box from '@mui/material/Box';

const Tag = () => {
  return (
    <Box sx={{
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: {
        xs: '0px 3px', 
        sm: '0px 9px'  
      },
      borderRadius: '4px',
      fontSize: '12px',
      display: 'inline-block',
      boxSizing: 'border-box',
      marginRight: {
        xs: '4px',
        sm: '6px'
      }, 
    }}>
      free
    </Box>
  );
}

export default Tag;

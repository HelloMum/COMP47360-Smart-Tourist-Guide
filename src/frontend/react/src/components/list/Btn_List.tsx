import React from 'react';
import { Box } from '@mui/material';

interface BtnListProps {
  onClick: () => void;
}

const Btn_List: React.FC<BtnListProps> = ({ onClick }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '100px',
        right:'7px',
        // left: '44vw',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        boxShadow: 4, 
        borderRadius: '50px',
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
      <img src="images/note3.png" width="50px" height="50px" alt="list icon" />
    </Box>
  );
};

export default Btn_List;

import React from 'react';
import { Box } from '@mui/material';
import { KeyboardArrowRightRounded } from '@mui/icons-material';

interface BtnCloseListProps {
  onClose: () => void;
}

const Btn_Close_List: React.FC<BtnCloseListProps> = ({ onClose }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '80px',
        right: '19vw',
        zIndex: 10,
        boxShadow: 2,
        borderRadius: '6px',
        cursor: 'pointer',
        backgroundColor: '#fff',
        paddingTop: '5px',
        paddingBottom: '5px',
        paddingX: '6px',
        display: 'flex',
        alignItems: 'center'
      }}
      onClick={onClose}
    >
      <KeyboardArrowRightRounded />
    </Box>
  );
};

export default Btn_Close_List;

import React from 'react';
import { Button } from '@mui/material';
import { FormatListBulletedRounded } from '@mui/icons-material';

interface BtnListProps {
  onClick: () => void;
}

const Btn_List: React.FC<BtnListProps> = ({ onClick }) => {
  return (
    <Button
      sx={{
        position: 'absolute',
        top: '100px',
        right: '7px',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        borderRadius: '20px',
        cursor: 'pointer',
        backgroundColor: '#ffc147',
        width: '90px',
        paddingX: '10px',
        color: 'white',
        '&:hover': {
          boxShadow: '1',  
        },
        '&:active': {
          boxShadow: 'none',  
        },
        boxShadow: '1',  
      }}
      variant="contained"
      startIcon={<FormatListBulletedRounded />}  
      onClick={onClick}
    >
      List
    </Button>
  );
};

export default Btn_List;

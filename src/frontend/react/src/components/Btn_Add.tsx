import React, { useState } from 'react';
import { Button } from '@mui/material';
import { CheckCircleOutline, CheckRounded } from '@mui/icons-material';

interface Btn_AddProps {
  onClick: () => void;
}

const Btn_Add: React.FC<Btn_AddProps> = ({ onClick }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    onClick();
    setIsAdded(true);
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          borderRadius: '25px',
          padding: '1px 1px',
          fontSize: '0.8rem',
          textTransform: 'none',
          boxShadow: 'none',
          backgroundColor:  'primary.main',
          color: 'white',
          '&:hover': {
            backgroundColor:  'primary.dark',
            boxShadow: 'none'
          }
        }}
        onClick={handleClick}
      >
        {isAdded ? <CheckRounded /> : 'Add'}
      </Button>
    </div>
  );
};

export default Btn_Add;

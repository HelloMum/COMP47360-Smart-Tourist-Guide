import React, { useState } from 'react';
import { Button } from '@mui/material';
import { CheckRounded, CloseRounded } from '@mui/icons-material';

interface Btn_AddProps {
  onClick: () => void;
  isAdded: boolean;
}

const Btn_Add: React.FC<Btn_AddProps> = ({ onClick, isAdded }) => {
  const [hover, setHover] = useState(false);

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
          backgroundColor: isAdded ? 'lightgrey' : 'primary.main',
          color: 'white',
          '&:hover': {
            boxShadow: 'none',
            // backgroundColor: isAdded?'#f10124' :'primary.main',
          },
        }}
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {isAdded ? (hover ? <CloseRounded /> : <CheckRounded />) : 'Add'}
      </Button>
    </div>
  );
};

export default Btn_Add;

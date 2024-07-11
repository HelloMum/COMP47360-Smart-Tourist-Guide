import React, { useState } from 'react';
import { PublicRounded } from '@mui/icons-material';
import { Box } from '@mui/material';

interface BtnEarthProps {
  url: string;
}

const Btn_Earth: React.FC<BtnEarthProps> = ({ url }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleMouseDown = () => setIsClicked(true);
  const handleMouseUp = () => setIsClicked(false);

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: isHovered || isClicked ? 'orange' : 'inherit',
        '&:hover': {
          color: 'orange',
        },
        '&:active': {
          color: 'inherit',
        },
      }}
      onClick={() => window.open(url, '_blank')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <PublicRounded sx={{ fontSize: 'large', marginRight: 1 }} />
    </Box>
  );
};

export default Btn_Earth;

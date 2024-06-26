import React, { useState } from 'react';
import { Card, CardMedia, Typography, IconButton, Box, Stack } from '@mui/material';
import theme from '../theme';
import { ExpandMoreRounded } from '@mui/icons-material';
import Btn_Add from './Btn_Add';
import Btn_Like from './Btn_Like';

interface SpotCardProps {
  image1: string;  
  image3: string; 
  title: string;
  address: string;
  onExpand: () => void;
}

const SpotCard: React.FC<SpotCardProps> = ({ image1, image3, title, address, onExpand }) => {
  const [currentImage, setCurrentImage] = useState(image1);
  const [imageStyle, setImageStyle] = useState({
    transition: 'none',  
    transform: 'scale(1)' 
  });

  // hover
  const handleMouseEnter = () => {
    setCurrentImage(image3);
    setImageStyle({
      transition: 'transform 7s ease',  
      transform: 'scale(1.4)' 
    });
  };

  // mouse leave
  const handleMouseLeave = () => {
    setCurrentImage(image1);
    setImageStyle({
      transition: 'none',  
      transform: 'scale(1)'  
    });
  };

  return (
    <Card sx={{
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 3px rgba(0, 0, 0, 0.15)',
      width: "47%",
      marginBottom: 2
    }}>
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="170"
          image={currentImage}
          alt={title}
          sx={{
            borderRadius: '0px',
            boxShadow: 0,
            ...imageStyle
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <Btn_Like/>
      </Box>
      <Stack sx={{ paddingTop: '8px', paddingLeft: '5px' }}>
        <Typography sx={{ ...theme.typography.cardTitle }} component="div">
          {title}
        </Typography>

        <Typography sx={{ ...theme.typography.cardDesc }}>
          {address}
        </Typography>
        <Stack direction='row' justifyContent="space-between" sx={{ width: '95%', paddingY: 1.5 }}>
          <Btn_Add/>
          <IconButton onClick={onExpand}>
            <ExpandMoreRounded />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
};

export default SpotCard;

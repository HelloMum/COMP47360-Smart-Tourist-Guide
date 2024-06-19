import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const SpotCard = () => {
  const image = "images/spots/test.png"; 
  const title = 'Empire State Building';
  const location = 'New York, NY 10004';

  return (
    <Card sx={{ borderRadius: '7px', overflow: 'hidden', boxShadow:0 ,width: "47%" }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="170"
          image={image}
          alt={title}
          sx={{ borderRadius: '15px',boxShadow:0 }}
        />


        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '50%',
          }}
        >
          <IconButton>
            <FavoriteBorderIcon />
          </IconButton>
        </Box>
         </Box>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {location}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SpotCard;

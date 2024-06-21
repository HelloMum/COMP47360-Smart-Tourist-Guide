import React from 'react';
import { Card, CardMedia, Typography, IconButton, Box, Stack, Button } from '@mui/material';
import theme from '../theme';
import { AddCircleRounded, ExpandMoreRounded, FavoriteBorderRounded, MoreHorizRounded } from '@mui/icons-material';
import Btn_Add from './Btn_Add';
import Btn_Like from './Btn_Like';

// Define props type
interface SpotCardProps {
  image: string;
  title: string;
  address: string;
}

const SpotCard: React.FC<SpotCardProps> = ({ image, title, address }) => {
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
          image={image}
          alt={title}
          sx={{
            borderRadius: '0px',
            boxShadow: 0,
            transition: 'transform 7s ease',
            '&:hover': {
              transform: 'scale(1.4)'
            }
          }}
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
          <ExpandMoreRounded />
        </Stack>
      </Stack>
    </Card>
  );
};

export default SpotCard;

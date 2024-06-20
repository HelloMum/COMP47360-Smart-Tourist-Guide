import React from 'react';
import { Card, CardMedia, Typography, IconButton, Box, Stack, Button } from '@mui/material';
import theme from '../theme';
import { AddCircleRounded, FavoriteBorderRounded, MoreHorizRounded } from '@mui/icons-material';

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

        <Box sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'rgba(255, 255, 255, 0.0)', borderRadius: '50%' }}>
          <IconButton>
            <FavoriteBorderRounded style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
          </IconButton>
        </Box>
      </Box>
      <Stack sx={{ paddingTop: '8px', paddingLeft: '5px' }}>
        <Typography sx={{ ...theme.typography.cardTitle }} component="div">
          {title}
        </Typography>

        <Typography sx={{ ...theme.typography.cardDesc }}>
          {address}
        </Typography>
        <Stack direction='row' justifyContent="space-between" sx={{ width: '95%', paddingBottom: 2 }}>
          <MoreHorizRounded />

          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: '25px',
              padding: '2px 2px',
              fontSize: '0.8rem',
              textTransform: 'none',
              boxShadow: 'none',
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
                boxShadow: 'none'
              }
            }}
          >
            add
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default SpotCard;

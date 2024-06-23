import React from 'react';
import { Card, Box, CardMedia, Typography, Stack } from '@mui/material';
import { ExpandMoreRounded } from '@mui/icons-material';
import theme from '../theme';
import Btn_Like from './Btn_Like';
import Btn_Add from './Btn_Add';
import Tag_Category from './Tag_Category';
import Tag_IsFree from './Tag_IsFree';

const EventCard = ({ event }) => {
  return (
    <Card sx={{ borderRadius: '7px', overflow: 'hidden', boxShadow: '0 1px 5px rgba(0, 0, 0, 0.15)', width: "100%", paddingX: 2, paddingY: 2, marginBottom: 3 }}>
      <Stack direction="row">
        <Box sx={{ position: 'relative', width: '130px', height: '100px' }}>
          <CardMedia
            component="img"
            height="100"
            image={event.image_url}
            alt={event.name}
            sx={{ borderRadius: '5px', boxShadow: 0, marginTop: '10px', objectFit: 'cover', width: '130px', height: '120px' }}
          />
          <Btn_Like />
        </Box>
        <Box sx={{ marginLeft: '25px', flexGrow: 1 }}>
          <Typography sx={{ ...theme.typography.cardTitle }} component="div">
            {event.name}
          </Typography>
          <Stack direction='row' spacing={1}>
            <Tag_Category category={event.category} />
            
          {event.is_free && <Tag_IsFree isFree={event.is_free} />}
          </Stack>
          <Box display="flex" alignItems="center">
            <Typography variant="body2" color="text.secondary" style={{ marginRight: '10px' }}>
              Date {event.time_start}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Time {event.time}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Address: {event.address}
          </Typography>
          <Stack direction='row' justifyContent="space-between" sx={{ width: '95%', paddingY: 1 }}>
            <Btn_Add />
            <ExpandMoreRounded />
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
}

export default EventCard;

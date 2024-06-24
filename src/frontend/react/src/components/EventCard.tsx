import React from 'react';
import { Card, Box, CardMedia, Typography, Stack } from '@mui/material';
import { ExpandMoreRounded } from '@mui/icons-material';
import theme from '../theme';
import Btn_Like from './Btn_Like';
import Btn_Add from './Btn_Add';
import Tag_Category from './Tag_Category';
import Tag_IsFree from './Tag_IsFree';

const formatDateTime = (dateTime) => {
  if (!dateTime) {
    return { date: 'Invalid Date', time: 'Invalid Time' };
  }
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    return { date: 'Invalid Date', time: 'Invalid Time' };
  }
  const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
  const formattedTime = date.toTimeString().split(' ')[0].slice(0, 5); // HH:MM
  return { date: formattedDate, time: formattedTime };
};

const EventCard = ({ event }) => {
  const { date, time } = formatDateTime(event.time_start);

  return (
    <Card sx={{ borderRadius: '7px', overflow: 'hidden', boxShadow: '0 1px 5px rgba(0, 0, 0, 0.15)', width: "99%", paddingX: 2, paddingY: 2, marginBottom: 3, marginLeft: '3px', marginTop: '3px' }}>
      <Stack direction="row">
        <Box sx={{ position: 'relative', width: '130px', height: '100px' }}>
          <CardMedia
            component="img"
            height="100"
            image={event.image_url}
            alt={event.name}
            sx={{ borderRadius: '2px', boxShadow: 1, marginTop: '10px', objectFit: 'cover', width: '130px', height: '120px' }}
          />
          <Btn_Like />
        </Box>
        <Box sx={{ marginLeft: '25px', flexGrow: 1 }}>
          <Typography
            sx={{
              ...theme.typography.cardTitle,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '410px',
              display: 'inline-block', 
            }}
            component="div"
            title={event.name} 
          >
            {event.name}
          </Typography>
          <Stack direction='row' spacing={1}>
            <Tag_Category category={event.category} />
            {event.is_free && <Tag_IsFree isFree={event.is_free} />}
          </Stack>
          <Box display="flex" alignItems="center">
            <Typography variant="body2" color="text.secondary" style={{ marginRight: '10px' }}>
              Date: {date}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Time: {time}
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

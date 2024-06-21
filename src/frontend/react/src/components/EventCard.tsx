import React from 'react';
import { Card, Box, CardMedia, Typography, Stack } from '@mui/material';
import { ExpandMoreRounded } from '@mui/icons-material';
import theme from '../theme';
import Btn_Like from './Btn_Like';
import Tag from './Tag';
import Btn_Add from './Btn_Add';

const EventCard = ({ event }) => {
  return (
    <Card sx={{ borderRadius: '7px', overflow: 'hidden', boxShadow: '0 1px 5px rgba(0, 0, 0, 0.15)', width: "100%", paddingX: 2, paddingY: 2, marginBottom: 3 }}>
      <Stack direction="row">
        <Box sx={{ position: 'relative' ,width: '130px', height: '100px'}}>
          <CardMedia
            component="img"
            height="110"
            image={event.image}            alt={event.title}
            sx={{ borderRadius: '5px', boxShadow: 0 ,marginTop:'10px'}}
          />
          <Btn_Like />
        </Box>



        <Box  sx={{ marginLeft: '25px', flexGrow: 1 }}>
          <Typography sx={{ ...theme.typography.cardTitle }} component="div">
            {event.title}
          </Typography>
          <Stack direction='row' spacing={1}>
            <Tag isFree={event.isFree} category={undefined} />
            <Tag category={event.category} isFree={undefined} />
          </Stack>
          <Box display="flex" alignItems="center">
            <Typography variant="body2" color="text.secondary" style={{ marginRight: '10px' }}>
              Date {event.date}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Time {event.time}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Address: {event.location}
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

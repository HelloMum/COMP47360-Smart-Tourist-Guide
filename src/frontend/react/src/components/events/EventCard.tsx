import React, { useState } from 'react';
import { Card, Box, CardMedia, Typography, Stack } from '@mui/material';
import { AccessTimeRounded, DateRangeRounded, ExpandLessRounded, ExpandMoreRounded, LocationOnRounded, PublicRounded } from '@mui/icons-material';
import theme from '../../theme';  
import Btn_Add from '../Btn_Add';
import Tag_Category from '../Tag_Category';
import Tag_IsFree from '../Tag_IsFree';
import { useTheme } from '@mui/material/styles';


const formatDateTime = (dateTime) => {
  if (!dateTime) {
    return { date: 'Invalid Date', time: 'Invalid Time' };
  }
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    return { date: 'Invalid Date', time: 'Invalid Time' };
  }
  const formattedDate = date.toISOString().split('T')[0];  // YYYY-MM-DD
  const formattedTime = date.toTimeString().split(' ')[0].slice(0, 5);  // HH:MM
  return { date: formattedDate, time: formattedTime };
};

const EventCard = ({ event, onMouseEnter, onMouseLeave }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { date, time } = formatDateTime(event.time_start);
  const imageUrl = event.image_url || "images/events/default.jpg";
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <Card
      sx={{
        borderRadius: '7px',
        overflow: 'hidden',
        boxShadow: '0 1px 5px rgba(0, 0, 0, 0.15)',
        width: "98%",
        paddingX: '20px',
        paddingY: '12px',
        marginBottom: 3,
        marginLeft: '3px',
        marginTop: '3px',
        height: isExpanded ? 'auto' : '170px',
        transition: 'box-shadow 0.3s',
        '&:hover': {
          boxShadow: '0 3px 10px rgba(0, 0, 0, 0.3)' 
        }
      }}
      onMouseEnter={() => { onMouseEnter(); }}  
      onMouseLeave={() => { onMouseLeave(); }}  
    >
      <Stack direction="row">
        <Box sx={{ position: 'relative', width: '180px', height: isExpanded ? '190px' : '128px', boxShadow: 1, borderRadius: '4px', marginTop: '10px' }}>
          <CardMedia
            component="img"
            height="100"
            image={imageUrl}
            alt={event.name}
            sx={{ objectFit: 'cover', borderRadius: '4px', width: '180px', height: isExpanded ? '190px' : '128px' }}
          />
        </Box>

        <Box sx={{ marginLeft: '30px', flexGrow: 1 }}>
          <Typography
            sx={{
              ...theme.typography.cardTitle,
              whiteSpace: isExpanded ? 'normal' : 'nowrap',
              overflow: 'hidden',
              textOverflow: isExpanded ? 'clip' : 'ellipsis',
              maxWidth: '350px',
              display: 'inline-block',
            }}
            component="div"
            title={event.name}
          >
            {event.name}
          </Typography>

          <Stack direction='row' spacing={1}>
            <Tag_Category category={event.combined_category} />
            {event.is_free && <Tag_IsFree isFree={event.is_free} />}
            <PublicRounded sx={{ fontSize: 'large', marginRight: 1, cursor: 'pointer' }} onClick={() => window.open(event.event_site_url, '_blank')} />
          </Stack>

          <Stack gap={'4px'} marginTop={'2px'}>
            <Box display="flex" alignItems="center" marginTop={1}>
              <DateRangeRounded sx={{ fontSize: 'large', marginRight: 1 }} />
              <Typography variant="body2" color="text.secondary" style={{ marginRight: '50px' }}>
                {date}
              </Typography>
              <AccessTimeRounded sx={{ fontSize: 'large', marginRight: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {time}
              </Typography>
            </Box>

            {event.address && (
              <Box display="flex" alignItems="center">
                <LocationOnRounded sx={{ fontSize: 'large', marginRight: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  {event.address}
                </Typography>
              </Box>
            )}

            {isExpanded && (
              <Typography variant="body2" color="text.secondary" sx={{ ...theme.typography.smallText, marginLeft: '3px' }}>
                {event.description}
              </Typography>
            )}
          </Stack>

          <Stack direction='row' justifyContent="space-between" sx={{ width: '95%', paddingY: 1 }}>
            <Btn_Add />
            {!isExpanded && <ExpandMoreRounded onClick={toggleExpand} />}
            {isExpanded && <ExpandLessRounded onClick={toggleExpand} />}
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
};

export default EventCard;

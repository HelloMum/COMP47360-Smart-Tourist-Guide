import React, { useState, useContext } from 'react';
import { CardMedia, Typography, IconButton, Box, Stack } from '@mui/material';
import { AccessTimeRounded, CloseRounded, DateRangeRounded, ExpandLessRounded, ExpandMoreRounded, LocationOnRounded, PublicRounded } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import Btn_Add from '../Btn_Add';
import Tag_Category from '../Tag_Category';
import Tag_IsFree from '../Tag_IsFree';
import { ListContext } from '../../contexts/ListContext';
import Btn_Earth from '../Btn_Earth';

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

const EventCard_PopUp = ({ event, onClose }) => {
  const theme = useTheme();
  const { date, time } = formatDateTime(event.time_start);
  const imageUrl = event.image_url || "images/events/default.jpg";
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const { addItemWithDateCheck, isItemInList } = useContext(ListContext);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleAdd = () => {
    const eventData = { id: event.id, title: event.name, image: imageUrl };
    addItemWithDateCheck(eventData, () => setAlertOpen(true), 'EventCard_PopUp');
  };

  const isAdded = isItemInList(event.name);

  return (
    <Stack direction="row" 
    sx={{
    width:{xs:'310px',sm:'450px'}

    }}>


      {/*--------------------- Close Button ---------------*/}
      <Box position="absolute" top={0} right={0} zIndex="tooltip">
        <IconButton onClick={onClose} sx={{ fontSize: 'small' }}>
          <CloseRounded />
        </IconButton>
      </Box>

      {/*------------------   picture  -------------------- */}
      <Box sx={{ position: 'relative', 
        width: {xs:'80px',sm:'140px'}, 
        height: isExpanded ? {xs:'140px',sm:'190px'} : {xs:'120px',sm:'128px'}, 
        boxShadow: 1, 
        borderRadius: '2px', 
        marginTop: '5px' }}>
        <CardMedia
          component="img"
          height="100"
          image={imageUrl}
          alt={event.name}
          sx={{ objectFit: 'cover', borderRadius: '2px', 
            width: {xs:'80px',sm:'140px'}, 
            height: isExpanded ? {xs:'140px',sm:'190px'} : {xs:'120px',sm:'128px'}, 
          
          }}
        />
        {/* <Btn_Like /> */}
      </Box>

      {/*------------------   title  -------------------- */}
      <Box sx={{ 
        marginLeft: {xs:'10px',sm:'20px'}, 
        flexGrow: 1 }}>
        <Typography
          sx={{
            ...theme.typography.cardTitle,
            whiteSpace: isExpanded ? 'normal' : 'nowrap',
            overflow: 'hidden',
            textOverflow: isExpanded ? 'clip' : 'ellipsis',
            maxWidth: {xs:'180px',sm:'250px'},
            display: 'inline-block',
            fontWeight: 400,
            fontSize: {xs:'16px',sm:'16px'},
          }}
          component="div"
          title={event.name}
        >
          {event.name}
        </Typography>

        {/*------------------ category & isFree  -------------------- */}
        <Stack direction='row' spacing={1}>
          <Tag_Category category={event.combined_category} />
          {event.is_free && <Tag_IsFree />}


          <Btn_Earth url={event.event_site_url} />


        </Stack>

        {/*------------------ date & time & address-------------------- */}
        <Stack gap={'4px'} marginTop={'2px'}>
          {/* date & time */}
          <Box display="flex" alignItems="center" marginTop={1}>
            <DateRangeRounded sx={{ fontSize: 'large', marginRight: 1 }} />
            <Typography variant="body2" color="text.secondary"  
            sx={{ 
              fontSize:{xs:'12px',sm:'14px'},
              marginRight: {xs:'35px',sm:'50px'} }}
              
              >
      
              {date}
            </Typography>
            <AccessTimeRounded sx={{ fontSize: 'large', marginRight: 1 }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontSize:{xs:'12px',sm:'14px'} }}>
              {time}
            </Typography>
          </Box>

          {/* address */}
          <Box display="flex" alignItems="center">
            <LocationOnRounded sx={{ fontSize: 'large', marginRight: 1 }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontSize:{xs:'12px',sm:'14px'} }}>
              {event.address}
            </Typography>
          </Box>

          {isExpanded && (
            <Typography variant="body2" color="text.secondary" sx={{ marginLeft: '3px', 
              width: {xs:'200px',sm:'300px'},
            fontSize:{xs:'12px',sm:'14px'} }} >
              {event.description}
            </Typography>
          )}
        </Stack>

        <Stack direction='row' justifyContent="space-between" sx={{ width: '95%', paddingY: 1 }}>
          <Btn_Add onClick={handleAdd} isAdded={isAdded} />
          {isExpanded ? <ExpandLessRounded onClick={toggleExpand} /> : <ExpandMoreRounded onClick={toggleExpand} />}
        </Stack>
      </Box>
    </Stack>
  );
}

export default EventCard_PopUp;

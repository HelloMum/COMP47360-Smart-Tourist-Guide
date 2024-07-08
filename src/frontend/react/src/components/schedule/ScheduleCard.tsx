import React, { useState } from 'react';
import { CardMedia, Typography, Box, IconButton, Paper, Divider, Stack, Rating } from '@mui/material';
import { LocationOnRounded, PhoneEnabledRounded, PublicRounded, ExpandLessRounded, ExpandMoreRounded } from '@mui/icons-material';
import moment from 'moment';
import Tag_IsFree from '../Tag_IsFree';
import Tag_Category from '../Tag_Category';

interface ScheduleCardProps {
  id: string | number;
  name: string;
  startTime: string;
  endTime: string;
  latitude: number;
  longitude: number;
  busyness: number;
  category: string;
  address: string | null;
  website: string | null;
  description: string;
  rating: number;
  attraction_phone_number: string | null;
  international_phone_number: string | null;
  event_image: string | null;
  event: boolean;
  free: boolean;
  userRatings_total: number;
  index: number; 
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  id,
  name,
  startTime,
  endTime,
  latitude,
  longitude,
  busyness,
  category,
  address,
  website,
  description,
  rating,
  attraction_phone_number,
  international_phone_number,
  event_image,
  event,
  free,
  userRatings_total,
  index 
}) => {
  const formattedStartTime = moment(startTime).format('hh:mm A'); 
  const formattedEndTime = moment(endTime).format('hh:mm A');    

  const defaultImage = `/images/spots_small/${id}_1.webp`;
  const secondImage = `/images/spots_small/${id}_2.webp`;
  const imageSrc = event ? event_image : defaultImage;

  const [currentImage, setCurrentImage] = useState(imageSrc);
  const [imageStyle, setImageStyle] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => {
    if (event) {
      setImageStyle({
        transition: 'transform 7s ease',
        transform: 'scale(1.4)',
      });
    } else {
      setCurrentImage(secondImage);
      setImageStyle({
        transition: 'transform 7s ease',
        transform: 'scale(1.4)',
      });
    }
  };

  const handleMouseLeave = () => {
    if (event) {
      setImageStyle({
        transition: 'none',
        transform: 'scale(1)',
      });
    } else {
      setCurrentImage(defaultImage);
      setImageStyle({
        transition: 'none',
        transform: 'scale(1)',
      });
    }
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <Box sx={{ marginBottom: 3, display: 'flex', alignItems: 'flex-start', position: 'relative' }}>


      <Box sx={{ minWidth: '40px', textAlign: 'center', marginRight: '0vw', position: 'relative' }}>

        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: '#fdddb5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          
            zIndex: 1,
            position: 'relative',
          }}
        >
          <Typography variant="h6" style={{ fontWeight: 'normal',   fontFamily:'Lexend',color:'#d4831f' }}>{index}</Typography>
        
        </Box>


      </Box>

      {/* -----------   time  ------------------- */}
      <Stack direction='column'   gap={1}   sx={{ minWidth: '5vw', textAlign: 'right', marginRight: 2 }}>
        <Typography variant="h6" style={{ fontWeight: 'normal',   fontFamily:'Lexend',color:'#707070',fontSize:'1.1rem' }}>{formattedStartTime}</Typography>
        
        <Typography variant="h6" style={{ fontWeight: 'normal',   fontFamily:'Lexend',color:'#aaa',fontSize:'0.9rem' }}>{formattedEndTime}</Typography>
      </Stack>
      <Paper variant="outlined" sx={{ 
        borderRadius: '8px', 
        overflow: 'hidden', 
        padding: 2,
        position: 'relative',
        display: 'flex',
        // boxShadow: '0 0px 1px rgba(0, 0, 0, 0.00)',
        width: '100%'
      }}>
        <Box
          sx={{ 
            height: 110,
            width: 120,
            overflow: 'hidden',
            position: 'relative',
            borderRadius: '2px',
            marginRight: 2,
            boxShadow: '0 2px 3px rgba(0, 0, 0, 0.15)'
          }}
        >
          {currentImage && (
            <CardMedia
              component="img"
              image={currentImage}
              alt={name}
              style={{ 
                height: '100%',
                width: '100%', 
                objectFit: 'cover', 
                position: 'absolute',
                top: 0,
                left: 0,
                ...imageStyle 
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          )}
        </Box>
        <Box flex={2} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 400 }}>{name}</Typography>

          <Box display="flex" alignItems="center" marginBottom="8px" gap={1}>
            <Tag_IsFree isFree={free} />
            <Tag_Category category={category} />
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer">
                <PublicRounded sx={{ fontSize: 'large', color: '#333' }} />
              </a>
            )}
          </Box>

          <Stack direction='row'>

          <Typography variant="body1" color="text.secondary">
            Area Busyness: {busyness.toFixed(0)}  
           

          </Typography> 
          
          <Rating
      name="read-only"
      value={busyness}
      readOnly
      icon={
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            backgroundColor: '#fdddb5',
            margin:'1px'
            // border: '2px solid #d4831f',
          }}
        />
      }
      emptyIcon={
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            border: '2px solid #d4831f',
          }}
        />
      }
    />

</Stack>
          {isExpanded && (
            <Box marginTop={0}>
           
              {address && (
                <Box display="flex" alignItems="center" marginTop="8px">
                  <LocationOnRounded sx={{ fontSize: 'large', marginRight: '8px' }} />
                  <Typography variant="body2" color="text.secondary">{address}</Typography>
                </Box>
              )}
              {(attraction_phone_number || international_phone_number) && (
                <Box display="flex" alignItems="center" marginTop="8px">
                  <PhoneEnabledRounded sx={{ fontSize: 'large', marginRight: '8px' }} />
                  <Typography variant="body2" color="text.secondary">
                    local: {attraction_phone_number || 'No local phone provided'} , international: 
                    {international_phone_number || 'No international phone provided'}
                  </Typography>
           
                </Box>
                
              )}
                 <Typography variant="body2" style={{marginTop: '8px'}}>
                {description}
              </Typography>
            </Box>
            
          )}
        </Box>
        <Box position="absolute" bottom={4} right={8}>
          <IconButton onClick={toggleExpand}>
            {isExpanded ? <ExpandLessRounded /> : <ExpandMoreRounded />}
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default ScheduleCard;

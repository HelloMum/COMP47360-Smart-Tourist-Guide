import React, { useState } from 'react';
import { CardMedia, Typography, Box, IconButton, Paper, Stack, useTheme } from '@mui/material';
import { LocationOnRounded, PhoneEnabledRounded, PublicRounded, ExpandLessRounded, ExpandMoreRounded } from '@mui/icons-material';
import moment from 'moment';
import Tag_IsFree from '../Tag_IsFree';
import Tag_Category from '../Tag_Category';
import BusynessProgressBar from './BusynessProgressBar';
import Btn_Earth from '../Btn_Earth';

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
  onStartTimeClick: (startTime: string) => void;
  highlightedStartTime: string; 
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
  index,
  onStartTimeClick,
  highlightedStartTime, 
}) => {
  const formattedStartTime = moment(startTime).format('hh:mm A');
  const formattedEndTime = moment(endTime).format('hh:mm A');

  const defaultImage = `/images/spots_small/${id}_1.webp`;
  const secondImage = `/images/spots_small/${id}_2.webp`;
  const imageSrc = event ? event_image : defaultImage;

  const [currentImage, setCurrentImage] = useState(imageSrc);
  const [imageStyle, setImageStyle] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false); 

  const handleMouseEnterImage = () => {
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

  const handleMouseLeaveImage = () => {
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

  const handleMouseEnterTime = () => {
    setIsHovered(true); 
  };

  const handleMouseLeaveTime = () => {
    setIsHovered(false); 
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const theme = useTheme();
  
  return (
    <Stack
    sx={{
      marginBottom: 4,
      alignItems: 'flex-start',
      position: 'relative',
      flexDirection: {
        xs: 'column', 
        sm: 'column'  ,
        md: 'column'  ,
        lg:'row'
      }
    }}
  >

 {/*---------------- index circle & start time & end time-------------- */}
      <Stack direction='row' >


       {/*---------------- index circle -------------- */}
      <Box sx={{ minWidth: '40px', textAlign: 'center', marginRight: '0vw', position: 'relative' }}>
        <Box
          sx={{
            width:{ xs:30,sm:30,md:32,lg:35},
            height: { xs:30,sm:30,md:32,lg:35},
            borderRadius: '50%',
            backgroundColor: '#fdddb5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            position: 'relative',
          }}
        >
          <Typography variant="h6" style={{ fontWeight: 'normal', fontFamily: 'Lexend', color: '#d4831f' }}>{index}</Typography>
        </Box>
      </Box>


{/*---------------- start time  & end time -------------- */}
      <Stack
      gap={1}
      sx={{
        minWidth: '6vw',
        textAlign: 'right',
        // marginX: 1,
        [theme.breakpoints.down('xs')]: {
          flexDirection: 'row',
        },
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'row',
        },
        [theme.breakpoints.down('md')]: {
          flexDirection: 'row',
        },
        [theme.breakpoints.down('lg')]: {
          flexDirection: 'row',
        },
      }}
    >

      {/*---------------- start time -------------- */}
        <Typography
          variant="h6"
          style={{
            height:'30px',
            // width: '100px',
            fontWeight: startTime === highlightedStartTime ? '600' : 'normal',
            fontFamily: 'Lexend',
            color: startTime === highlightedStartTime || isHovered ? 'darkorange' : '#707070',
            fontSize: startTime === highlightedStartTime ? '1.15rem' : '1.05rem',
            textDecoration: startTime === highlightedStartTime || isHovered ? 'underline' : 'none',
            cursor: 'pointer',
            

          }}
          onClick={() => onStartTimeClick(startTime)}
          onMouseEnter={handleMouseEnterTime}
          onMouseLeave={handleMouseLeaveTime}
        >
          {formattedStartTime}
        </Typography>



        <Typography variant="h6" 
        style={{ fontWeight: 'normal', fontFamily: 'Lexend', color: '#aaa', fontSize: '0.9rem' }}
        sx={{marginLeft:{xs: '10px', sm: '10px', md:'10px',lg:'0vw'},marginTop:{xs: '2px', sm: '0vw', },
        display:{xs: 'block', sm: 'block', md: 'block', lg: 'none'}
        }}>
-
          </Typography>


  {/*---------------- end time -------------- */}

        <Typography variant="h6" 
        style={{ fontWeight: 'normal', fontFamily: 'Lexend', color: '#aaa', fontSize: '0.9rem' }}
        sx={{marginLeft:{xs: '10px', sm: '10px', md:'10px',lg:'0'},marginTop:{xs: '2px', sm: '0vw', },marginRight:{xs:'0px',md:'0px',lg:'0.4vw'}}}>

          {formattedEndTime}
          </Typography>
      </Stack>

      </Stack>


      <Paper variant="outlined" sx={{
        borderRadius: '8px',
        overflow: 'hidden',
        padding: {xs:1,sm:1,md:2},
        position: 'relative',
        display: 'flex',
        width: '100%',
        marginTop:{xs: '10px', sm: '10px', md: '10px', lg: '0vw'},
        marginLeft:{xs: '0px', sm: '0px', md:'0px',lg:'1vw'},
      }}>



        <Box
          sx={{
            height: isExpanded ? {xs:100,sm:120,md:150,lg:160} : {xs:85,sm:90,md:100},
            width: {xs:80,sm:100,md:120,lg:100},
            overflow: 'hidden',
            position: 'relative',
            borderRadius: '2px',
            marginRight:{xs:'10px',sm: 2},
        
            boxShadow: '0 2px 3px rgba(0, 0, 0, 0.15)',
            // minWidth: {xs:80,sm:120},
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
              onMouseEnter={handleMouseEnterImage}
              onMouseLeave={handleMouseLeaveImage}
            />
          )}
        </Box>
        <Box flex={2} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: '1.1rem',
              fontWeight: 400,
              marginBottom: '8px',
              maxWidth: {xs:'40vw',sm:'24vw',md:'16vw',lg:'16vw'},
              whiteSpace: isExpanded ? 'normal' : 'nowrap',
              overflow: 'hidden',
              textOverflow: isExpanded ? 'clip' : 'ellipsis',
              cursor: isExpanded ? 'default' : 'pointer'
            }}
            onClick={!isExpanded ? toggleExpand : undefined}
          >
            {name}
          </Typography>

          <Box display="flex" alignItems="center" marginBottom="8px" gap={1}>
            {free && <Tag_IsFree />}
            <Tag_Category category={category} />

            {website && <Btn_Earth url={website} />}
          </Box>

          <Box
      display="flex"
      alignItems="center"
      sx={{
        gap: {
          xs: 0,   
          sm: 1,   
          md: 1,    
          lg: 1    
        }
      }}
    >
            <Typography variant="body2" color="text.secondary">
              busyness :
            </Typography>
            <Box flexGrow={1}>
              <BusynessProgressBar busyness={busyness} />
            </Box>
          </Box>

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
                    local: {attraction_phone_number || 'No local phone provided'}, international:
                    {international_phone_number || 'No international phone provided'}
                  </Typography>
                </Box>
              )}
              <Typography variant="body2" style={{ marginTop: '8px' }}>
                {description}
              </Typography>
            </Box>
          )}
        </Box>
        <Box position="absolute" bottom={0} right={3}>
          <IconButton onClick={toggleExpand}>
            {isExpanded ? <ExpandLessRounded /> : <ExpandMoreRounded />}
          </IconButton>
        </Box>
      </Paper>
    </Stack>
  );
};

export default ScheduleCard;

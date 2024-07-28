import React, { useState } from 'react';
import { CardMedia, Typography, Box, IconButton, Paper, Stack } from '@mui/material';
import { ExpandLessRounded, ExpandMoreRounded, LocationOnRounded, PhoneEnabledRounded } from '@mui/icons-material';
import moment from 'moment';
import Tag_IsFree from '../Tag_IsFree';
import Tag_Category from '../Tag_Category';
import Btn_Earth from '../Btn_Earth';
// import BusynessProgressBar from '../schedule/BusynessProgressBar';

interface ScheduleCardProps {
  item: any;
  index: number;
  onStartTimeClick: (startTime: string) => void;
  highlightedStartTime: string | null;
}

const SavedScheduleCard: React.FC<ScheduleCardProps> = ({
  item,
  index,
  onStartTimeClick,
  highlightedStartTime,
}) => {
  const formattedStartTime = moment(item.startTime).format('hh:mm A');
  const formattedEndTime = moment(item.endTime).format('hh:mm A');

  const defaultImage = `/images/spots_small/${item.id}_1.webp`;
  const secondImage = `/images/spots_small/${item.id}_2.webp`;
  const imageSrc = item.image_url || defaultImage;

  const [currentImage, setCurrentImage] = useState(imageSrc);
  const [imageStyle, setImageStyle] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnterImage = () => {
    if (!item.image_url) {
      setCurrentImage(secondImage);
    }
    setImageStyle({
      transition: 'transform 7s ease',
      transform: 'scale(1.4)',
    });
  };

  const handleMouseLeaveImage = () => {
    if (!item.image_url) {
      setCurrentImage(defaultImage);
    }
    setImageStyle({
      transition: 'none',
      transform: 'scale(1)',
    });
  };

  const handleMouseEnterTime = () => {
    setIsHovered(true);
  };

  const handleMouseLeaveTime = () => {
    setIsHovered(false);
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <Stack
      sx={{
        marginBottom: 4,
        alignItems: 'flex-start',
        position: 'relative',
        flexDirection: {
          xs: 'column',
          sm: 'column',
          md: 'column',
          lg: 'column',
        },
      }}
    >
      <Stack direction="row">
        <Box sx={{ minWidth: '40px', textAlign: 'center', marginRight: '0vw', position: 'relative' }}>
          <Box
            sx={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              backgroundColor: '#fdddb5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              position: 'relative',
            }}
          >
            <Typography variant="h6" style={{ fontWeight: '400', fontFamily: 'Lexend', color: '#d4831f', fontSize: '18px' }}>
              {index}
            </Typography>
          </Box>
        </Box>

        <Stack gap={1} sx={{ minWidth: '6vw', textAlign: 'right', flexDirection: 'row' }}>
          <Typography
            variant="h6"
            style={{
              height: '30px',
              fontWeight: item.startTime === highlightedStartTime ? '600' : 'normal',
              fontFamily: 'Lexend',
              color: '#707070',
              fontSize: '18px'
            }}
            onClick={() => onStartTimeClick(item.startTime)}
            onMouseEnter={handleMouseEnterTime}
            onMouseLeave={handleMouseLeaveTime}
          >
            {formattedStartTime}
          </Typography>

          <Typography
            variant="h6"
            style={{ fontWeight: 'normal', fontFamily: 'Lexend', color: '#707070', fontSize: '0.9rem' }}
            sx={{ marginLeft: { xs: '10px', sm: '10px', md: '10px', lg: '0vw' }, marginTop: { xs: '2px', sm: '0vw' }, display: { xs: 'block', sm: 'block', md: 'block', lg: 'block' } }}
          >
            -
          </Typography>

          <Typography
            variant="h6"
            style={{ fontWeight: 'normal', fontFamily: 'Lexend', color: '#707070', fontSize: '18px' }}
            sx={{ marginLeft: { xs: '10px', sm: '10px', md: '10px', lg: '0' }, marginTop: { xs: '2px', sm: '0vw' }, marginRight: { xs: '0px', md: '0px', lg: '0.4vw' } }}
          >
            {formattedEndTime}
          </Typography>
        </Stack>
      </Stack>

      <Paper
        variant="outlined"
        sx={{
          borderRadius: '8px',
          overflow: 'hidden',
          padding: { xs: 1, sm: 1, md: 2 },
          position: 'relative',
          display: 'flex',
          width: {xs:'75vw',sm:'500px'},
          marginTop: { xs: '10px', sm: '10px', md: '10px', lg: '10px' },
          marginLeft: { xs: '0px', sm: '0px', md: '0px', lg: '0' },
        }}
      >
        <Box
          sx={{
            height: isExpanded ? { xs: 100, sm: 120, md: 150, lg: 160 } : { xs: 85, sm: 90, md: 100 },
            width: { xs: 80, sm: 100, md: 120, lg: 100 },
            overflow: 'hidden',
            position: 'relative',
            borderRadius: '2px',
            marginRight: { xs: '10px', sm: 2 },
            boxShadow: '0 2px 3px rgba(0, 0, 0, 0.15)',
          }}
        >
          {currentImage && (
            <CardMedia
              component="img"
              image={currentImage}
              alt={item.name}
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0,
                ...imageStyle,
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
              maxWidth: { xs: '40vw', sm: '24vw', md: '16vw', lg: '16vw' },
              whiteSpace: isExpanded ? 'normal' : 'nowrap',
              overflow: 'hidden',
              textOverflow: isExpanded ? 'clip' : 'ellipsis',
              cursor: isExpanded ? 'default' : 'pointer',
            }}
            onClick={!isExpanded ? toggleExpand : undefined}
          >
            {item.name}
          </Typography>

          <Box display="flex" alignItems="center" marginBottom="8px" gap={1}>
            {item.free && <Tag_IsFree />}
            <Tag_Category category={item.category} />
            {item.website && <Btn_Earth url={item.website} />}
          </Box>
          {item.address && (
            <Box display="flex" alignItems="center" marginTop="8px">
              <LocationOnRounded sx={{ fontSize: 'large', marginRight: '8px' }} />
              <Typography variant="body2" color="text.secondary">
                {item.address}
              </Typography>
            </Box>
          )}

          {isExpanded && (
            <Box marginTop={0}>
              {(item.attraction_phone_number || item.international_phone_number) && (
                <Box display="flex" alignItems="center" marginTop="8px">
                  <PhoneEnabledRounded sx={{ fontSize: 'large', marginRight: '8px' }} />
                  <Typography variant="body2" color="text.secondary">
                    local: {item.attraction_phone_number || 'No local phone provided'}, international: {item.international_phone_number || 'No international phone provided'}
                  </Typography>
                </Box>
              )}
              <Typography variant="body2" style={{ marginTop: '8px' }}>
                {item.description}
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

export default SavedScheduleCard;

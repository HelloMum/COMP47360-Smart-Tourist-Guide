import React, { useState } from 'react';
import { CardMedia, Typography, Box, Paper, Stack, IconButton } from '@mui/material';
import { PublicRounded, Close } from '@mui/icons-material';
import moment from 'moment';
import Tag_IsFree from '../Tag_IsFree';
import Tag_Category from '../Tag_Category';
import BusynessProgressBar from './BusynessProgressBar';

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
  onClose: () => void;
}

const ScheduleCard_Popup: React.FC<ScheduleCardProps> = ({
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
  onClose
}) => {
  const formattedStartTime = moment(startTime).format('hh:mm A');
  const formattedEndTime = moment(endTime).format('hh:mm A');

  const defaultImage = `/images/spots_small/${id}_1.webp`;
  const secondImage = `/images/spots_small/${id}_2.webp`;
  const imageSrc = event ? event_image : defaultImage;

  const [currentImage, setCurrentImage] = useState(imageSrc);
  const [imageStyle, setImageStyle] = useState({});

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

  return (
    <Box sx={{ marginBottom: 3, display: 'flex', alignItems: 'flex-start', position: 'relative' }}>
      <Paper variant="outlined" sx={{
        borderRadius: '8px',
        overflow: 'hidden',
        paddingY: 2,
        paddingLeft: 2,
        position: 'relative',
        display: 'flex',
        width: '450px',
        backgroundColor: 'white',
      }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
        >
          <Close />
        </IconButton>

        <Stack direction='column' gap={1} sx={{ textAlign: 'right', marginRight: 1 }}>
          <Typography
            variant="h6"
            style={{ fontWeight: 'normal', fontFamily: 'Lexend', color: '#707070', fontSize: '1.05rem', cursor: 'pointer' }}
            onClick={() => onStartTimeClick(startTime)}
          >
            {formattedStartTime}
          </Typography>
          <Typography variant="h6" style={{ fontWeight: 'normal', fontFamily: 'Lexend', color: '#aaa', fontSize: '0.9rem' }}>{formattedEndTime}</Typography>
        </Stack>

        <Box
          sx={{
            height: 100,
            width: 100,
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
          <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 400, marginBottom: '8px' }}>{name}</Typography>

          <Box display="flex" alignItems="center" marginBottom="8px" gap={1}>
            <Tag_IsFree isFree={free} />
            <Tag_Category category={category} />
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer">
                <PublicRounded sx={{ fontSize: 'large', color: '#333' }} />
              </a>
            )}
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body2" color="text.secondary">
              area busyness
            </Typography>
            <Box flexGrow={1}>
              <BusynessProgressBar busyness={busyness} />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ScheduleCard_Popup;

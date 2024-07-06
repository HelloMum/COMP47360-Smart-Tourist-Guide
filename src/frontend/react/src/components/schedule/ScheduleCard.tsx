import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, CardMedia, Stack } from '@mui/material';
import { LocationOnRounded, PhoneEnabledRounded, PublicRounded } from '@mui/icons-material';
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
  userRatings_total
}) => {
  const formattedStartTime = moment(startTime).format('LT'); 
  const formattedEndTime = moment(endTime).format('LT');    

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
    <Card variant="outlined" sx={{ 
      borderRadius: '8px', 
      overflow: 'hidden', 
      boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)', 
      marginBottom: 3, 
      gap: 1 
    }}>
      <CardContent>
        <Stack spacing={3}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h5">{formattedStartTime} - {formattedEndTime}</Typography>
           
            </Box>
            <Typography variant="body1">
              <strong>Busyness:</strong> {busyness.toFixed(2)}
            </Typography>
          </Box>
          <Stack direction='row' gap={1}>
            <Box
              sx={{ 
                height: 200,
                width: 200,
                overflow: 'hidden',
                position: 'relative',
                borderRadius:'6px',
                boxShadow:2

              
            
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
            <Box marginLeft={2} flex={1}>
              <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 400 }}>{name}</Typography>
              <Box display="flex" alignItems="center" marginBottom="8px">
                <Tag_IsFree isFree={free} />
                <Tag_Category category={category} />
                {website && (
                  <a href={website} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '8px' }}>
                    <PublicRounded sx={{ fontSize: 'large' }} />
                  </a>
                )}
              </Box>
              <Stack gap={1.5} marginTop={2}>
                {address && (
                  <Box display="flex" alignItems="center">
                    <LocationOnRounded sx={{ fontSize: 'large', marginRight: '8px' }} />
                    <Typography variant="body2" color="text.secondary">{address}</Typography>
                  </Box>
                )}
                {(attraction_phone_number || international_phone_number) && (
                  <Box display="flex" alignItems="center">
                    <PhoneEnabledRounded sx={{ fontSize: 'large', marginRight: '8px' }} />
                    <Typography variant="body2" color="text.secondary">
                      {attraction_phone_number || 'No local phone provided'} <br />
                      {international_phone_number || 'No international phone provided'}
                    </Typography>
                  </Box>
                )}
              </Stack>
              <Typography variant="body2">
                {description}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ScheduleCard;

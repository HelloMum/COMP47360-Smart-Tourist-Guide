import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, CardMedia, Rating, Stack } from '@mui/material';
import moment from 'moment';


interface ScheduleCardProps {
  id: string | number;
  name: string;
  startTime: string;
  endTime: string;
  latitude: number;
  longitude: number;
  busyness: number;
  category: string;
  address: string;
  website: string;
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
    if (!event) {
      setCurrentImage(secondImage);
      setImageStyle({
        transition: 'transform 7s ease',
        transform: 'scale(1.4)',
      });
    }
  };

  const handleMouseLeave = () => {
    if (!event) {
      setCurrentImage(defaultImage);
      setImageStyle({
        transition: 'none',
        transform: 'scale(1)',
      });
    }
  };

  return (
    <Card variant="outlined" style={{ marginBottom: '16px' }}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Box>
              <Typography variant="h5">{formattedStartTime}</Typography>
              <Typography variant="h5">-</Typography>
              <Typography variant="h5">{formattedEndTime}</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            {currentImage && (
              <CardMedia
                component="img"
                image={currentImage}
                alt={name}
                style={{ height: 140, objectFit: 'cover', marginTop: '16px', ...imageStyle }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            )}
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 400 }}>{name}</Typography>
            <Stack direction="row" spacing={1} alignItems="center" marginBottom="8px">
              <Rating name="read-only" value={rating} precision={0.1} readOnly size="small" />
              <Typography variant="body2">{rating}</Typography>
              <Typography variant="body2" color="textSecondary">by {userRatings_total} people</Typography>
            </Stack>
            <Box display="flex" alignItems="center" marginBottom="8px">
              {/* <Tag_Free isFree={free} />
              <Tag_Category category={category} /> */}
            </Box>
            <Typography variant="body1">
              <strong>Location:</strong> {latitude}, {longitude}
            </Typography>
            <Typography variant="body1">
              <strong>Busyness:</strong> {busyness.toFixed(2)}
            </Typography>
            <Typography variant="body1">
              <strong>Address:</strong> {address}
            </Typography>
            <Typography variant="body1">
              <strong>Website:</strong> <a href={website} target="_blank" rel="noopener noreferrer">{website}</a>
            </Typography>
            <Typography variant="body1">
              <strong>Description:</strong> {description}
            </Typography>
            <Typography variant="body1">
              <strong>Contact Phone:</strong> {attraction_phone_number || 'N/A'}
            </Typography>
            <Typography variant="body1">
              <strong>International Phone:</strong> {international_phone_number || 'N/A'}
            </Typography>
            <Typography variant="body1">
              <strong>Event:</strong> {event ? 'Yes' : 'No'}
            </Typography>
            <Typography variant="body1">
              <strong>Free:</strong> {free ? 'Yes' : 'No'}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ScheduleCard;

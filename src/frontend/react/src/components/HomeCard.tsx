import React, { useContext, useState, useEffect } from 'react';
import { Card, Box, CardMedia, Typography, Stack, Rating } from '@mui/material';

interface SpotCardProps {
  image1: string;
  image3: string;
  title: string;
  rating: number;
  user_ratings_total: number;
}

const HomeCard: React.FC<SpotCardProps> = ({ image1, image3, title, rating, user_ratings_total }) => {
  const [currentImage, setCurrentImage] = useState(image1);
  const [imageStyle, setImageStyle] = useState({});
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  const handleMouseEnter = () => {
    setCurrentImage(image3);
    setImageStyle({
      transition: 'transform 7s ease',
      transform: 'scale(1.4)',
    });
  };

  const handleMouseLeave = () => {
    setCurrentImage(image1);
    setImageStyle({
      transition: 'none',
      transform: 'scale(1)',
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Card sx={{ boxShadow: '0 2px 2px rgba(0, 0, 0, 0.0)', width: '100%', marginBottom: 2 }}>
        <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: '16px', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)' }}>
          <CardMedia
            component="img"
            height={`${screenHeight * 0.65}px`}
            image={currentImage}
            alt={title}
            sx={{ ...imageStyle }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </Box>

        <Stack sx={{ paddingTop: '8px', paddingLeft: '12px' }}>
          <Typography
            sx={{
              fontSize: '1.1rem',
              fontWeight: 400,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              maxWidth: '95%',
            }}
            component="div"
          >
            {title}
          </Typography>

          <Stack direction={"row"} gap={1}>
            <Rating name="half-rating-read" defaultValue={rating} precision={0.1} readOnly sx={{ fontSize: '1.2rem' }} />
            {rating}<span style={{ color: '#888' }}>by {user_ratings_total} people</span>
          </Stack>
        </Stack>
      </Card>
    </>
  );
};

export default HomeCard;

import React, { useContext, useState } from 'react';
import { Card, Box, CardMedia, Typography, Stack, Rating, IconButton } from '@mui/material';
import { ExpandMoreRounded } from '@mui/icons-material';
import Btn_Like from './Btn_Like';
import Tag_Category from './Tag_Category';
import Tag_IsFree from './Tag_IsFree';

interface SpotCardProps {
  image1: string;
  image3: string;
  title: string;
  rating: number;
  user_ratings_total: number;
}

const HomeCard: React.FC<SpotCardProps> = ({image1,image3,title,rating,user_ratings_total} ) => {
  const [currentImage, setCurrentImage] = useState(image1);
  const [imageStyle, setImageStyle] = useState({});

  const [alertOpen, setAlertOpen] = useState(false);

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


  return (
    <>
      <Card sx={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 2px rgba(0, 0, 0, 0.0)', width: "17.5vw", marginBottom: 2, gap: 1 }}>
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="170"
    
            sx={{ borderRadius: '0px', boxShadow: 0, ...imageStyle }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <Btn_Like />
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
          <Stack direction='row' justifyContent="space-between" sx={{ width: '95%', paddingTop: 1.5 }}>
      
        
          </Stack>
        </Stack>
      </Card>

    </>
  );
};

export default HomeCard;

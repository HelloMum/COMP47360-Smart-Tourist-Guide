import React, { useContext, useState } from 'react';
import { Card, Box, CardMedia, Typography, Stack, Rating, IconButton } from '@mui/material';
import { ExpandMoreRounded } from '@mui/icons-material';
import Btn_Add from '../Btn_Add';
import Btn_Like from '../Btn_Like';
import Tag_Category from '../Tag_Category';
import Tag_IsFree from '../Tag_IsFree';
import { ListContext } from '../../contexts/ListContext';

interface SpotCardProps {
  id: string;
  image1: string;  
  image3: string; 
  title: string;
  address: string;
  rating: number;
  isFree: boolean;
  category: string;
  user_ratings_total: number;
  onExpand: () => void;
}

const SpotCard: React.FC<SpotCardProps> = ({ id, image1, image3, title, rating, category, user_ratings_total, onExpand }) => {
  const [currentImage, setCurrentImage] = useState(image1);
  const { addToList } = useContext(ListContext);

  const handleMouseEnter = () => {
    setCurrentImage(image3);
  };

  const handleMouseLeave = () => {
    setCurrentImage(image1);
  };

  const handleAdd = () => {
    const spotData = { id, title, image: image1 };
    addToList(spotData);
    console.log('Add:', spotData);
  };

  return (
    <Card sx={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 3px rgba(0, 0, 0, 0.15)', width: "17.8vw", marginBottom: 2, marginX:1 }}>
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia component="img" height="170" image={currentImage} alt={title} sx={{ borderRadius: '0px', boxShadow: 0 }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        <Btn_Like/>
      </Box>
      <Stack sx={{ paddingTop: '8px', paddingLeft: '12px' }}>
        <Typography sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: '95%' }} component="div">
          {title}
        </Typography>
        <Stack direction={"row"} gap={1}>
          <Rating name="half-rating-read" defaultValue={rating} precision={0.1} readOnly  sx={{ fontSize: '1.2rem' }}  /> 
          {rating}<span style={{ color: '#888' }}>by {user_ratings_total} people</span>
        </Stack>
        <Stack direction="row">
          <Tag_Category category={category} />
          <Tag_IsFree isFree={true} />
        </Stack>
        <Stack direction='row' justifyContent="space-between" sx={{ width: '95%', paddingTop: 1.5 }}>
          <Btn_Add onClick={handleAdd} />
          <IconButton onClick={onExpand}><ExpandMoreRounded /></IconButton>
        </Stack>
      </Stack>
    </Card>
  );
};

export default SpotCard;

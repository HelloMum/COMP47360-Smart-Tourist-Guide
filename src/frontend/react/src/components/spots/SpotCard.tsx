import React, { useContext, useState } from 'react';
import { Card, Box, CardMedia, Typography, Stack, Rating, IconButton } from '@mui/material';
import { ExpandMoreRounded } from '@mui/icons-material';
import Btn_Add from '../Btn_Add';
import Btn_Like from '../Btn_Like';
import Tag_Category from '../Tag_Category';
import Tag_IsFree from '../Tag_IsFree';
import { ListContext } from '../../contexts/ListContext';
import AlertModal from '../AlertModal';

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
  const [imageStyle, setImageStyle] = useState({});
  const { addItemWithDateCheck, isItemInList } = useContext(ListContext);
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

  const handleAdd = () => {
    const spotData = { id, title, image: image1 };
    addItemWithDateCheck(spotData, () => setAlertOpen(true), 'SpotCard');
  };

  const isAdded = isItemInList(title);

  return (
    <>
      <Card sx={{ 
        borderRadius: '8px', 
        overflow: 'hidden', 
        boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.2)', 
        width: "17.5vw", 
        marginBottom: 2, 
        gap: 1 }}>

        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="170"
            image={currentImage}
            alt={title}
            sx={{ borderRadius: '0px', boxShadow: 0, ...imageStyle }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          {/* <Btn_Like /> */}
        </Box>
        <Stack sx={{ paddingTop: '8px', paddingLeft: '12px' }} gap={'2px'}>
          <Typography
            sx={{
              fontSize: '1.1rem',
              fontWeight: 400,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              maxWidth: '95%',
              marginLeft:'2px'
            }}
            component="div"
          >
            {title}
          </Typography>

          <Stack direction={"row"} gap={1}>
            <Rating name="half-rating-read" defaultValue={rating} precision={0.1} readOnly sx={{ fontSize: '1.2rem' }} />
            {rating}<span style={{ color: '#888',fontSize:'13px' }}>by {user_ratings_total} people</span>
          </Stack>
          <Stack direction="row">
            <Tag_Category category={category} />
            <Tag_IsFree isFree={true} />
          </Stack>
          <Stack direction='row' justifyContent="space-between" sx={{ width: '95%', paddingTop: 1.5 }}>
            <Btn_Add onClick={handleAdd} isAdded={isAdded} />
            <IconButton onClick={onExpand}><ExpandMoreRounded /></IconButton>
          </Stack>
        </Stack>
      </Card>

      <AlertModal
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        title="Warning"
        message="Please set the start and end dates before adding items to the list."
      />
    </>
  );
};

export default SpotCard;

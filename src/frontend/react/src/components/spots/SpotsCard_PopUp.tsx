import React, { useState, useEffect, useContext } from 'react';
import { CardMedia, Typography, IconButton, Box, Stack, Rating } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import Btn_Add from '../Btn_Add';
import Btn_Like from '../Btn_Like';
import Tag_Category from '../Tag_Category';
import Tag_IsFree from '../Tag_IsFree';
import theme from '../../utils/theme';
import { ListContext } from '../../contexts/ListContext';
import AlertModal from '../AlertModal';

interface SpotCardPopUpProps {
  id: number;
  image1: string;
  image3: string;
  title: string;
  rating: number;
  isFree: boolean;
  category: string;
  user_ratings_total: number;
  onClose: () => void;
}

const SpotCard_PopUp: React.FC<SpotCardPopUpProps> = ({ id, image1, image3, title, rating, category, isFree, user_ratings_total, onClose }) => {
  const [currentImage, setCurrentImage] = useState(image1);
  const [imageStyle, setImageStyle] = useState({
    transition: 'none',
    transform: 'scale(1)'
  });

  const { addItemWithDateCheck, isItemInList } = useContext(ListContext);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    setCurrentImage(image1);
  }, [image1]);

  const handleMouseEnter = () => {
    setCurrentImage(image3);
    setImageStyle({
      transition: 'transform 7s ease',
      transform: 'scale(1.4)'
    });
  };

  const handleMouseLeave = () => {
    setCurrentImage(image1);
    setImageStyle({
      transition: 'none',
      transform: 'scale(1)'
    });
  };

  const handleAdd = () => {
    const spotData = { id, title, image: image1 };
    addItemWithDateCheck(spotData, () => setAlertOpen(true), 'SpotCard_PopUp');
  };

  const isAdded = isItemInList(title);

  return (
    <>
      <div style={{
        borderRadius: '8px',
        overflow: 'hidden',
        width: '17.5vw',
        background: 'white',
        marginBottom: 15,
        padding: 0
      }}>
        <Box sx={{ position: 'relative', overflow: 'hidden', margin: 0, padding: 0 }}>
          <CardMedia
            component="img"
            height="200"
            image={currentImage}
            alt={title}
            sx={{
              borderRadius: '0px',
              boxShadow: 0,
              ...imageStyle,
              height: '170px',
              margin: 0,
              padding: 0
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          {/* <Btn_Like /> */}
        </Box>

        <Stack sx={{ paddingTop: '7px', paddingLeft: '12px', margin: 0 }} gap='2px'>
          <Typography
            sx={{
              ...theme.typography.cardTitle,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              maxWidth: '95%',
              margin: 0,
              fontWeight: 400,
            }}
            component="div"
          >
            {title}
          </Typography>

          <Stack direction={"row"} gap={1} sx={{ margin: 0, alignItems: 'center' }}>
            <Rating name="half-rating-read" defaultValue={rating} precision={0.1} readOnly sx={{ fontSize: '1.2rem' }} />
            <span style={{ fontSize: '14px' }}>{rating}</span>
            <span style={{ color: '#999', fontSize: '13px', fontWeight: 400 }}>by {user_ratings_total} people</span>
          </Stack>

          <Stack direction="row" gap={1} sx={{ marginTop: '3px' }}>
            <Tag_Category category={category} />
            {isFree && <Tag_IsFree />}
          </Stack>

          <Box display="flex" alignItems="center" sx={{ margin: 0 }}></Box>
          <Stack direction='row' justifyContent="space-between" sx={{ width: '95%', paddingTop: 1.5, margin: 0 }}>
            <Btn_Add onClick={handleAdd} isAdded={isAdded} />
            <IconButton onClick={onClose} sx={{ margin: 0, padding: 0, cursor: 'pointer' }}>
              <CloseRounded />
            </IconButton>
          </Stack>
        </Stack>
      </div>

      <AlertModal
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        title="Warning"
        message="Please set the start and end dates before adding items to the list."
        sx={{
          position: 'fixed',
          top: '50%',
          left: '0%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      />
    </>
  );
};

export default SpotCard_PopUp;

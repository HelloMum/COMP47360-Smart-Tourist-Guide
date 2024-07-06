import React, { useState, useContext } from 'react';
import { AccessTimeRounded, ConfirmationNumber, DateRangeRounded, ExpandLessRounded, LocationOnRounded, PhoneEnabledRounded, PublicRounded, Close } from '@mui/icons-material';
import { Box, Card, CardMedia, Rating, Stack, Typography, Modal, IconButton } from '@mui/material';
import Btn_Add from './../Btn_Add';
import Tag_Category from './../Tag_Category';
import Tag_IsFree from './../Tag_IsFree';
import { ListContext } from '../../contexts/ListContext';
import AlertModal from '../AlertModal';

const SpotDetail = ({ spot, onCollapse }) => {
  const { listItems, addItemWithDateCheck, isItemInList } = useContext(ListContext); // Get necessary methods from ListContext
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const handleAdd = () => {
    const spotData = {
      id: spot.id,
      title: spot.attraction_name,
      image: `/images/spots_small/${spot.index}_2.webp`,
    };
    addItemWithDateCheck(spotData, () => setAlertOpen(true));
  };

  const isAdded = isItemInList(spot.id);

  return (
    <Card sx={{
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 3px rgba(0, 0, 0, 0.15)',
      width: "94%",
      margin: "5px auto",
    }}>
      {/*------------------ picture -------------------- */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        height: '30vh',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ 
          borderTopLeftRadius: '6px', 
          boxShadow: 1, 
          marginTop: '10px', 
          height: '100%', 
          width: '35.5%', 
          flexShrink: 0, 
          overflow: 'hidden', 
          cursor: 'pointer' 
        }}>
          <CardMedia
            component="img"
            image={`/images/spots/${spot.index}_2.webp`}
            alt={spot.attraction_name}
            sx={{
              objectFit: 'cover',
              height: '100%',
              width: '100%',
              transition: 'transform 3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.4)'
              },
              '&:not(:hover)': {
                transition: 'transform 0.01s ease-in-out'
              }
            }}
            onClick={() => handleOpen(`/images/spots/${spot.index}_2.webp`)}
          />
        </Box>
        <Box sx={{ 
          borderTopRightRadius: '6px', 
          boxShadow: 1, 
          marginTop: '10px', 
          height: '100%', 
          width: '64%', 
          flexShrink: 0, 
          overflow: 'hidden', 
          cursor: 'pointer' 
        }}>
          <CardMedia
            component="img"
            image={`/images/spots/${spot.index}_3.webp`}
            alt={spot.attraction_name}
            sx={{
              objectFit: 'cover',
              height: '100%',
              width: '100%',
              transition: 'transform 3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.4)'
              },
              '&:not(:hover)': {
                transition: 'transform 0.01s ease-in-out'
              }
            }}
            onClick={() => handleOpen(`/images/spots/${spot.index}_3.webp`)}
          />
        </Box>
      </Box>
      {/*------------------ content below pictures -------------------*/}
      <Stack sx={{ p: 3, px: 5 }}>
        {/*--------------- title & two tags -------------------------- */}
        <h2 style={{ marginBottom: 4 }}>{spot.attraction_name}</h2>
        <Stack marginBottom={1}>
          <span>
            <Tag_Category category={spot.category} />
            <Tag_IsFree isFree={true} />
          </span>
        </Stack>

        {/*-------------------- rating ---------------------- */}
        <Stack direction={"row"} gap={1}>
          <Rating name="half-rating-read" defaultValue={spot.attraction_rating} precision={0.1} readOnly />
          {spot.attraction_rating} by {spot.user_ratings_total} people
        </Stack>

        <Typography variant="body2" marginTop={2}>
          {spot.description}
        </Typography>

        {/*------------------ Address, price, website, phone -------------------- */}
        <Stack gap={1.5} marginTop={2}>
          {/* Address */}
          <Box display="flex" alignItems="center">
            <LocationOnRounded sx={{ fontSize: 'large', marginRight: '8px' }} />
            <Typography variant="body2" color="text.secondary" sx={{ marginRight: '24px' }}>
              {spot.attraction_vicinity}
            </Typography>
          </Box>

          {/* price */}
          <Box display="flex" alignItems="center">
            <ConfirmationNumber sx={{ fontSize: 'large', marginRight: '8px' }} />
            <Typography variant="body2" color="text.secondary">
              from {spot.price} per adult
            </Typography>
          </Box>

          {/* website */}
          <Box display="flex" alignItems="center">
            <PublicRounded sx={{ fontSize: 'large', marginRight: '8px' }} />
            {spot.attractionWebsite ? (
              <a href={spot.attractionWebsite} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="text.secondary">
                  {spot.attractionWebsite}
                </Typography>
              </a>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No address provided
              </Typography>
            )}
          </Box>

          {/* phone */}
          <Box display="flex">
            <PhoneEnabledRounded sx={{ fontSize: 'large', marginRight: '8px' }} />
            <Typography variant="body2" color="text.secondary">
              local: {spot.attraction_phone_number || 'No local phone provided'} <br />
              international: {spot.international_phone_number || 'No international phone provided'}
            </Typography>
          </Box>

          {/*------------------------------------- two buttons ------------------------- */}
          <Box display="flex" alignItems="center" justifyContent="space-between" marginTop={2}>
            <Btn_Add onClick={handleAdd} isAdded={isAdded} />

            <IconButton onClick={onCollapse}><ExpandLessRounded /></IconButton>
          </Box>
        </Stack>
      </Stack>

      {/* Modal for displaying large image */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          style: { backgroundColor: 'transparent' }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 0,
            textAlign: 'center',
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '50%',
              padding: '6px',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
              },
              '&:active': {
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
              },
            }}
            onClick={handleClose}
          >
            <Close sx={{ fontSize: '18px' }} />
          </IconButton>

          <CardMedia
            component="img"
            image={selectedImage}
            alt="Selected image"
            sx={{
              maxHeight: '70vh',
              // height: '60%',
              objectFit: 'cover',
            }}
          />
        </Box>
      </Modal>

      <AlertModal
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        title="Warning"
        message="Please set the start and end dates before adding items to the list."
      />
    </Card>
  );
};

export default SpotDetail;

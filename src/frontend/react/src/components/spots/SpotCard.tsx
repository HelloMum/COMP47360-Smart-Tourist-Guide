import React, { useState } from 'react';
import { Card, CardMedia, Typography, IconButton, Box, Stack, Rating } from '@mui/material';
import theme from '../../theme';
import { ConfirmationNumber, ExpandMoreRounded } from '@mui/icons-material';
import Btn_Add from '../Btn_Add';
import Btn_Like from '../Btn_Like';
import Tag_Category from '../Tag_Category';
import Tag_IsFree from '../Tag_IsFree';

interface SpotCardProps {
  image1: string;  
  image3: string; 
  title: string;
  address: string;
  rating: number;
  isFree: boolean;
  category: string;
  user_ratings_total: number;
  onAdd: () => void;
  onExpand: () => void;
}

const SpotCard: React.FC<SpotCardProps> = ({ image1, image3, title, rating,category,price,user_ratings_total, onExpand }) => {
  const [currentImage, setCurrentImage] = useState(image1);
  const [imageStyle, setImageStyle] = useState({
    transition: 'none',  
    transform: 'scale(1)' 
  });

  // hover
  const handleMouseEnter = () => {
    setCurrentImage(image3);
    setImageStyle({
      transition: 'transform 7s ease',  
      transform: 'scale(1.4)' 
    });
  };

  // mouse leave
  const handleMouseLeave = () => {
    setCurrentImage(image1);
    setImageStyle({
      transition: 'none',  
      transform: 'scale(1)'  
    });
  };

  return (
    <Card sx={{
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 3px rgba(0, 0, 0, 0.15)',
      width: "47%",
      marginBottom: 2
    }}>


      {/* ---------------------   image   ---------------------- */}

      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="170"
          image={currentImage}
          alt={title}
          sx={{
            borderRadius: '0px',
            boxShadow: 0,
            ...imageStyle
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <Btn_Like/>
      </Box>

    {/* --------------------- content below image   ---------------------- */}

       <Stack sx={{ paddingTop: '8px', paddingLeft: '12px' }}>


     {/* ---------------------   title   ---------------------- */}

   
     <Typography
      sx={{
        ...theme.typography.cardTitle,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis', 
        maxWidth: '95%'           
      }}
      component="div"
    >
      {title}
    </Typography>


      {/* ---------------------   rating   ---------------------- */}

        <Stack direction={"row"} gap={1} >
      <Rating name="half-rating-read" defaultValue={rating} precision={0.1} readOnly  sx={{ fontSize: '1.2rem' }}  /> 
      {rating} by {user_ratings_total} people
       
</Stack>


  {/* ---------------------   two tags   ---------------------- */}
<Stack >


<span  >
<Tag_Category category={category} />
<Tag_IsFree isFree={true} />
</span>
</Stack>


        {/* ---------------------   price  ---------------------- */}

{/* <Box display="flex" alignItems="center" >
      
          <Typography variant="body2" color="text.secondary">
           from   {price } per adult
          </Typography>
        </Box> */}

        
  {/* ---------------------   two buttons  ---------------------- */}

<Box display="flex" alignItems="center" ></Box>
        <Stack direction='row' justifyContent="space-between" sx={{ width: '95%', paddingTop: 1.5 }}>
          
          <Btn_Add/>


          <IconButton onClick={onExpand}>
            <ExpandMoreRounded />
          </IconButton>

          
        </Stack>
      </Stack>
    </Card>
  );
};

export default SpotCard;

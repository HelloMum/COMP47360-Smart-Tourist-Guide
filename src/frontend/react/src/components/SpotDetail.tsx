import { AccessTimeRounded, ConfirmationNumber, DateRangeRounded, ExpandLessRounded, LocationOnRounded, Margin, PhoneEnabledRounded, PublicRounded } from '@mui/icons-material';
import { Box, Card, CardMedia, Rating, Stack, Typography } from '@mui/material';
import React from 'react';
import Btn_Add from './Btn_Add';
import Tag_Category from './Tag_Category';
import Tag_IsFree from './Tag_IsFree';

const SpotDetail = ({ spot, onCollapse }) => {
  return (
    <Card  sx={{
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 3px rgba(0, 0, 0, 0.15)',
      width: "94%",
      margin: "5px auto",

    }}>
  
  

    {/*------------------   picture  -------------------- */}

    <Box sx={{
  display: 'flex', 
  alignItems: 'center', 
  position: 'relative',
  height: '30vh', 
  justifyContent: 'space-between'  
}}>
  <CardMedia
    component="img"
    image={spot.image2}
    alt={spot.title}
    sx={{
      borderTopLeftRadius: '6px',
      boxShadow: 1,
      marginTop: '10px',
      objectFit: 'cover', 
      height: '100%',  
      width: '35.5%', 
      flexShrink: 0  
    }}
  />

  <CardMedia
    component="img"
    image={spot.image3}
    alt={spot.title}
    sx={{
      borderTopRightRadius: '6px',
      boxShadow: 1,
      marginTop: '10px',
      objectFit: 'cover', 
      height: '100%',  
      width: '64%', 
      flexShrink: 0  
    }}
  />
</Box>

{/*------------------ content below pictures -------------------*/}

<Stack sx={{ p: 3, px: 5 }}>


      <h2>{spot.title}</h2>

  {/*---------- rating & two Tag---------------------- */}


      <Stack direction={"row"} gap={1}>
      <Rating name="half-rating-read" defaultValue={spot.rating} precision={0.1} readOnly /> 
      {spot.rating}
      <Tag_Category category={spot.category} />
      <Tag_IsFree isFree={true}/>
</Stack>


<Typography variant="body2" marginTop={3}>

  {spot.description}
</Typography>

     

      {/*------------------ Date, Time, and Address -------------------- */}
      <Stack gap={2} marginTop={2}>

        {/* Address */}
        <Box display="flex" alignItems="center" >
          <LocationOnRounded sx={{ fontSize: 'large', marginRight: '8px' }} />
          <Typography variant="body2" color="text.secondary" sx={{ marginRight: '24px' }}>
            {spot.address} 
          </Typography>
          </Box>


        {/* price */}

          <Box display="flex" alignItems="center" >
          <ConfirmationNumber sx={{ fontSize: 'large', marginRight: '8px' }}/>
          <Typography variant="body2" color="text.secondary">
           from   {spot.price } per adult
          </Typography>
        </Box>

        {/* website */}
        <Box display="flex" alignItems="center">
          <PublicRounded sx={{ fontSize: 'large', marginRight: '8px' }}/>
          <Typography variant="body2" color="text.secondary">
            {spot.website || 'No address provided'}  
          </Typography>
        </Box>


      {/* phone */}
      <Box display="flex" alignItems="center">
          <PhoneEnabledRounded sx={{ fontSize: 'large', marginRight: '8px' }}/>
          <Typography variant="body2" color="text.secondary">
            {spot.phone || 'No address provided'}  
          </Typography>
        </Box>
      
        <Box display="flex" alignItems="center" justifyContent="space-between"  marginTop={2}>
          <Btn_Add/>
        <ExpandLessRounded onClick={onCollapse} sx={{ cursor: 'pointer' }} />
        </Box>


      </Stack>
      
      </Stack>
   

    
    </Card>
  );
};

export default SpotDetail;


import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Card,Box, CardContent, CardMedia, IconButton, Typography, Stack, Button } from '@mui/material';


const EventCard = () => {

  const image = "images/spots/test.png"; 
  const title = 'Slutfest Pridefest - A Party Celebration of Pride!';
  const location = 'New York, NY 10004';

  return (  
  
  <Card sx={{ borderRadius: '7px', overflow: 'hidden', boxShadow:0 ,width: "100%" ,padding:2
  }}>
    
    <Stack direction="row">

       <Box sx={{ position: 'relative' }}>
      <CardMedia
        component="img"
        height="120"
        image={image}
        alt={title}
        sx={{ borderRadius: '15px',boxShadow:0 }}
      />


      <Box
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          bgcolor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: '50%',
        }}
      >
        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>
      </Box>
       </Box>

  <CardContent>
      <Typography gutterBottom variant="h6" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {location}
      </Typography>

      <Button variant="contained" sx={{ backgroundColor: 'grey', color: 'white', fontSize: '0.7rem', padding: '4px 9px', minWidth: 'auto',boxShadow:0 }}>
  free
</Button>

    </CardContent>

    </Stack>
   
  
  </Card>
   
  )
}

export default EventCard

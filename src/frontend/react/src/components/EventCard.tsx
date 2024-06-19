
import { Card, CardActions, CardContent, CardMedia,  IconButton, Typography } from '@mui/material'
import React from 'react'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';

const EventCard = () => {
  return (
    <Card sx={{ maxWidth: 300 }}>
    <CardMedia
      component="img"
      height="150"
      image="/static/images/cards/paella.jpg"
      alt="Paella dish"
    />
    <CardContent>
      <Typography variant="h6" color="text.secondary">
        Statue of liberty
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites">
        <FavoriteBorderRoundedIcon />
      </IconButton>
    </CardActions>

  </Card>
  )
}

export default EventCard

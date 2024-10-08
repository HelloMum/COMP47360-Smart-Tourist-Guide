import React from 'react';
import { Box, Typography, Card, CardMedia, Divider } from '@mui/material';
import { RemoveCircleOutlineRounded } from '@mui/icons-material';

interface ListCardProps {
  id: string;
  title: string;
  image: string;
  onRemove: (id: string) => void;
}

const ListCard: React.FC<ListCardProps> = ({ id, title, image, onRemove }) => {
  return (
    <>
      <Card sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px', marginTop: '4px', boxShadow: 'none' }}>
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{ 
            width: {xs:30,sm:40}, 
            height:{xs:30,sm:40}, borderRadius: '26px', margin: '8px', boxShadow: 1 }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="body1"
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              textOverflow: 'ellipsis',
              fontSize:'15px',
            }}
          >
            {title}
          </Typography>
        </Box>
        <RemoveCircleOutlineRounded sx={{ color: 'orange', cursor: 'pointer',fontSize:{xs:20,sm:30} }} onClick={() => onRemove(title)} />
      </Card>
      <Divider sx={{ borderColor: '#dfdfdf' }} />
    </>
  );
};

export default ListCard;

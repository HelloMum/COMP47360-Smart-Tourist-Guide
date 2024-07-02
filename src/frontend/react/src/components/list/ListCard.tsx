import React from 'react';
import { Box, Typography, IconButton, Card, CardMedia, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { RemoveCircleOutlineRounded, RemoveCircleRounded } from '@mui/icons-material';

interface ListCardProps {
  id: string;
  title: string;
  image: string;
  onRemove: (id: string) => void;
}

const ListCard: React.FC<ListCardProps> = ({ id, title, image, onRemove }) => {
  return (
    <>
    <Card sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px',marginTop:'4px', boxShadow: 'none' }}> {/* Set boxShadow to none */}
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{ width: 40, height: 40, borderRadius: '26px', margin: '8px',boxShadow:1 }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body1">{title}</Typography>
      </Box>

 
      <RemoveCircleOutlineRounded sx={{ color: 'orange',cursor:'pointer' }} onClick={() => onRemove(id)}/>
     


    </Card>

    <Divider/>
    </>
  );
};

export default ListCard;

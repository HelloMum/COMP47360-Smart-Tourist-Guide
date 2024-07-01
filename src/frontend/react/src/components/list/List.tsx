import React, { useContext } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ListContext } from '../../contexts/ListContext';
import ListCard from './ListCard';

interface ListProps {
  onClose: () => void;
}

const List: React.FC<ListProps> = ({ onClose }) => {
  const { listItems, removeFromList } = useContext(ListContext);

  return (
    <Box
      sx={{
        width: '18vw',
        height: '94vh',
        marginTop: '50px',
    
        // marginLeft: '10px',
        backgroundColor: 'white',
        // borderRadius: '12px',
        boxShadow: 1,
        zIndex: 10,
        position: 'fixed',
        right: 0,
      }}
    >
    



      <Box sx={{ padding: '16px', position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1001 }}>
  <IconButton
        sx={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          zIndex: 1001,
        }}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
        <Typography variant="h6">{listItems.length} items</Typography>

      </Box>

      <Box
        sx={{
          padding: '16px',
          overflowY: 'auto',
          height: 'calc(100% - 64px)', 
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }}
      >
        {listItems.map((item) => (
          <ListCard
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image} 
            onRemove={removeFromList}
          />
        ))}
      </Box>
    </Box>
  );
};

export default List;

import React, { useContext, useState } from 'react';
import { Box, Button, IconButton, Typography, Snackbar, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ListContext } from '../../contexts/ListContext';
import ListCard from './ListCard';
import { NAVBAR_HEIGHT } from '../../constants';

interface ListProps {
  onClose: () => void;
}

const List: React.FC<ListProps> = ({ onClose }) => {
  const { listItems, removeFromList } = useContext(ListContext);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  // print out the list data
  console.log(listItems);


  // click 'generate' btn to post data to backend
  const handleGeneratePlan = async () => {
    // get id of data
    const ids = listItems.map(item => ({ id: item.id }));

    try {
      const response = await fetch('http://localhost:8080/activity/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ids),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Data received from backend:', data);

      setSnackbarMessage('Data sent successfully!');
      setSnackbarSeverity('success');
    } catch (error) {
      console.error('Error sending data to backend:', error);
      setSnackbarMessage('Failed to send data.');
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        width: '18vw',
        height: `calc(100vh - ${NAVBAR_HEIGHT})`,
        marginTop: '50px',
        backgroundColor: 'white',
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
            top: '5px',
            right: '5px',
            zIndex: 1001,
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>

        <Box 
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <Button
            variant="outlined"
            sx={{
              borderRadius: '100px',
              width: '150px',
              height: '35px',
              fontSize: '14px',
              boxShadow: 0,
              borderColor: '#4CAF50',
              color: '#4CAF50',
              borderWidth:'1.5px',
              '&:hover': {
                borderColor: '#388E3C', 
                backgroundColor: 'rgba(76, 175, 80, 0.3)', 
              },
              '&:active': {
                borderColor: '#388E3C', 
                backgroundColor: 'rgba(76, 175, 80, 0.12)', 
                color: '#388E3C',
              },
            }}
            onClick={handleGeneratePlan}
          >
            generate plan
          </Button>
        </Box>

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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default List;

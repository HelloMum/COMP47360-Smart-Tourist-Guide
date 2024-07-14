import React from 'react';
import { Box, Alert, Button } from '@mui/material';
import { amber } from '@mui/material/colors'; 
import { InfoRounded } from '@mui/icons-material';

const AlertModal: React.FC<{ open: boolean; onClose: () => void; title: string; message: string }> = ({ open, onClose, title, message }) => {
  if (!open) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '-5vh',
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1300,
      }}
    >
      <Alert
        severity="info"
        sx={{
          width: '350px',
          backgroundColor: 'white',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
          color: 'gray',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        icon={false} 
      >
        <div style={{ display: 'flex', alignItems: 'center', color: '#555' }}>

   
          <span style={{padding:'5px'}}>{message}</span>
        </div>



        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Button 
            variant="contained" 
            sx={{ 
              borderRadius: 20, 
              color:'white',
              padding: '0px 5px',
              boxShadow: 0,
              '&:hover': {
                boxShadow: 0,
              },
              '&:active': {
                boxShadow: 0,
              },
            }} 
            onClick={onClose}
          >
            OK
          </Button>
        </Box>
      </Alert>
    </Box>
  );
};

export default AlertModal;

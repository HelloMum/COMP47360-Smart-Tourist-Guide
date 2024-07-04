import React from 'react';
import { Box, Alert } from '@mui/material';
import { amber } from '@mui/material/colors'; 
import { InfoRounded } from '@mui/icons-material';

const AlertModal: React.FC<{ open: boolean; onClose: () => void; title: string; message: string }> = ({ open, onClose, title, message }) => {
  if (!open) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1300,
      }}
      onClick={onClose}
    >
      <Alert
        severity="info"
        sx={{
          width: '350px',
          backgroundColor: 'white',
          boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)',
          color: 'gray', 
        }}
        icon={
          <InfoRounded
            sx={{
              fontSize: 20,
              color: amber[700],
            }}
          />
        }
      >
        <span style={{ color: 'gray' }}>{message}</span> 
      </Alert>
    </Box>
  );
};

export default AlertModal;

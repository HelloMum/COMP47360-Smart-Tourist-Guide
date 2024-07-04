import React from 'react';
import { Box, Alert, AlertTitle } from '@mui/material';

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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1300,
      }}
      onClick={onClose}
    >
      <Alert
        severity="warning"
        onClose={onClose}
        sx={{
          width: '300px',
          backgroundColor: 'white',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
};

export default AlertModal;

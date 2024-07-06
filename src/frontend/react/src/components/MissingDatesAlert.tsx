import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

const MissingDatesAlert: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  if (!open) return null;
  
  return (
    <Alert severity="warning" onClose={onClose}>
      <AlertTitle>Warning</AlertTitle>
      Please set the start and end dates before adding items to the list.
    </Alert>
  );
};

export default MissingDatesAlert;

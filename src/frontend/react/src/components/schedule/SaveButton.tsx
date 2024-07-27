import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useTheme } from '@mui/material/styles';

interface SaveButtonProps {
  isLoggedIn: boolean;
  handleSaveClick: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({ isLoggedIn, handleSaveClick }) => {
  const theme = useTheme();

  return (
    <>
      {(!isLoggedIn && (
        <Tooltip title="Log in to save your schedule">
          <IconButton
            onClick={handleSaveClick}
            sx={{
              backgroundColor: 'rgba(0, 128, 0, 0.02)', 
              color: 'green',
              height: {xs:'45px',sm:'50px'},
              width: {xs:'45px',sm:'50px'},
              borderRadius: '50px',
              border: '1px solid #34a853',
              '&:hover': {
                backgroundColor: 'rgba(0, 128, 0, 0.15)',
              },
            }}
          >
            <SaveIcon sx={{ color: '#34a853', fontSize: {xs:'26px',sm:'32px'} }} />
          </IconButton>
        </Tooltip>
      )) || (
        <Tooltip title="save your schedule">
          <IconButton
            onClick={handleSaveClick}
            sx={{
           
              color: 'green',
              height: '50px',
              width: '50px',
              borderRadius: '50px',
              border: '1px solid #34a853',
             
            }}
          >
            <SaveIcon sx={{ color: 'green' }} />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};

export default SaveButton;

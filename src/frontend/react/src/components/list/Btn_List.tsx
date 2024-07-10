import React, { useContext } from 'react';
import { Button, Box } from '@mui/material';
import { FormatListBulletedRounded } from '@mui/icons-material';
import { ListContext } from '../../contexts/ListContext';

interface BtnListProps {
  onClick: () => void;
}

const Btn_List: React.FC<BtnListProps> = ({ onClick }) => {
  const { listItems } = useContext(ListContext);

  return (
    <Box sx={{ 
      position: 'absolute', display: 'inline-block', 
      top: '100px', right: '130px' }}>
      <Button
        sx={{
          position: 'absolute',
          zIndex: 10,
          borderRadius: '20px',
          cursor: 'pointer',
          backgroundColor: '#ffc147',
          width: '90px',
          paddingX: '10px',
          color: 'white',
          '&:hover': {
            boxShadow: '1',  
          },
          '&:active': {
            boxShadow: 'none',  
          },
          boxShadow: '1',  
        }}
        variant="contained"
        startIcon={<FormatListBulletedRounded />}  
        onClick={onClick}
      >
        List
      </Button>
      {listItems.length > 0 && (
        <Box
          sx={{
            position: 'absolute',
            top: '-10px',
            right: '-95px',
            backgroundColor: 'white',
            borderRadius: '50%',
            width: '23px',
            height: '23px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#363636',
            fontSize: '13px',
            fontWeight: '500',
            zIndex: 10,
            boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.2)', 
          }}
        >
          {listItems.length}
        </Box>
      )}
    </Box>
  );
};

export default Btn_List;

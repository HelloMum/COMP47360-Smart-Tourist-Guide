import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { ChevronRightRounded, KeyboardArrowLeftRounded } from '@mui/icons-material';
import { ListContext } from '../contexts/ListContext';

const Btn_List: React.FC = () => {
  const { isLeftPanelVisible, toggleLeftPanel } = useContext(ListContext);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '70px',
        left: isLeftPanelVisible ? '42vw' : '20px',
        zIndex: 10,
        boxShadow: 2,
        borderRadius: '6px',
        cursor: 'pointer',
        backgroundColor: '#fff',
        paddingTop: '5px',
        paddingBottom: '5px',
        paddingX: '6px',
        display: 'flex',
        alignItems: 'center'
      }}
      onClick={toggleLeftPanel}
    >
      {!isLeftPanelVisible && 
      
      (<><Typography sx={{ marginLeft: 1 }}>show</Typography><ChevronRightRounded /></>
    
    )
      
      }


      {isLeftPanelVisible && <KeyboardArrowLeftRounded />}
    </Box>
  );
};

export default Btn_List;

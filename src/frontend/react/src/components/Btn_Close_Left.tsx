import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { ChevronRightRounded, KeyboardArrowLeftRounded } from '@mui/icons-material';
import { ListContext } from '../contexts/ListContext';
import { LEFT_WIDTH } from '../utils/constants';

const Btn_List: React.FC = () => {
  const { isLeftPanelVisible, toggleLeftPanel } = useContext(ListContext);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '70px',
        left: isLeftPanelVisible ?`calc(${LEFT_WIDTH} + 1vw)`: '20px',
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

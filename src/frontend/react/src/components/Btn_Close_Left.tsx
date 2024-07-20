import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { ChevronRightRounded, CloseRounded, KeyboardArrowLeftRounded } from '@mui/icons-material';
import { ListContext } from '../contexts/ListContext';
import { LEFT_WIDTH } from '../utils/constants';
import { useUpdateLeftWidth, useUpdateNavbarHeight } from '../utils/useResponsiveSizes';

const Btn_List: React.FC = () => {
  const { isLeftPanelVisible, toggleLeftPanel } = useContext(ListContext);

  useUpdateLeftWidth();
  useUpdateNavbarHeight();


  return (
    <Box
      sx={{
        position: 'absolute',
        top: {xs:isLeftPanelVisible ?'83px':'110px',sm:'70px'},
        left:{xs: isLeftPanelVisible ?`calc(${LEFT_WIDTH} - 30px)`: '20px',sm: isLeftPanelVisible ?`calc(${LEFT_WIDTH} + 1vw)`: '20px'},
        boxShadow: {xs:isLeftPanelVisible ? 0:2,sm:2},
        borderRadius: '6px',
        cursor: 'pointer',
        backgroundColor: {xs: isLeftPanelVisible ?null:"#fff",sm:'#fff'},
        paddingTop: '5px',
        paddingBottom: isLeftPanelVisible ?'0px':'5px',
        paddingX: {xs:'2px',sm:'6px'},
        display: 'flex',
        alignItems: 'center'
      }}
      onClick={toggleLeftPanel}
    >
      {!isLeftPanelVisible && 
      
      (<><Typography sx={{ marginLeft: 1 }}>show</Typography><ChevronRightRounded /></>
    
    )
      
      }


      {isLeftPanelVisible && (
        <>
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <CloseRounded style={{ color: '#333', fontSize: '22px' }} />
      </Box>
      
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <KeyboardArrowLeftRounded />
        </Box>
        </>)}
    </Box>
  );
};

export default Btn_List;

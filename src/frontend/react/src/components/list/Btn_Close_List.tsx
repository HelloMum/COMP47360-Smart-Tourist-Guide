import React from 'react';
import { Box } from '@mui/material';
import { CloseRounded, KeyboardArrowRightRounded } from '@mui/icons-material';

interface BtnCloseListProps {
  onClose: () => void;
}

const Btn_Close_List: React.FC<BtnCloseListProps> = ({ onClose }) => {


  
  return (
    <Box
      sx={{
        position: 'absolute',
        top: {xs:'100px',sm:'70px'},
        right: {            
          xs:'0vw',
          sm:'29vw',
          md:'23vw',
          lg:'19vw',
        },
        zIndex: 10,
        boxShadow: {xs:0,sm:2},
        borderRadius: '6px',
        cursor: 'pointer',
        backgroundColor: '#fff',
        paddingTop: '5px',
        paddingBottom: '0px',
        paddingX: {xs:'2px',sm:'6px'},
        display: 'flex',
        alignItems: 'center'
      }}
      onClick={onClose}
    >
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <CloseRounded style={{ color: '#333', fontSize: '22px' }} />
      </Box>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <KeyboardArrowRightRounded />
      </Box>



    </Box>
  );
};

export default Btn_Close_List;

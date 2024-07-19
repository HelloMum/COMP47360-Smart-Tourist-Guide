import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import './Header.css';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Box, Button, Stack } from '@mui/material';

import { NAVBAR_HEIGHT } from '../utils/constants';

import Logo from './Logo_Home';
import { grey } from '@mui/material/colors';

const Header = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;


  return (
    <Box
      className="header"
      style={{
        backgroundColor: 'white',
        height: NAVBAR_HEIGHT,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.15)',
        zIndex: 1000,
        paddingRight: '8%',
        paddingLeft: '8%',
      }}
    >
<Logo/>
  <Stack direction='row' gap={2}>


    
  
<Button
            onClick={() => navigate('/about')}
            variant="outlined"         
            style={{   
              borderColor:   theme.palette.primary.dark,  
              color: theme.palette.primary.dark,   
              boxShadow: 'none',            
              borderRadius: 20,         
              height: '30px',
            }}
          >
            About
          </Button>

<AccountCircleRoundedIcon style={{ color: theme.palette.primary.dark, fontSize: 28 }} />
  </Stack>


      

    </Box>
  );
};

export default Header;

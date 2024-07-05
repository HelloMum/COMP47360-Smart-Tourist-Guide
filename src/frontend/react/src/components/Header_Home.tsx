import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import './Header.css';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Box, Button, Stack } from '@mui/material';

import { NAVBAR_HEIGHT } from '../constants';

import Logo from './Logo';

const Header = () => {
  const theme = useTheme();
  const location = useLocation();


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
        boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.0)',
        zIndex: 1000,
        paddingRight: '7%',
        paddingLeft: '7%',
      }}
    >
  
<Logo/>
    
  

      <AccountCircleRoundedIcon style={{ color: theme.palette.primary.dark, fontSize: 28 }} />

    </Box>
  );
};

export default Header;

import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import './Header.css';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Box, Button, IconButton, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';

import { NAVBAR_HEIGHT } from '../utils/constants';

import Logo from './Logo_Home';
import { useAuth } from "../contexts/AuthContext"; // Import useAuth
import LoginComponent from "./users/LoginComponent";
import RegisterComponent from "./users/RegisterComponent";
import LogoutComponent from "./users/AccountMenuComponent"; // Import LogoutComponent
import AlertModal from "./AlertModal";

const Header = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const { isLoggedIn } = useAuth(); // Use the context
  const [loginOpen, setLoginOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleAvatarClick = () => {
    if (!isLoggedIn) {
      setLoginOpen(true);
    }
  };

  const handleSwitch = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <Box
      className="header"
      style={{
        backgroundColor: 'white',
        height: '50px',
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
      <Logo />
      <Stack direction='row' gap={2} alignItems='center'>
        <Button
          onClick={() => navigate('/about')}
          variant="outlined"
          style={{
            borderColor: theme.palette.primary.dark,
            color: theme.palette.primary.dark,
            boxShadow: 'none',
            borderRadius: 20,
            height: '30px',
          }}
        >
          About
        </Button>

        {!isLoggedIn && (
  <IconButton id="avatarButton" onClick={handleAvatarClick}>
    <AccountCircleRoundedIcon
      sx={{
        color: { xs: theme.palette.primary.dark, sm: theme.palette.primary.dark },
        fontSize: 28,
      }}
    />
  </IconButton>
)}




        {isLoggedIn && <LogoutComponent />} {/* Show LogoutComponent if the user is logged in */}

        {!isLoggedIn &&
          (isLoginMode ? (
            <LoginComponent
              open={loginOpen}
              onClose={() => setLoginOpen(false)}
              onSwitch={handleSwitch}
            />
          ) : (
            <RegisterComponent
              open={loginOpen}
              onClose={() => setLoginOpen(false)}
              onSwitch={handleSwitch}
            />
          ))}



      </Stack>
    </Box>
  );
};

export default Header;

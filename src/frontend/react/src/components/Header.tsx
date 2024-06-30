import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import './Header.css';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Box, Button, Stack } from '@mui/material';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AddLocationRounded from '@mui/icons-material/AddLocationAltRounded';
import LocalActivityRoundedIcon from '@mui/icons-material/LocalActivityRounded';
import { useNavigate } from 'react-router-dom';
import { NAVBAR_HEIGHT } from '../constants';
import DateRangePicker from './DateRangePicker';

const Header: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const buttonStyle = (path: string) => ({
    color: theme.palette.primary.dark,
    borderColor: isActive(path) ? theme.palette.primary.main : 'transparent',
    borderRadius: 20,
    padding: '5px 15px',
    fontSize: '0.875rem',
    height: '32px',
    borderWidth: '1px',
    borderStyle: 'solid',
    transition: 'border-color 0.2s ease-in-out',
  });

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
        boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
        paddingRight: '5%',
        paddingLeft: '2%',
        // borderTop: `1px solid ${theme.palette.primary.main}`  
      }}
    >

      {/* --------------------------logo------------------------ */}

      <Link to="/" className="logo" style={{ color: theme.palette.primary.dark }}>
        Hello,World
      </Link>




      {/* ---------------3 buttons  & date range picker------------------ */}

      <Stack direction="row" spacing={3} alignItems="center">
        <Button
          variant="text"
          onClick={() => navigate('/spots')}
          style={buttonStyle('/spots')}
          startIcon={<AddLocationRounded />}
        >
          SPOTS
        </Button>

        <Button
          variant="text"
          onClick={() => navigate('/events')}
          style={buttonStyle('/events')}
          startIcon={<LocalActivityRoundedIcon />}
        >
          Events
        </Button>

        <Button
          variant="text"
          onClick={() => navigate('/schedule')}
          style={buttonStyle('/schedule')}
          startIcon={<CalendarMonthRoundedIcon />}
        >
          Plan
        </Button>

        <DateRangePicker />
      </Stack>


      {/* -----------------  about & account ------------------ */}
      
      <Stack direction="row" spacing={3} alignItems="center">

      {/* <Button variant="outlined" onClick={() => navigate('/about')} style={{color: theme.palette.primary.dark,borderRadius:20,borderColor: theme.palette.primary.dark, padding: '2px 15px'} } >About</Button> */}

        <AccountCircleRoundedIcon style={{ color: theme.palette.primary.dark, fontSize: 28 }} />
      </Stack>
    </Box>
  );
};

export default Header;

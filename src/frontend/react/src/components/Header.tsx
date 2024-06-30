import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import './Header.css';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Box, Button, Stack } from '@mui/material';
// import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AddLocationRounded from '@mui/icons-material/AddLocationAltRounded';
import LocalActivityRoundedIcon from '@mui/icons-material/LocalActivityRounded';
import { useNavigate } from 'react-router-dom';
import { NAVBAR_HEIGHT } from '../constants';

import DateRangePicker from './DateRangePicker';
import shadows from '@mui/material/styles/shadows';
import { grey } from '@mui/material/colors';


const Header: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
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
        boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
    }}
    pr="5%"  pl="2%"
  >
         <Link to="/" className="logo" style={{color:theme.palette.primary.dark}}>Hello,World
      </Link>
      <Stack direction="row" spacing={3} alignItems="center">

   

      {/* <Button variant="text" onClick={() => navigate('/spots')} style={{color:grey[900],borderRadius:20} } startIcon={<AddLocationRounded/>}>SPOTS</Button>
  
      <Button variant="text" onClick={() => navigate('/events')} style={{color: grey[900],borderRadius:20,paddingLeft:15,paddingRight:15} }  startIcon={<LocalActivityRoundedIcon />}>Events</Button>

      <Button variant="text" onClick={() => navigate('/schedule')} style={{color: grey[900],borderRadius:20} } startIcon={<CalendarMonthRoundedIcon />}>Schedule</Button> */}

      <Button variant="text" onClick={() => navigate('/spots')} style={{color:theme.palette.primary.dark,borderRadius:20} } startIcon={<AddLocationRounded/>}>SPOTS</Button>
  
  <Button variant="text" onClick={() => navigate('/events')} style={{color: theme.palette.primary.dark,borderRadius:20,paddingLeft:15,paddingRight:15} }  startIcon={<LocalActivityRoundedIcon />}>Events</Button>

  <Button variant="text" onClick={() => navigate('/schedule')} style={{color: theme.palette.primary.dark,borderRadius:20} } startIcon={<CalendarMonthRoundedIcon />}>Schedule</Button>
  
   <DateRangePicker/>
      </Stack>

   

      <Stack direction="row" spacing={3}alignItems="center">
        
      {/* <Button variant="outlined" onClick={() => navigate('/about')} style={{color: theme.palette.primary.dark,borderRadius:20,borderColor: theme.palette.primary.dark, padding: '2px 15px'} } >About</Button> */}
          

      <AccountCircleRoundedIcon style={{color: theme.palette.primary.dark, fontSize: 30}} />
      </Stack>


    </Box>
  );
};

export default Header;

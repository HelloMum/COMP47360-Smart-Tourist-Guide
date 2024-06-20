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


const Header: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  return (
    <Box className="header" style={{ backgroundColor:theme.palette.primary.main }} px="7%" >
      
      <Stack direction="row" spacing={3} >

      <Button variant="text" onClick={() => navigate('/activity')} style={{color: 'white',borderRadius:20} } startIcon={<AddLocationRounded/>}>SPOTS</Button>

      {/* <Button variant="text" onClick={() => navigate('/list')} style={{color: 'white',borderRadius:20,paddingLeft:15,paddingRight:15} }  startIcon={<FormatListBulletedRoundedIcon />}>List</Button> */}


      <Button variant="text" onClick={() => navigate('/list')} style={{color: 'white',borderRadius:20,paddingLeft:15,paddingRight:15} }  startIcon={<LocalActivityRoundedIcon />}>Events</Button>

      <Button variant="text" onClick={() => navigate('/plan')} style={{color: 'white',borderRadius:20} } startIcon={<CalendarMonthRoundedIcon />}>Schedule</Button>
  
  
      </Stack>

      <Link to="/" className="logo" style={{color:'white'}}>LOGO</Link>

      <Stack direction="row" spacing={3}alignItems="center">
        
      <Button variant="outlined" onClick={() => navigate('/about')} style={{color: 'white',borderRadius:20,borderColor: 'white', padding: '2px 15px'} } >About</Button>
          

      <AccountCircleRoundedIcon style={{color: 'white', fontSize: 30}} />
      </Stack>


    </Box>
  );
};

export default Header;

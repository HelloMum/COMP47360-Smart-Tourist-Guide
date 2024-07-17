import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import './Header.css';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Box, Button, Stack } from '@mui/material';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AddLocationRounded from '@mui/icons-material/AddLocationAltRounded';
import LocalActivityRoundedIcon from '@mui/icons-material/LocalActivityRounded';
import { NAVBAR_HEIGHT } from '../utils/constants';
import DateRangePicker from './DateRangePicker';
import { ListContext } from '../contexts/ListContext';
import AlertModal from './AlertModal';
import Logo from './Logo';

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { planData, selectedDates, setSelectedDates } = useContext(ListContext);
  const [alertOpen, setAlertOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const buttonStyle = (path) => ({
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

  const handlePlanClick = () => {
    if (!planData) {
      setAlertOpen(true);
    } else {
      navigate('/schedule');
    }
  };

  const handleDateChange = (dates: [moment.Moment | null, moment.Moment | null] | null) => {
    setSelectedDates(dates);
  };

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
        paddingRight: '2%',
        paddingLeft: '2%',
      }}
    >
      <Logo />

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
          onClick={handlePlanClick}
          style={buttonStyle('/schedule')}
          startIcon={<CalendarMonthRoundedIcon />}
        >
          Plan
        </Button>

        <DateRangePicker
          onDateChange={handleDateChange}
          value={selectedDates} 
        />
      </Stack>

      <Button
        variant="text"
        onClick={() => navigate('/dashboard')}
        style={{ minWidth: 'auto', padding: 0 }}
      >
      <AccountCircleRoundedIcon style={{ color: theme.palette.primary.dark, fontSize: 28 }} />
      </Button>

      <AlertModal
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        title="Warning"
        message="Please generate a schedule first."
      />
    </Box>
  );
};

export default Header;

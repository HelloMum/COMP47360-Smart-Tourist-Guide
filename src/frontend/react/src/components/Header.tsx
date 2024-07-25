import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import "./Header.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Box, Button, Stack, IconButton, useMediaQuery } from "@mui/material";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AddLocationRounded from "@mui/icons-material/AddLocationAltRounded";
import LocalActivityRoundedIcon from "@mui/icons-material/LocalActivityRounded";
import { NAVBAR_HEIGHT } from "../utils/constants";
import DateRangePicker from "./DateRangePicker";
import { ListContext } from "../contexts/ListContext";
import { useAuth } from "../contexts/AuthContext"; // Import useAuth
import AlertModal from "./AlertModal";
import Logo from "./Logo";
import LoginComponent from "./users/LoginComponent";
import RegisterComponent from "./users/RegisterComponent";
import LogoutComponent from "./users/AccountMenuComponent"; // Import LogoutComponent
import { useUpdateNavbarHeight } from '../utils/useResponsiveSizes';

const Header = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.only('lg'));
  const isXl = useMediaQuery(theme.breakpoints.only('xl'));
  useUpdateNavbarHeight();

  let spacing;
  if (isXs) {
    spacing = 1;
  } else if (isSm) {
    spacing = 1;
  } else if (isMd) {
    spacing = 3;
  } else if (isLg) {
    spacing = 3;
  } else if (isXl) {
    spacing = 3;
  }

  const navigate = useNavigate();
  const location = useLocation();
  const { planData, selectedDates, setSelectedDates } = useContext(ListContext);
  const [alertOpen, setAlertOpen] = useState(false);

  // ----------------------- Login modal Start -----------------------
  const [loginOpen, setLoginOpen] = useState(false);
  const { isLoggedIn } = useAuth(); // Use the context
  const [isLoginMode, setIsLoginMode] = useState(true);

  const isToken = Boolean(localStorage.getItem("token"));
  // ----------------------- Login modal End -----------------------

  const isActive = (path) => location.pathname === path;

  const buttonStyle = (path) => ({
    color: theme.palette.primary.dark,
    borderColor: isActive(path) && !isXs ? theme.palette.primary.main : "transparent",
    backgroundColor: isXs && isActive(path) ? '#ffebbb' : 'transparent',
    borderRadius: 20,
    padding: "3px 15px",
    fontSize: "0.875rem",
    height: { xs: '24px', sm: "24px", md: '24px' },
    borderWidth:  '1px',
    borderStyle: "solid",
    transition: "border-color 0.2s ease-in-out",
  });

  const handlePlanClick = () => {
    if (!planData) {
      setAlertOpen(true);
    } else {
      navigate("/schedule");
    }
  };

  const handleDateChange = (
    dates: [moment.Moment | null, moment.Moment | null] | null
  ) => {
    setSelectedDates(dates);
  };

  // ----------------------- Login modal Start -----------------------
  const handleAvatarClick = () => {
    if (!isLoggedIn) {
      setLoginOpen(true);
    }
  };

  const handleSwitch = () => {
    setIsLoginMode(!isLoginMode);
  };
  // ----------------------- Login modal End -----------------------

  return (
    <Box
      className="header"
      sx={{
        height: NAVBAR_HEIGHT,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
        paddingRight: { xs: "2%", sm: "0%", md: "0%" },
        paddingLeft: { xs: "2%", sm: "0%", md: "0%"  },
      }}
    >

      <Stack direction="column" sx={{ width: "100%", height: '100%' }}>
        <Stack 
          direction="row" 
          justifyContent="space-between" 
          sx={{ 
            width: "100%", 
              height: '45px', 
                backgroundColor: { xs: 'rgba(250, 166, 63, 1)', sm: "white" },
                  paddingX: '2%' }}>

          <Logo />
          <Stack direction="row" spacing={spacing} alignItems="center">
            <Stack
              direction="row"
              spacing={spacing}
              alignItems="center"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Button
                variant="text"
                onClick={() => navigate("/spots")}
                style={buttonStyle("/spots")}
                startIcon={<AddLocationRounded />}
              >
                SPOTS
              </Button>
              <Button
                variant="text"
                onClick={() => navigate("/events")}
                style={buttonStyle("/events")}
                startIcon={<LocalActivityRoundedIcon />}
              >
                Events
              </Button>
              <Button
                variant="text"
                onClick={handlePlanClick}
                style={buttonStyle("/schedule")}
                startIcon={<CalendarMonthRoundedIcon />}
              >
                Plan
              </Button>
            </Stack>
            <Box sx={{ display: { xs: "block", sm: "block" } }}>
              <DateRangePicker
                onDateChange={handleDateChange}
                value={selectedDates}
              />
            </Box>
          </Stack>










          {/* ----------------------- Login modal Start ----------------------- */}
        


            {/* icon */}
          <IconButton id="avatarButton" onClick={handleAvatarClick}>
                <AccountCircleRoundedIcon
                  sx={{
                    color: { xs: "white", sm: theme.palette.primary.dark },
                    fontSize: 28,
                  }}
                />
              </IconButton>

            {/* logout */}
            {isLoggedIn&&
              <LogoutComponent /> // Show LogoutComponent if the user is logged in
                           
           }


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
        



          {/* ----------------------- Login modal End ----------------------- */}











          <AlertModal
            open={alertOpen}
            onClose={() => setAlertOpen(false)}
            title="Warning"
            message="Please generate a plan first."
          />
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-around"
          sx={{
            display: { xs: "block", sm: "none" },
            marginTop: "5px",
            width: "100% ",
            backgroundColor: "white",
          }}
        >
          <Button
            variant="text"
            onClick={() => navigate("/spots")}
            style={{
              ...buttonStyle("/spots"),
              fontSize: 13,
              marginLeft: "15vw",
            }}
            alignItems="center"
            startIcon={<AddLocationRounded />}
          >
            SPOTS
          </Button>
          <Button
            variant="text"
            onClick={() => navigate("/events")}
            style={{ ...buttonStyle("/events"), fontSize: 13 }}
            startIcon={<LocalActivityRoundedIcon />}
          >
            Events
          </Button>
          <Button
            variant="text"
            onClick={handlePlanClick}
            style={{ ...buttonStyle("/schedule"), fontSize: 13 }}
            startIcon={<CalendarMonthRoundedIcon />}
          >
            Plan
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
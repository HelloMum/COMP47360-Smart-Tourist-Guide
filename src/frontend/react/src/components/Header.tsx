import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import "./Header.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Box, Button, Stack, IconButton } from "@mui/material";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AddLocationRounded from "@mui/icons-material/AddLocationAltRounded";
import LocalActivityRoundedIcon from "@mui/icons-material/LocalActivityRounded";
import { NAVBAR_HEIGHT } from "../utils/constants";
import DateRangePicker from "./DateRangePicker";
import { ListContext } from "../contexts/ListContext";
import AlertModal from "./AlertModal";
import Logo from "./Logo";
import LoginComponent from "./users/LoginComponent";
import RegisterComponent from "./users/RegisterComponent";
import LogoutComponent from "./users/AccountMenuComponent"; // Import LogoutComponent

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { planData, selectedDates, setSelectedDates } = useContext(ListContext);
  const [alertOpen, setAlertOpen] = useState(false);

  // ----------------------- Login modal Start -----------------------
  const [loginOpen, setLoginOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const isLoggedIn = Boolean(localStorage.getItem("token"));
  // ----------------------- Login modal End -----------------------

  const isActive = (path) => location.pathname === path;

  const buttonStyle = (path) => ({
    color: theme.palette.primary.dark,
    borderColor: isActive(path) ? theme.palette.primary.main : "transparent",
    borderRadius: 20,
    padding: "5px 15px",
    fontSize: "0.875rem",
    height: "32px",
    borderWidth: "1px",
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
      style={{
        backgroundColor: "white",
        height: NAVBAR_HEIGHT,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
        paddingRight: "2%",
        paddingLeft: "2%",
      }}
    >
      <Logo />

      <Stack direction="row" spacing={3} alignItems="center">
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

        <DateRangePicker
          onDateChange={handleDateChange}
          value={selectedDates}
        />
      </Stack>

      {/* ----------------------- Login modal Start ----------------------- */}
      <Box position="relative">
        {isLoggedIn ? (
          <LogoutComponent /> // Show LogoutComponent if the user is logged in
        ) : (
          <IconButton onClick={handleAvatarClick}>
            <AccountCircleRoundedIcon
              style={{ color: theme.palette.primary.dark, fontSize: 28 }}
            />
          </IconButton>
        )}
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
      </Box>
      {/* ----------------------- Login modal End ----------------------- */}

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

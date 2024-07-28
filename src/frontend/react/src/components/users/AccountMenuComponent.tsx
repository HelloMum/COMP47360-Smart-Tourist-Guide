import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useTheme } from "@mui/material/styles";

import { useAuth } from "../../contexts/AuthContext"; // Import useAuth

const LogoutComponent: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { isLoggedIn, setIsLoggedIn } = useAuth(); // Use the context

  const theme = useTheme();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // Set the context
    navigate("/"); // Redirect to the main page
    handleMenuClose();
  };

  const handleDashboard = (section: string) => {
    navigate(`/dashboard?section=${section}`); // Redirect to the dashboard page with section
    handleMenuClose();
  };

  return (
    <>
      <IconButton onClick={handleMenuClick}>
        <img
          src="images/avatar-loged.png"
          alt="Profile"
          style={{ width: 28, height: 28, borderRadius: '50%' }} 
        />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        sx={{ 
          '& .MuiPaper-root': { 
            boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.4)',
            width:'100px',
          } 
        }}
      >
        <MenuItem
          onClick={() => handleDashboard('account')}
          sx={{
            fontSize: '13px',
            my: 0,
            height: { xs: '15px', sm: 20, md: 20, lg: 20 },
            '&:hover': {
              backgroundColor: 'transparent', // Remove the grey hover color
            },
          }}
        >
          My Account
        </MenuItem>
        <Divider sx={{ mx: 0.3, borderColor: '#dfdfdf' }} />
        <MenuItem
          onClick={() => handleDashboard('savedSchedule')}
          sx={{
            fontSize: '13px',
            my: 0,
            height: {  xs: '15px', sm: 20, md: 20, lg: 20 },
            '&:hover': {
              backgroundColor: 'transparent', // Remove the grey hover color
            },
          }}
        >
          My Plans
        </MenuItem>
        <Divider sx={{ mx: 0.3, borderColor: '#dfdfdf' }} />
        <MenuItem
          onClick={handleLogout}
          sx={{
            fontSize: '13px',
            my: 0,
            height: { xs: '15px', sm: 20, md: 20, lg: 20 },
            '&:hover': {
              backgroundColor: 'transparent', // Remove the grey hover color
            },
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default LogoutComponent;

// Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import './Header.css';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';


const Header: React.FC = () => {
  const theme = useTheme();

  return (
    <header className="header" style={{ backgroundColor:theme.palette.primary.main }}>
      <nav className="nav-left">
        <Link to="/activity">Activity</Link>
        <Link to="/list">List</Link>
        <Link to="/plan">Plan</Link>
      </nav>
      <Link to="/" className="logo" style={{color:'white'}}>LOGO</Link>
      <nav className="nav-right" >
        <Link to="/about">About</Link>
        <AccountCircleRoundedIcon  style={{color:'white'}} sx={{ mr: 10 }} />
      </nav>


    </header>
  );
};

export default Header;

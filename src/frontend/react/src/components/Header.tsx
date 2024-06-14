import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <nav className="nav-left">
        <Link to="/activity">Activity</Link>
        <Link to="/list">List</Link>
        <Link to="/plan">Plan</Link>
      </nav>
      <Link to="/" className="logo">LOGO</Link>
      <nav className="nav-right">
        <Link to="/about">About</Link>
      </nav>
    </header>
  );
};

export default Header;

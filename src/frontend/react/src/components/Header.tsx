import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <nav>
        <Link to="/activity">Activity</Link>
        <Link to="/list">List</Link>
        <Link to="/plan">Plan</Link>
      </nav>
      <Link to="/" className="logo">LOGO</Link>
    </header>
  );
};

export default Header;

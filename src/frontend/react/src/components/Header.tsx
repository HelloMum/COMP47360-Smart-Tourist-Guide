import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

const Header: React.FC = () => {
  return (
    <nav className="header">
      <img src="/logo.jpg" alt="Logo" className="logo" />
      <ul>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/schedule">Schedule</Link></li>
        <li><Link to="/map">Map</Link></li>
      </ul>
    </nav>
  );
};

export default Header;

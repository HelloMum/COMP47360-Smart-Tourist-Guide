/* eslint-disable */


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/home/Home2';
import Spots from './pages/spots/Spots';
import Events from './pages/events/Events';
import Schedule from './pages/schedule/Schedule';
import About from './pages/about/About';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; 
import 'antd/dist/antd.css';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
    <Router>
    <div className="app-container"> 
      <Header />
      <Routes>
        <Route path="/" element={<HomePage/>} />

        {/* `*` Represents all paths beginning with `/activity/` */}
        <Route path="/spots/*" element={<Spots />} />
        <Route path="/events" element={<Events />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/about" element={<About />} />
      </Routes></div>
    </Router>
    
    </ThemeProvider>
  );
};

export default App;

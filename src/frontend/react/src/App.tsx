import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HeaderHome from './components/Header_Home';
import Login from "./pages/user/LoginForm"; {/* These are for debugging purposes */}
import Register from "./pages/user/RegistrationForm"; {/* These are for debugging purposes */}
import HomePage from './pages/home/Home';
import Spots from './pages/spots/Spots';
import Events from './pages/events/Events';
import Schedule from './pages/schedule/Schedule';
import About from './pages/about/About';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './utils/theme';
import 'antd/dist/antd.css';
import { ListProvider } from './contexts/ListContext';
import Header_Home from './components/Header_Home';

const App: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<[moment.Moment | null, moment.Moment | null] | null>(null);

  const handleDateChange = (dates: [moment.Moment | null, moment.Moment | null] | null) => {
    setSelectedDates(dates);
  };

  const location = useLocation();

  const renderHeader = () => {
    if (location.pathname === '/') {
      return <Header_Home onDateChange={handleDateChange} />;
    } else {
      return <Header onDateChange={handleDateChange} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ListProvider>
      <div className="app-container" style={{ overflow: 'auto' }}>

          {renderHeader()}
          <Routes>
            <Route path="/" element={<HomePage onDateChange={handleDateChange} />} />
            <Route path="/spots/*" element={<Spots selectedDates={selectedDates} />} />
            <Route path="/events" element={<Events selectedDates={selectedDates} />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/about" element={<About />} />
            <Route path="/loginpage" element={<Login />} /> {/* These are for debugging purposes */}
            <Route path="/registerpage" element={<Register />} /> {/* These are for debugging purposes, will be removed */}
          </Routes>
        </div>
      </ListProvider>
    </ThemeProvider>
  );
};

const AppWrapper: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;

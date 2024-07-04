import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/home/Home';
import Spots from './pages/spots/Spots';
import Events from './pages/events/Events';
import Schedule from './pages/schedule/Schedule';
import About from './pages/about/About';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; 
import 'antd/dist/antd.css';
import { ListProvider } from './contexts/ListContext';

const App: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<[moment.Moment | null, moment.Moment | null] | null>(null);

  const handleDateChange = (dates: [moment.Moment | null, moment.Moment | null] | null) => {
    setSelectedDates(dates);
  };

  return (
    <ThemeProvider theme={theme}>
      <ListProvider> 
        <Router>
          <div className="app-container"> 
            <Header onDateChange={handleDateChange} />
            <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/spots/*" element={<Spots selectedDates={selectedDates} />} />
              <Route path="/events" element={<Events selectedDates={selectedDates} />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </ListProvider>
    </ThemeProvider>
  );
};

export default App;

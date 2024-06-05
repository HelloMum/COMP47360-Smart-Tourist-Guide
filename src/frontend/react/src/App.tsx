import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import Events from './components/Events';
import Schedule from './components/Schedule';
import Map from './components/Map';
import Header from './components/Header';
import './App.css';

const googleMapsApiKey = "AIzaSyCY1DTFE2IGNPcc54cRmnnSkLvq8VfpMMo";

const App: React.FC = () => {
  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/events" element={<Events />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/map" element={<Map />} />
          </Routes>
        </div>
      </Router>
    </LoadScript>
  );
}

export default App;

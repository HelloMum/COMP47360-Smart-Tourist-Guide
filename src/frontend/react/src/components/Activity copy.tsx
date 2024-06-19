import React from 'react';
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import './Activity.css';
import TouristAttractions from './TouristAttractions';
import Events from './Events';
import Map from './Map';

const Activity: React.FC = () => {
  return (
    <div className="activity">
      <div className="activity-list">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h5 style={{ margin: 0 }}>
          <Link to="/activity/tourist-attractions">Tourist Attractions</Link>
        </h5>
        <h5 style={{ margin: 0 }}>
          <Link to="/activity/events">Events</Link>
        </h5>
      </div>

        <Routes>
          <Route path="/" element={<Navigate to="/activity/tourist-attractions" />} />
          <Route path="tourist-attractions" element={<TouristAttractions />} />
          <Route path="events" element={<Events />} />
        </Routes>
      </div>
      <div className="map">
        <Map />
      </div>
    </div>
  );
};

export default Activity;

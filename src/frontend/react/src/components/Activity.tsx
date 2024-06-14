import React from 'react';
import Map from './Map';
import './Activity.css';

const Activity: React.FC = () => {
  return (
    <div className="activity">
      <div className="activity-list">
        <h2>Tourist Attractions</h2>
        <h2>Events</h2>
      </div>
      <div className="map">
        <Map />
      </div>
    </div>
  );
};

export default Activity;

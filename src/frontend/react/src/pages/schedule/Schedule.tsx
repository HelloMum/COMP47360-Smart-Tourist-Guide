import React from 'react';
import Map from '../../components/Map';
import './schedule.css';

const Schedule: React.FC = () => {
  return (
    <div className="plan">
      <div className="plan-content">
        <h2>Plan</h2>
      </div>
      <div className="map">
        <Map />
      </div>
    </div>
  );
};

export default Schedule;

import React from 'react';
import Map from './Map';
import './Plan.css';

const Plan: React.FC = () => {
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

export default Plan;

import React from 'react';
import Map from '../../components/events/Map_Events';
import './schedule.css';
import { LEFT_PADDING, LEFT_WIDTH, NAVBAR_HEIGHT } from '../../constants';

const Schedule: React.FC = () => {
  return (
    <div className="schedule" style={{ display: 'flex' }}>

<div
        className="left"
        style={{
          width: LEFT_WIDTH,
          padding: LEFT_PADDING,
          marginTop: NAVBAR_HEIGHT,
          height: `calc(100vh - ${NAVBAR_HEIGHT})`,
          overflowY: 'auto',
        }}
      >
        <h2>Plan</h2>
      </div>
      <div className="map" style={{ position: 'fixed', top: NAVBAR_HEIGHT, right: 0, width: `calc(100% - ${LEFT_WIDTH})`, height: `calc(100vh - ${NAVBAR_HEIGHT})` }}>
        <Map  events={[]}/>
      </div>
    </div>
  );
};

export default Schedule;

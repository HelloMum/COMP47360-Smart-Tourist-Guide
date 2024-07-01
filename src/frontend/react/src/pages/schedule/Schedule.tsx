import React, { useState } from 'react';
import Map from '../../components/events/Map_Events';
import './schedule.css';
import { LEFT_PADDING, LEFT_WIDTH, NAVBAR_HEIGHT } from '../../constants';
import Btn_List from '../../components/Btn_List';
import List from '../../components/list/List';

const Schedule: React.FC = () => {
  const [showList, setShowList] = useState(false); 

  const handleBtnListClick = () => {
    setShowList(true);
  };

  const handleCloseList = () => {
    setShowList(false);
  };

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
        <Map events={[]} />
      </div>

     <Btn_List onClick={handleBtnListClick} />
      {showList && <List onClose={handleCloseList} />}
    </div>
  );
};

export default Schedule;

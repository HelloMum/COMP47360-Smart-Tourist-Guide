import React from 'react';
import { useNavigate } from 'react-router-dom';

const Schedule: React.FC = () => {
  const navigate = useNavigate();

  const goToMap = () => {
    navigate('/map');
  };

  return (
    <div>
      <h1>Schedule</h1>
      {/* 日程规划逻辑 */}
      <button onClick={goToMap}>Go to Map</button>
    </div>
  );
};

export default Schedule;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button} from 'antd';

const Schedule: React.FC = () => {
  const navigate = useNavigate();

  const goToMap = () => {
    navigate('/map');
  };

  return (
    <div>
      <h1>Schedule</h1>
   
      <Button type="primary" onClick={goToMap}>Go to Map</Button>

    </div>
  );
};

export default Schedule;

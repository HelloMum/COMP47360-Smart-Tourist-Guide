import React, { useContext, useState } from 'react';
import Map from '../../components/events/Map_Events';
import './schedule.css';
import { LEFT_PADDING, LEFT_WIDTH, NAVBAR_HEIGHT } from '../../constants';
import Btn_List from '../../components/list/Btn_List';
import List from '../../components/list/List';
import { ListContext } from '../../contexts/ListContext';
import Btn_Close_Left from '../../components/Btn_Close_Left';
import ScheduleCard from '../../components/schedule/ScheduleCard';
import { Typography, Button, ButtonGroup } from '@mui/material';
import moment from 'moment';

const Schedule: React.FC = () => {
  const { showList, toggleList, closeList, isLeftPanelVisible, toggleLeftPanel, planData } = useContext(ListContext);
  const [currentDate, setCurrentDate] = useState(Object.keys(planData)[0]);

  const handleDateChange = (date: string) => {
    setCurrentDate(date);
  };

  const formatDate = (date: string) => {
    return moment(date).format('MM-DD');
  };

  return (
    <div className="schedule" style={{ display: 'flex' }}>
      {isLeftPanelVisible && (
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
          <ButtonGroup
            variant="text"
            color="primary"
            aria-label="contained primary button group"
            style={{ marginBottom: '16px' }}
          >
            {Object.keys(planData).map((date) => (
              <Button
                key={date}
                onClick={() => handleDateChange(date)}
                style={{
                  backgroundColor: date === currentDate ? '#1976d2' : '#eee',
                  color: date === currentDate ? '#ffffff' : '#1976d2',
                  borderRadius: '20px',
                  padding: '10px 20px',
                  margin: '5px',
                }}
              >
                {formatDate(date)}
              </Button>
            ))}
          </ButtonGroup>

          {planData[currentDate] && planData[currentDate].map((item) => (
            <ScheduleCard
              key={item.id}
              id={item.id}
              name={item.name}
              startTime={item.startTime}
              endTime={item.endTime}
              latitude={item.latitude}
              longitude={item.longitude}
              busyness={item.busyness}
              category={item.category}
              address={item.address}
              website={item.website}
              description={item.description}
              rating={item.rating}
              attraction_phone_number={item.attraction_phone_number}
              international_phone_number={item.international_phone_number}
              event_image={item.event_image}
              event={item.event}
              free={item.free}
              userRatings_total={item.userRatings_total}
            />
          ))}
        </div>
      )}
      <div
        className="map"
        style={{
          position: 'fixed',
          top: NAVBAR_HEIGHT,
          right: 0,
          width: isLeftPanelVisible ? `calc(100% - ${LEFT_WIDTH})` : '100%',
          height: `calc(100vh - ${NAVBAR_HEIGHT})`,
        }}
      >
        <Map events={[]} />
      </div>

      <Btn_List onClick={toggleList} />
      {showList && <List onClose={closeList} />}

      <Btn_Close_Left onClick={toggleLeftPanel} />
    </div>
  );
};

export default Schedule;

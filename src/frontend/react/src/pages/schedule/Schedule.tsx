import React, { useContext, useState, useEffect } from 'react';
import './schedule.css';
import { LEFT_PADDING, LEFT_WIDTH, NAVBAR_HEIGHT } from '../../constants';
import Btn_List from '../../components/list/Btn_List';
import List from '../../components/list/List';
import { ListContext } from '../../contexts/ListContext';
import Btn_Close_Left from '../../components/Btn_Close_Left';
import ScheduleCard from '../../components/schedule/ScheduleCard';
import { Typography, Button, ButtonGroup } from '@mui/material';
import moment from 'moment';
import Map_Schedule from '../../components/schedule/Map_Schedule';

const Schedule = () => {
  const { showList, toggleList, closeList, isLeftPanelVisible, toggleLeftPanel, planData } = useContext(ListContext);
  const initialDate = planData ? Object.keys(planData)[0] : null;
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [events, setEvents] = useState(initialDate ? planData[initialDate] : []);

  useEffect(() => {
    if (currentDate) {
      setEvents(planData[currentDate] || []);
    }
  }, [planData, currentDate]);

  const handleDateChange = (date) => {
    setCurrentDate(date);
    setEvents(planData[date] || []);
  };

  const formatDate = (date) => {
    return moment(date).format('MM-DD');
  };

  if (!planData) {
    return <div>Loading...</div>;
  }

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
                  backgroundColor: date === currentDate ? '#ffc147' : '#eee',
                  color: date === currentDate ? '#000' : '#888',
                  borderRadius: '4px',
                  
                  padding: '6px 8px',
                  margin: '5px',
                }}
              >
                {formatDate(date)}
              </Button>
            ))}
          </ButtonGroup>

          {events.map((item) => (
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
        <Map_Schedule events={events} />
      </div>

      <Btn_List onClick={toggleList} />
      {showList && <List onClose={closeList} />}

      <Btn_Close_Left onClick={toggleLeftPanel} />
    </div>
  );
};

export default Schedule;

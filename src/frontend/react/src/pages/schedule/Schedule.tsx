import React, { useContext, useState, useEffect } from 'react';
import './schedule.css';
import { LEFT_PADDING, LEFT_WIDTH, NAVBAR_HEIGHT } from '../../constants';
import Btn_List from '../../components/list/Btn_List';
import List from '../../components/list/List';
import { ListContext } from '../../contexts/ListContext';
import Btn_Close_Left from '../../components/Btn_Close_Left';
import ScheduleCard from '../../components/schedule/ScheduleCard';
import { Typography, Button, Stack, Box } from '@mui/material';
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
    return moment(date).format('MMMM Do YYYY');
  };

  const formatDayOfWeek = (date) => {
    return moment(date).format('ddd');
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
            padding: '1vw 2vw',
            marginTop: NAVBAR_HEIGHT,
            height: `calc(100vh - ${NAVBAR_HEIGHT})`,
            overflowY: 'auto',
          }}
        >
          {/* full date */}
          <Box mb={2}>
            <Typography variant="h6"  align="left"   sx={{
          fontFamily: '"Lexend", sans-serif'
        }}>
              {moment(currentDate).format('dddd, Do MMMM YYYY')}
            </Typography>
          </Box>

          {/* date btn */}
          <Stack direction="row" spacing={1} mb={5}>
            {Object.keys(planData).map((date) => (
              <Button
                key={date}
                onClick={() => handleDateChange(date)}
                style={{
                  backgroundColor: date === currentDate ? 'orange' : '#f8f8f8',
                  color: date === currentDate ? '#fff' : '#888',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  minWidth: '60px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
               
                  
                }}
              >
                <Typography variant="caption" style={{ fontWeight: 'normal',   fontFamily:'Lexend', }}>
                  {formatDayOfWeek(date)}
                </Typography>
                <Typography variant="body1" style={{ fontWeight: '400',   fontFamily:'Lexend', fontSize: '1.5em' }}>
                  {moment(date).format('DD')}
                </Typography>
              </Button>
            ))}
          </Stack>

          {/* <h2 style={{ marginLeft: 6, marginTop: 5 ,marginBottom:25}}>
            {events.length} activit{events.length !== 1 ? 'ies' : 'y'}
          </h2> */}

          {events.map((item, index) => (
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
              index={index + 1}
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

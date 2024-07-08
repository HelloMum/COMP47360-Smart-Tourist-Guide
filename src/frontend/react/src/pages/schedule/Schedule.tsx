import React, { useContext, useState, useEffect } from 'react';
import './schedule.css';
import { LEFT_PADDING, LEFT_WIDTH, NAVBAR_HEIGHT } from '../../constants';
import Btn_List from '../../components/list/Btn_List';
import List from '../../components/list/List';
import { ListContext } from '../../contexts/ListContext';
import Btn_Close_Left from '../../components/Btn_Close_Left';
import ScheduleCard from '../../components/schedule/ScheduleCard';
import { Typography, Button, Stack, Box, CircularProgress } from '@mui/material';
import moment from 'moment';
import Map_Schedule from '../../components/schedule/Map_Schedule';

const Schedule = () => {
  const { showList, toggleList, closeList, isLeftPanelVisible, toggleLeftPanel, planData } = useContext(ListContext);
  const initialDate = planData ? Object.keys(planData)[0] : null;
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [events, setEvents] = useState(initialDate ? planData[initialDate] : []);
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);

  useEffect(() => {
    if (currentDate) {
      setEvents(planData[currentDate] || []);
      fetchWeather(currentDate);
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

  const fetchWeather = async (date) => {
    setLoadingWeather(true);
    try {
      const response = await fetch(`/api/weather/by_date/${date}`);
      const data = await response.json();
      setWeather(data[0]); 
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
    }
    setLoadingWeather(false);
  };

  if (!planData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="schedule" style={{ display: 'flex', flexDirection: 'column' }}>
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
          <Box mb={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" align="left" sx={{ fontFamily: '"Lexend", sans-serif' }}>
                {moment(currentDate).format('dddd, Do MMMM YYYY')}
              </Typography>

              {/* Weather Info */}
              <Box display="flex" alignItems="center" 

              // sx={{boxShadow:1,borderRadius:2,padding:'5px 10px'}}
              
              >
                {loadingWeather ? (
                  <CircularProgress size={24} />
                ) : weather ? (
                  <Box display="flex" alignItems="center">
                    <Typography variant="h6" style={{ fontWeight: '300', fontFamily: 'Lexend', marginRight: '0px',fontSize:'20px' }}>
                      {weather.tempDay}°C
                    </Typography>
                    <img
                      src={`http://openweathermap.org/img/wn/${weather.weather_icon}@2x.png`}
                      alt={weather.weather_description}
                      style={{ marginRight: '0px',height:'70px' }}
                    />
                    <Box>
                      <Typography variant="body2" style={{ fontWeight: '250', fontFamily: 'Lexend',fontSize:'12px' }}>
                        Wind: {weather.speed.toFixed(1)} m/s
                      </Typography>
                      <Typography variant="body2" style={{ fontWeight: '250', fontFamily: 'Lexend',fontSize:'12px'  }}>
                        Humidity: {weather.humidity}%
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Typography variant="body2" style={{ fontWeight: 'normal', fontFamily: 'Lexend' }}>
                    No weather data
                  </Typography>
                )}
              </Box>
            </Stack>
          </Box>

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
                <Typography variant="caption" style={{ fontWeight: 'normal', fontFamily: 'Lexend' }}>
                  {formatDayOfWeek(date)}
                </Typography>
                <Typography variant="body1" style={{ fontWeight: '400', fontFamily: 'Lexend', fontSize: '1.5em' }}>
                  {moment(date).format('DD')}
                </Typography>
              </Button>
            ))}
          </Stack>

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

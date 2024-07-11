import React, { useContext, useState, useEffect } from 'react';
import './schedule.css';
import { LEFT_PADDING, LEFT_WIDTH, NAVBAR_HEIGHT } from '../../utils/constants';
import Btn_List from '../../components/list/Btn_List';
import List from '../../components/list/List';
import { ListContext } from '../../contexts/ListContext';
import Btn_Close_Left from '../../components/Btn_Close_Left';
import ScheduleCard from '../../components/schedule/ScheduleCard';
import { Typography, Button, Stack, Box, CircularProgress } from '@mui/material';
import moment from 'moment';
import Map_Schedule from '../../components/schedule/Map_Schedule';

const Schedule: React.FC = () => {
  const { showList, toggleList, closeList, isLeftPanelVisible, toggleLeftPanel, planData } = useContext(ListContext);
  const initialDate = planData ? Object.keys(planData)[0] : null;
  const [currentDate, setCurrentDate] = useState<string | null>(initialDate);
  const [events, setEvents] = useState<any[]>(initialDate ? planData[initialDate] : []);
  const [weather, setWeather] = useState<any | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [busynessData, setBusynessData] = useState<any | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    if (currentDate) {
      setEvents(planData[currentDate] || []);
      fetchWeather(currentDate);
    }
  }, [planData, currentDate]);

  const handleDateChange = (date: string) => {
    setCurrentDate(date);
    setEvents(planData[date] || []);
  };

  const handleStartTimeClick = async (startTime: string) => {
    setSelectedTime(startTime);
    const date = moment(startTime).format('YYYY-MM-DD');
    await fetchBusynessData(date);
  };

  const formatDayOfWeek = (date: string) => {
    return moment(date).format('ddd');
  };

  const fetchWeather = async (date: string) => {
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

  const fetchBusynessData = async (date: string) => {
    try {
      const response = await fetch(`/api/busyness/predict_all_sort_by_date_range?startDate=${date}&endDate=${date}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: date,
          endDate: date,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('busyness data', data);

      setBusynessData(data);
    } catch (error) {
      console.error('Failed to fetch busyness data:', error);
    }
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
            padding: '0.5vw 2vw 0vw 2vw',
            marginTop: NAVBAR_HEIGHT,
            height: `calc(100vh - ${NAVBAR_HEIGHT})`,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box mb={0}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" align="left" sx={{ fontFamily: '"Lexend", sans-serif' }}>
                {moment(currentDate).format('dddd, Do MMMM YYYY')}
              </Typography>

              <Box display="flex" alignItems="center" style={{ minHeight: '70px' }}>
                {loadingWeather ? (
                  <CircularProgress size={24} />
                ) : weather ? (
                  <Box display="flex" alignItems="center">
                    <Typography variant="h6" style={{ fontWeight: 300, fontFamily: 'Lexend', marginRight: 0, fontSize: '20px' }}>
                      {weather.tempDay}°C
                    </Typography>
                    <img
                      src={`http://openweathermap.org/img/wn/${weather.weather_icon}@2x.png`}
                      alt={weather.weather_description}
                      style={{ marginRight: 0, height: '70px' }}
                    />
                    <Box>
                      <Typography variant="body2" style={{ fontWeight: 250, fontFamily: 'Lexend', fontSize: '12px' }}>
                        Wind: {weather.speed.toFixed(1)} m/s
                      </Typography>
                      <Typography variant="body2" style={{ fontWeight: 250, fontFamily: 'Lexend', fontSize: '12px' }}>
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

          <Stack direction="row" spacing={1} mb={3}>
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
                  minHeight: '65px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="caption" style={{ fontWeight: 'normal', fontFamily: 'Lexend', lineHeight: 1 }}>
                  {formatDayOfWeek(date)}
                </Typography>
                <Typography variant="body1" style={{ fontWeight: 400, fontFamily: 'Lexend', fontSize: '1.5em', lineHeight: 1 }}>
                  {moment(date).format('DD')}
                </Typography>
              </Button>
            ))}
          </Stack>

          <div
            className="card-container"
            style={{
              flexGrow: 1,
              overflowY: 'scroll',
              msOverflowStyle: 'none', // IE and Edge
              scrollbarWidth: 'none', // Firefox
            }}
          >
            <style>
              {`
                .card-container::-webkit-scrollbar {
                  display: none; // Hide scrollbar for Chrome, Safari, and Opera
                }
              `}
            </style>
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
                onStartTimeClick={handleStartTimeClick} // Pass the callback function
              />
            ))}
          </div>
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
        <Map_Schedule events={events} busynessData={busynessData} selectedTime={selectedTime} />
      </div>

      <Btn_List onClick={toggleList} />
      {showList && <List onClose={closeList} />}

      <Btn_Close_Left onClick={toggleLeftPanel} />
    </div>
  );
};

export default Schedule;

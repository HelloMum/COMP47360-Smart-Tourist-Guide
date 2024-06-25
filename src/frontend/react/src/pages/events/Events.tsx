import React, { useEffect, useState } from 'react';
import Map from '../../components/Map';
import './events.css';
import EventCard from '../../components/EventCard';
import Searchbar from '../../components/Searchbar';
import { Stack } from '@mui/material';
import Switch from '../../components/Switch_Events';
import FilterCheckbox from '../../components/FilterCheckbox_Events';
import { LEFT_WIDTH, NAVBAR_HEIGHT } from '../../constants';
import eventsData from '../../data/events.json';
import Sort_Events from '../../components/Sort_Events';

const Events: React.FC = () => {
  const [events, setEvents] = useState(eventsData);

  useEffect(() => {
    fetch('http://localhost:8080/events/all')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data);
        setEvents(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="list" style={{ display: 'flex' }}>
      
      <div
        className="left"
        style={{
          width: LEFT_WIDTH,
          padding: '30px',
          marginTop: NAVBAR_HEIGHT,
          height: `calc(100vh - ${NAVBAR_HEIGHT})`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >


         {/* -------------- search bar --------------------*/}
        <Stack direction="row" justifyContent="center">
          <Searchbar />
        </Stack>


        {/* -------------- filter & sort -------------------*/}
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ width: '100%', marginY: 2 }}>
          <FilterCheckbox />
          <Switch />
          <Sort_Events />
        </Stack>


        {/* -------------- event cards ---------------------*/}
        <div className="event-card-container" style={{ flexGrow: 1, overflowY: 'auto' }}>
          <Stack>
            {events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </Stack>
        </div>
      </div>


      {/* --------------- map on the right ------------------*/}      
      <div className="map" style={{ position: 'fixed', top: NAVBAR_HEIGHT, right: 0, width: `calc(100% - ${LEFT_WIDTH})`, height: `calc(100vh - ${NAVBAR_HEIGHT})` }}>
  <Map events={events} />
</div>
    </div>
  );
};

export default Events;

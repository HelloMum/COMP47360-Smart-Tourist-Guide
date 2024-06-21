import React, { useState } from 'react';
import Map from '../../components/Map';
import './events.css';
import EventCard from '../../components/EventCard';
import Searchbar from '../../components/Searchbar';
import { Stack } from '@mui/material';
import Select from '../../components/Sort';
import Switch from '../../components/Switch';
import FilterCheckbox from '../../components/FilterCheckbox';
import { LEFT_PADDING, LEFT_WIDTH, NAVBAR_HEIGHT } from '../../constants';


import eventsData from '../../data/events.json';

const Events: React.FC = () => {

  const [events] = useState(eventsData);

  return (
    <div className="list" style={{ display: 'flex' }}>
      <div
        className="left"
        style={{
          width: LEFT_WIDTH,
          padding: '30px',
          marginTop: NAVBAR_HEIGHT,
          height: `calc(100vh - ${NAVBAR_HEIGHT})`,
          overflowY: 'auto',
        }}
      >
        <Stack direction="row" justifyContent="center">
          <Searchbar />
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ width: '100%', marginY: 2 }}>
          <FilterCheckbox />
          <Switch />
          <Select />
        </Stack>

        <Stack>
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </Stack>
      </div>

      <div className="map" style={{ position: 'fixed', top: NAVBAR_HEIGHT, right: 0, width: `calc(100% - ${LEFT_WIDTH})`, height: `calc(100vh - ${NAVBAR_HEIGHT})` }}>
        <Map />
      </div>
    </div>
  );
};

export default Events;

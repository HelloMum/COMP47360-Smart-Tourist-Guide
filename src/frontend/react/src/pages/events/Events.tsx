import React from 'react';
import Map from '../../components/Map';
import './events.css';
import EventCard from '../../components/EventCard';
import Searchbar from '../../components/Searchbar';
import { Stack } from '@mui/material';
import Select from '../../components/Sort';
import Switch from '../../components/Switch';
import FilterCheckbox from '../../components/FilterCheckbox';
import { LEFT_PADDING, LEFT_WIDTH, NAVBAR_HEIGHT } from '../../constants';

const Events: React.FC = () => {
  return (
    <div className="list" style={{ display: 'flex' }}>
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
          <Stack direction="row" justifyContent="center">
        <Searchbar />
      </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ width: '100%', marginTop: 1 }}>
          <FilterCheckbox />
          <Switch />
          <Select />
        </Stack>

        <Stack>
          <EventCard />
          <EventCard />
          <EventCard />
        </Stack>
      </div>

      <div className="map" style={{ position: 'fixed', top: NAVBAR_HEIGHT, right: 0, width: `calc(100% - ${LEFT_WIDTH})`, height: `calc(100vh - ${NAVBAR_HEIGHT})` }}>
        <Map />
      </div>
    </div>
  );
};

export default Events;

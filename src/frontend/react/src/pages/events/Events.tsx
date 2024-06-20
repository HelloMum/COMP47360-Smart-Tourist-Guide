import React from 'react';
import Map from '../../components/Map';
import './events.css';
import EventCard from '../../components/EventCard';
import Searchbar from '../../components/Searchbar';
import { Stack } from '@mui/material';
import Select from '../../components/Sort';
import Switch from '../../components/Switch';
import FilterCheckbox from '../../components/FilterCheckbox';


const Events: React.FC = () => {
  return (
    <div className="list">

      <div className="left">
    <Searchbar />

    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ width: '100%' ,marginTop:1}}>
      <FilterCheckbox/>
      <Switch/>
      <Select/>
    </Stack>
    
      <Stack >
        <EventCard/>
        <EventCard/>
        <EventCard/>
    

      </Stack>


      </div>
  
      <div className="map">
        <Map />
      </div>
    </div>
  );
};

export default Events;

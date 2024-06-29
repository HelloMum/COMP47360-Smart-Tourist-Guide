import React, { useEffect, useState } from 'react';
import Map from '../../components/Map_Events';
import './events.css';
import EventCard from '../../components/EventCard';
import Searchbar from '../../components/Searchbar';
import { Stack } from '@mui/material';
import Switch from '../../components/Switch_Events';
import FilterCheckbox from '../../components/FilterCheckbox_Events';
import { LEFT_WIDTH, NAVBAR_HEIGHT } from '../../constants';


const Events: React.FC = () => {
  const [events, setEvents] = useState([]);
  const [isFree, setIsFree] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchText, setSearchText] = useState('');

const [hoveredEventId, setHoveredEventId] = useState(null);  

  const fetchEvents = () => {
    let url = 'http://localhost:8080/events/all';
    const params = new URLSearchParams();

    if (isFree) {
      params.append('isFree', 'true');
    }

    if (selectedCategories.length > 0) {
      params.append('combined_categories', selectedCategories.join(','));
    }

    if (searchText) {
      params.append('name', searchText);
    }

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data);
        setEvents(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, [isFree, selectedCategories, searchText]);

  const handleSwitchChange = () => {
    setIsFree(!isFree);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(item => item !== category)
        : [...prev, category]
    );
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

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
          <Searchbar onSearch={handleSearch} />
        </Stack>

        {/* -------------- filter & sort -------------------*/}
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ width: '100%', marginY: 2 }}>
          <FilterCheckbox onChange={handleCategoryChange} selectedCategories={selectedCategories} />
          <Switch checked={isFree} onChange={handleSwitchChange} />
          {/* <Sort_Events /> */}
        </Stack>

        {/* -------------- event cards ---------------------*/}
        <div className="event-card-container" style={{ flexGrow: 1, overflowY: 'auto' }}>
          <Stack>
            {events.map(event => (
              <EventCard key={event.id} event={event} onMouseEnter={() => setHoveredEventId(event.id)}
              onMouseLeave={() => setHoveredEventId(null)}/>
            ))}
          </Stack>
        </div>
      </div>

      {/* --------------- map on the right ------------------*/}      
      <div className="map" style={{ position: 'fixed', top: NAVBAR_HEIGHT, right: 0, width: `calc(100% - ${LEFT_WIDTH})`, height: `calc(100vh - ${NAVBAR_HEIGHT})` }}>
        <Map events={events} hoveredEventId={hoveredEventId}/>
      </div>
    </div>
  );
};

export default Events;

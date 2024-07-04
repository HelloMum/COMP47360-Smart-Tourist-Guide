import React, { useEffect, useState, useContext } from 'react';
import Map from '../../components/events/Map_Events';
import './events.css';
import EventCard from '../../components/events/EventCard';
import Searchbar from '../../components/events/Searchbar';
import { Stack } from '@mui/material';
import Switch from '../../components/events/Switch_Events';
import FilterCheckbox from '../../components/events/FilterCheckbox_Events';
import { LEFT_WIDTH, NAVBAR_HEIGHT } from '../../constants';
import Btn_List from '../../components/list/Btn_List';
import List from '../../components/list/List';
import { ListContext } from '../../contexts/ListContext';
import Btn_Close_Left from '../../components/Btn_Close_Left';

const Events = ({ selectedDates }) => {
  const [events, setEvents] = useState([]);
  const [isFree, setIsFree] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [hoveredEventId, setHoveredEventId] = useState(null);
  const { showList, toggleList, closeList, isLeftPanelVisible, toggleLeftPanel } = useContext(ListContext);

  const fetchEvents = () => {
    let url = selectedDates
      ? 'http://localhost:8080/events/filterWithDate'
      : 'http://localhost:8080/events/filter';

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

    if (selectedDates && selectedDates[0] && selectedDates[1]) {
      params.append('startDate', selectedDates[0].format('YYYY-MM-DD'));
      params.append('endDate', selectedDates[1].format('YYYY-MM-DD'));
    }

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data);
        setEvents(Array.isArray(data) ? data : []);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setEvents([]);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, [isFree, selectedCategories, searchText, selectedDates]);

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
      {isLeftPanelVisible && (
        <div
          className="left"
          style={{
            width: LEFT_WIDTH,
            padding: '18px 20px 0px 20px',
            marginTop: NAVBAR_HEIGHT,
            height: `calc(100vh - ${NAVBAR_HEIGHT})`,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Stack direction="row" justifyContent="center">
            <Searchbar onSearch={handleSearch} />
          </Stack>

          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ marginTop: 2 }}>
            <FilterCheckbox onChange={handleCategoryChange} selectedCategories={selectedCategories} />
            <Switch checked={isFree} onChange={handleSwitchChange} />
          </Stack>

          <h2 style={{ marginLeft: 6, marginTop: 5 }}>{events.length} events</h2>

          <div className="event-card-container" style={{ flexGrow: 1, overflowY: 'auto' }}>
            <Stack>
              {Array.isArray(events) && events.map(event => (
                <EventCard key={event.id} event={event} onMouseEnter={() => setHoveredEventId(event.id)}
                  onMouseLeave={() => setHoveredEventId(null)} />
              ))}
            </Stack>
          </div>
        </div>
      )}

      <div className="map" style={{ position: 'fixed', top: NAVBAR_HEIGHT, right: 0, width: isLeftPanelVisible ? `calc(100% - ${LEFT_WIDTH})` : '100%', height: `calc(100vh - ${NAVBAR_HEIGHT})` }}>
        <Map events={events} hoveredEventId={hoveredEventId} />
      </div>

      <Btn_List onClick={toggleList} />
      {showList && <List onClose={closeList} />}

      <Btn_Close_Left onClick={toggleLeftPanel} />
    </div>
  );
};

export default Events;

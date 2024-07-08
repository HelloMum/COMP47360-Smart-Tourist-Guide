import React, { useEffect, useState, useContext, useCallback } from 'react';
import Map from '../../components/events/Map_Events';
import './events.css';
import EventCard from '../../components/events/EventCard';
import EventCard_PopUp from '../../components/events/EventCard_PopUp';
import Searchbar from '../../components/events/Searchbar';
import { Stack, Box } from '@mui/material';
import Switch from '../../components/events/Switch_Events';
import FilterCheckbox from '../../components/events/FilterCheckbox_Events';
import { LEFT_WIDTH, NAVBAR_HEIGHT } from '../../constants';
import Btn_List from '../../components/list/Btn_List';
import List from '../../components/list/List';
import { ListContext } from '../../contexts/ListContext';
import Btn_Close_Left from '../../components/Btn_Close_Left';
import AlertModal from '../../components/AlertModal';

const Events = ({ selectedDates }) => {
  const [events, setEvents] = useState([]);
  const [isFree, setIsFree] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [hoveredEventId, setHoveredEventId] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const { showList, toggleList, closeList, isLeftPanelVisible, toggleLeftPanel, addItemWithDateCheck, selectedDates: contextSelectedDates } = useContext(ListContext);

  const fetchEvents = useCallback(() => {
    let url = contextSelectedDates
      ? '/api/events/filter_within_date'
      : '/api/events/filter';

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

    if (contextSelectedDates && contextSelectedDates[0] && contextSelectedDates[1]) {
      params.append('startDate', contextSelectedDates[0].format('YYYY-MM-DD'));
      params.append('endDate', contextSelectedDates[1].format('YYYY-MM-DD'));
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
  }, [isFree, selectedCategories, searchText, contextSelectedDates]);

  useEffect(() => {
    fetchEvents();
  }, [isFree, selectedCategories, searchText, contextSelectedDates, fetchEvents]);

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

  const handleAdd = (eventData) => {
    addItemWithDateCheck(eventData, () => setAlertOpen(true));
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
                <EventCard
                  key={event.id}
                  event={event}
                  onMouseEnter={() => setHoveredEventId(event.id)}
                  onMouseLeave={() => setHoveredEventId(null)}
                  onAdd={handleAdd}
                />
              ))}
            </Stack>
          </div>
        </div>
      )}

      <div className="map" style={{ position: 'fixed', top: NAVBAR_HEIGHT, right: 0, width: isLeftPanelVisible ? `calc(100% - ${LEFT_WIDTH})` : '100%', height: `calc(100vh - ${NAVBAR_HEIGHT})` }}>
        <Map events={events} hoveredEventId={hoveredEventId} />
      </div>

      <Btn_List onClick={toggleList} />
      {showList && <List onClose={closeList} selectedDates={contextSelectedDates} />}

      <Btn_Close_Left onClick={toggleLeftPanel} />

      <AlertModal
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        title="Warning"
        message="Please set the start and end dates before adding items to the list."
      />
    </div>
  );
};

export default Events;

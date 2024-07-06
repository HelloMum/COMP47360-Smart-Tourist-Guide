import React, { useEffect, useState, useCallback, useContext } from 'react';
import { Box, Stack } from '@mui/material';
import Searchbar from '../../components/spots/Searchbar';
import FreeSwitch from '../../components/spots/Switch_Spots';
import SpotCard from '../../components/spots/SpotCard';
import SpotDetail from '../../components/spots/SpotDetail';
import { LEFT_WIDTH, NAVBAR_HEIGHT } from '../../constants';
import './spots.css';
import Sort_Spots from '../../components/spots/Sort_Spots';
import FilterCheckbox from '../../components/spots/FilterCheckbox_Spots';
import SpotCard_PopUp from '../../components/spots/SpotsCard_PopUp';
import List from '../../components/list/List';
import Btn_List from '../../components/list/Btn_List';
import { ListContext } from '../../contexts/ListContext';
import Btn_Close_Left from '../../components/Btn_Close_Left';
import AlertModal from '../../components/AlertModal';
import Map_Spots from '../../components/spots/Map_Spots';

const Spots: React.FC<{ selectedDates: [moment.Moment | null, moment.Moment | null] | null }> = ({ selectedDates }) => {
  const [activeSpot, setActiveSpot] = useState(null);
  const [spots, setSpots] = useState([]);
  const [isFree, setIsFree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayedSpots, setDisplayedSpots] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortOption, setSortOption] = useState('user_ratings_total');
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [popupSpot, setPopupSpot] = useState(null);
  const { showList, toggleList, closeList, isLeftPanelVisible, toggleLeftPanel, selectedDates: contextSelectedDates } = useContext(ListContext);
  const batchSize = 6;

  const [alertOpen, setAlertOpen] = useState(false);

  const handleExpand = useCallback((spot) => {
    console.log("expand active spot:", spot);
    setActiveSpot(spot);
  }, []);

  const handleCollapse = useCallback(() => {
    setActiveSpot(null);
  }, []);

  const fetchSpots = useCallback(() => {
    setLoading(true);
    let url;
    if (contextSelectedDates && contextSelectedDates[0] && contextSelectedDates[1]) {
      const startDate = contextSelectedDates[0].format('YYYY-MM-DD');
      const endDate = contextSelectedDates[1].format('YYYY-MM-DD');

      url = `http://localhost:8080/attractions/filter_within_date?startDate=${startDate}&endDate=${endDate}&sortBy=${sortOption}`;
    } else {
      url = `http://localhost:8080/attractions/filter?sortBy=${sortOption}`;
    }

    if (isFree) {
      url += '&isFree=true';
    }
    if (categories.length > 0) {
      url += `&categories=${categories.join(',')}`;
    }
    if (searchTerm) {
      url += `&name=${searchTerm}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log("Fetched attractions data:", data);
        setSpots(data);
        setDisplayedSpots(data.slice(0, batchSize));
        setCurrentIndex(batchSize);
      })
      .catch(error => {
        console.error('Error fetching attractions data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [sortOption, isFree, categories, searchTerm, contextSelectedDates]);

  useEffect(() => {
    fetchSpots();
  }, [sortOption, isFree, categories, searchTerm, contextSelectedDates, fetchSpots]);

  const handleSwitchChange = useCallback(() => {
    setIsFree(!isFree);
  }, [isFree]);

  const loadMoreSpots = useCallback(() => {
    if (loading) return;
    setLoading(true);
    const nextIndex = currentIndex + batchSize;
    const newDisplayedSpots = spots.slice(0, nextIndex);
    setDisplayedSpots(newDisplayedSpots);
    setCurrentIndex(nextIndex);
    setLoading(false);
  }, [currentIndex, spots, loading]);

  const handleScroll = useCallback((e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight + 50) {
      loadMoreSpots();
    }
  }, [loadMoreSpots]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleCategoryChange = (selectedCategories) => {
    setCategories(selectedCategories);
  };

  const handleSearch = (searchText) => {
    setSearchTerm(searchText);
  };

  const handleMarkerClick = useCallback((spot) => {
    console.log("marker clicked and popup card:", spot);
    setPopupSpot(spot);
  }, []);

  const handleMissingDates = () => {
    setAlertOpen(true);
  };

  return (
    <div style={{ display: 'flex' }}>
      {isLeftPanelVisible && (
        <div
          style={{
            width: LEFT_WIDTH,
            padding: '18px 1.2vw 0px 1.2vw',
            marginTop: NAVBAR_HEIGHT,
            height: `calc(100vh - ${NAVBAR_HEIGHT})`,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'hidden'
          }}
        >
          {!activeSpot && (
            <>
              <Stack direction="row" justifyContent="center">
                <Searchbar onSearch={handleSearch} />
              </Stack>

              <Stack direction="row" sx={{ paddingX: 1, paddingTop: 2, justifyContent: 'space-between', alignItems: 'center' }}>
                <FilterCheckbox onChange={handleCategoryChange} />
                <FreeSwitch checked={isFree} onChange={handleSwitchChange} />
                <Sort_Spots value={sortOption} onChange={handleSortChange} />
              </Stack>
              <h2 style={{ marginLeft: 10, marginTop: 10 }}>{spots.length} spots</h2>
            </>
          )}

          <div className="spot-card-container hide-scrollbar" style={{ flexGrow: 1, overflowY: 'auto' }} onScroll={handleScroll}>
            {activeSpot ? (
              <SpotDetail spot={activeSpot} onCollapse={handleCollapse} />
            ) : (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 1.5, paddingX: '12px' }}>
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  displayedSpots.map((spot) => (
                    <SpotCard
                      key={spot.id}
                      id={spot.index}
                      image1={`/images/spots_small/${spot.index}_1.webp`}
                      image3={`/images/spots_small/${spot.index}_3.webp`}
                      title={spot.attraction_name}
                      rating={spot.attraction_rating}
                      price={spot.price}
                      category={spot.category}
                      user_ratings_total={spot.user_ratings_total}
                      onExpand={() => handleExpand(spot)}
                    />
                  ))
                )}
              </Box>
            )}
          </div>
        </div>
      )}

      <div className="map hide-scrollbar" style={{ position: 'fixed', top: NAVBAR_HEIGHT, right: 0, width: isLeftPanelVisible ? `calc(100% - ${LEFT_WIDTH})` : '100%', height: `calc(100vh - ${NAVBAR_HEIGHT})`, overflowY: 'auto' }}>
        <Map_Spots events={spots} onMarkerClick={handleMarkerClick} />
        {popupSpot && (
          <SpotCard_PopUp
            id={popupSpot.index}
            image1={`/images/spots_small/${popupSpot.index}_1.webp`}
            image3={`/images/spots_small/${popupSpot.index}_3.webp`}
            title={popupSpot.attraction_name}
            rating={popupSpot.attraction_rating}
            category={popupSpot.category}
            isFree={popupSpot.isFree}
            user_ratings_total={popupSpot.user_ratings_total}
            onClose={() => setPopupSpot(null)}
          />
        )}
      </div>

      <Btn_List onClick={toggleList} />
      {showList && <List onClose={closeList} selectedDates={contextSelectedDates} />}

      <Btn_Close_Left onClick={toggleLeftPanel} />

      {alertOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1300
          }}
          onClick={() => setAlertOpen(false)}
        >
          <AlertModal
            open={alertOpen}
            onClose={() => setAlertOpen(false)}
            title="Warning"
            message="Please set the start and end dates before adding items to the list."
          />
        </Box>
      )}
    </div>
  );
};

export default Spots;

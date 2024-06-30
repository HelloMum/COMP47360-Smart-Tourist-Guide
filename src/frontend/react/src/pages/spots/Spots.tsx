import React, { useEffect, useState, useCallback } from 'react';
import { Box, Stack } from '@mui/material';
import Map from '../../components/spots/Map_Spots';
import Searchbar from '../../components/spots/Searchbar';
import FreeSwitch from '../../components/spots/Switch_Spots';
import SpotCard from '../../components/spots/SpotCard';
import SpotDetail from '../../components/spots/SpotDetail'; 
import { LEFT_PADDING, LEFT_WIDTH, NAVBAR_HEIGHT } from '../../constants';
import './spots.css';
import Sort_Spots from '../../components/spots/Sort_Spots';
import FilterCheckbox from '../../components/spots/FilterCheckbox_Spots';
import SpotCard_PopUp from '../../components/spots/SpotsCard_PopUp';

const Spots: React.FC = () => {
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
  const batchSize = 6;

  const handleExpand = useCallback((spot) => {
    setActiveSpot(spot);
  }, []);

  const handleCollapse = useCallback(() => {
    setActiveSpot(null);
  }, []);

  const fetchSpots = useCallback(() => {
    setLoading(true); 
    let url = `http://localhost:8080/attractions/filter?sortBy=${sortOption}`;
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
        console.log("Fetched data:", data); 
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
  }, [sortOption, isFree, categories, searchTerm]);

  useEffect(() => {
    fetchSpots();
  }, [sortOption, isFree, categories, searchTerm, fetchSpots]);

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
    setPopupSpot(spot);
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div className="left" 
      style={{ width: LEFT_WIDTH, 
        padding: '18px 30px 0px 30px', 
        marginTop: NAVBAR_HEIGHT, 
        height: `calc(100vh - ${NAVBAR_HEIGHT})`, 
        display: 'flex', 
        flexDirection: 'column', 
        overflowY: 'hidden' }}>
        {!activeSpot && (
          <>
            <Stack direction="row" justifyContent="center">
              <Searchbar onSearch={handleSearch} />
            </Stack>
            <Stack direction="row" sx={{ paddingX: 2, paddingTop: 2, justifyContent: 'space-between', alignItems: 'center' }}>
              <FilterCheckbox onChange={handleCategoryChange} />
              <FreeSwitch checked={isFree} onChange={handleSwitchChange} />
              <Sort_Spots value={sortOption} onChange={handleSortChange} />
            </Stack>

            <h2 style={{marginLeft:15,marginTop:10}}>{spots.length} spots</h2>
          </>
        )}

        <div className="spot-card-container" style={{ flexGrow: 1, overflowY: 'auto' }} onScroll={handleScroll}>
          {activeSpot ? (
            <SpotDetail spot={activeSpot} onCollapse={handleCollapse} />
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 3, paddingY: 0, paddingX: 2 }}>
              {loading ? (
                <div>Loading...</div> 
              ) : (
                displayedSpots.map((spot) => (
                  <SpotCard
                    key={spot.id}
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
      <div className="map" style={{ position: 'fixed', top: NAVBAR_HEIGHT, right: 0, width: `calc(100% - ${LEFT_WIDTH})`, height: `calc(100vh - ${NAVBAR_HEIGHT})`, overflowY: 'auto' }}>
        <Map events={spots} onMarkerClick={handleMarkerClick} /> 
        {popupSpot && (
          <SpotCard_PopUp
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
    </div>
  );
};

export default Spots;

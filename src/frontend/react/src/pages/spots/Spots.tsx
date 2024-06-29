import React, { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';
import Map from '../../components/Map_Spots';
import Searchbar from '../../components/Searchbar';
import Switch from '../../components/Switch_Spots';
import SpotCard from '../../components/SpotCard';
import SpotDetail from '../../components/SpotDetail'; 
import spots from '../../data/spots.json';
import { LEFT_PADDING, LEFT_WIDTH, NAVBAR_HEIGHT } from '../../constants';
import './spots.css';
import Sort_Spots from '../../components/Sort_Spots';
import FilterCheckbox from '../../components/FilterCheckbox_Spots';

const Spots: React.FC = () => {
  const [activeSpot, setActiveSpot] = useState(null);
  const [spots, setSpots] = useState([]); // 新状态用于存储从API获取的景点数据
  const handleExpand = (spot) => {
    setActiveSpot(spot);
  };

  const handleCollapse = () => {
    setActiveSpot(null);
  };

  useEffect(() => {

    fetch('http://localhost:8080/attractions/all')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched data:", data); 
        setSpots(data); 
      })
      .catch(error => {
        console.error('Error fetching attractions data:', error);
      });
  }, []); 

  return (
    <div style={{ display: 'flex' }}>
      <div className="left" style={{ width: LEFT_WIDTH, padding: LEFT_PADDING, marginTop: NAVBAR_HEIGHT, height: `calc(100vh - ${NAVBAR_HEIGHT})`, display: 'flex', flexDirection: 'column' }}>

    
        {!activeSpot && (<>

   <Stack direction="row" justifyContent="center">
          <Searchbar />
        </Stack>

          <Stack direction="row" sx={{ paddingX: 2, paddingTop: 2, justifyContent: 'space-between', alignItems: 'center' }}>
            <FilterCheckbox />
            <Switch />
            <Sort_Spots />
          </Stack></>
        )}

        <div className="spot-card-container" style={{ flexGrow: 1, overflowY: 'auto' }}>
          {activeSpot ? (
            <SpotDetail spot={activeSpot} onCollapse={handleCollapse} />
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 3, padding: 2 }}>
              {spots.map((spot) => (
                <SpotCard
                  key={spot.id}
                  image1={`/images/spots_small/${spot.index}_1.webp`}
                  image3={`/images/spots_small/${spot.index}_3.webp`}
                  title={spot.attraction_name}
                  rating={spot.attraction_rating}
                  price={spot.price}                            
              
                  category={spot.category}

                  onExpand={() => handleExpand(spot)}
                />
              ))}
            </Box>
          )}
        </div>
      </div>

      <div className="map" style={{ position: 'fixed', top: NAVBAR_HEIGHT, right: 0, width: `calc(100% - ${LEFT_WIDTH})`, height: `calc(100vh - ${NAVBAR_HEIGHT})` }}>
        <Map events={[]}/>
      </div>
    </div>
  );
};

export default Spots;

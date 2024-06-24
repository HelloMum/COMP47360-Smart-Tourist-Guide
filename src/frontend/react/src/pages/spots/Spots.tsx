import React from 'react';
import { Box, Stack } from '@mui/material';
import Map from '../../components/Map';
import Searchbar from '../../components/Searchbar';
import Switch from '../../components/Switch_Spots';
import SpotCard from '../../components/SpotCard';
import spots from '../../data/spots.json';
import { LEFT_PADDING, LEFT_WIDTH, NAVBAR_HEIGHT } from '../../constants';
import './spots.css';
import Sort_Spots from '../../components/Sort_Spots';

const Spots: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div className="left" style={{ width: LEFT_WIDTH, padding: LEFT_PADDING, marginTop: NAVBAR_HEIGHT, height: `calc(100vh - ${NAVBAR_HEIGHT})`, display: 'flex', flexDirection: 'column' }}>

        <Stack direction="row" justifyContent="center">
          <Searchbar />
        </Stack>

        <Stack direction="row" sx={{ paddingX: 4, paddingTop: 2, justifyContent: 'space-between', alignItems: 'center' }}>
          <Switch />
          <Sort_Spots />
        </Stack>

        <div className="spot-card-container" style={{ flexGrow: 1, overflowY: 'auto' }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 3, padding: 2 }}>
            {spots.map((spot, index) => (
              <SpotCard key={index} image={spot.image} title={spot.title} address={spot.address} />
            ))}
          </Box>
        </div>
      </div>

      <div className="map" style={{ position: 'fixed', top: NAVBAR_HEIGHT, right: 0, width: `calc(100% - ${LEFT_WIDTH})`, height: `calc(100vh - ${NAVBAR_HEIGHT})` }}>
        <Map />
      </div>
    </div>
  );
};

export default Spots;

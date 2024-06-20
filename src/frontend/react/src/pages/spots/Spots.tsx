import React from 'react';
import './spots.css';
import Map from '../../components/Map';
import Searchbar from '../../components/Searchbar';

import SpotCard from '../../components/SpotCard';
import { Box, Stack,   } from '@mui/material';
import Switch from '../../components/Switch';
import Select from '../../components/Sort';


const Spots: React.FC = () => {
  return (
    <div className="activity">
      <div className="activity-list">
   <Searchbar/>

<Stack direction="row" sx={{ padding: 2, justifyContent: 'space-between', alignItems: 'center' }}>
<Switch/>
<Select/>


</Stack>




   <Box 
      sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between', 
        gap: 3, 
        padding: 2 
      }}
    >
      <SpotCard />
      <SpotCard />
      <SpotCard />
      <SpotCard />
    </Box>

      </div>
      <div className="map">
        <Map />
      </div>
    </div>
  );
};

export default Spots;

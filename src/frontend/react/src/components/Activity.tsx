import React from 'react';
import './Activity.css';
import Map from './Map';
import Searchbar from './Searchbar';

import SpotCard from './SpotCard';
import { Box, Stack,   } from '@mui/material';
import Switch from './Switch';
import Select from './Select';


const Activity: React.FC = () => {
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

export default Activity;

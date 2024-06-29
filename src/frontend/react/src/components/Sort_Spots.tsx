import React, { useState } from 'react';
import { FormControl, Select as MuiSelect, MenuItem, Typography, Box } from '@mui/material';
import theme from '../theme';


const Sort_Spots = () => {
 
  const handleChange = (event) => {
   
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
     <Typography sx={{ ...theme.typography.smallText, marginRight: 1 }}> sort by  </Typography>
      <FormControl sx={{ minWidth: 100 }}>
        <MuiSelect
          value={5}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{ height: 26,...theme.typography.smallText }}
        >
        <MenuItem value={5} sx={{ height: 26,...theme.typography.smallText }}>popularity</MenuItem>
          <MenuItem value={10} sx={{ height: 26,...theme.typography.smallText }}>rating</MenuItem>
          <MenuItem value={20} sx={{ height: 26,...theme.typography.smallText }}>price</MenuItem>
        </MuiSelect>
      </FormControl>
    </Box>
  );
};

export default Sort_Spots;

import React from 'react';
import { FormControl, Select as MuiSelect, MenuItem, Typography, Box, useTheme } from '@mui/material';
import theme from '../../utils/theme';

const Sort_Spots = ({ value, onChange }) => {

  const theme = useTheme();
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography sx={{ 
        ...theme.typography.smallText, 
      marginRight: 1,
      display: {
        xs: 'none',
        sm: 'none',
        md: 'inline',
        lg: 'inline',
      },
       }}>sort by</Typography>
      <FormControl sx={{ minWidth: 100 }}>
        <MuiSelect
          value={value}
          onChange={onChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{ height: 26, ...theme.typography.smallText }}
        >
          <MenuItem value="user_ratings_total" sx={{  height: { 
          xs: 5, 
          sm: 20, 
          md: 26,  
          lg: 26,  
   
        }, ...theme.typography.smallText }}>popularity</MenuItem>



          <MenuItem value="attraction_rating" sx={{   height: { 
          xs: 5, 
          sm: 20, 
          md: 26,  
          lg: 26,  
   
        }, ...theme.typography.smallText }}>rating</MenuItem>
          {/* <MenuItem value="price" sx={{ height: 26, ...theme.typography.smallText }}>price</MenuItem> */}
        </MuiSelect>
      </FormControl>
    </Box>
  );
};

export default Sort_Spots;

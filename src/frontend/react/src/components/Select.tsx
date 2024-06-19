import React, { useState } from 'react';
import { FormControl, Select as MuiSelect, MenuItem, Typography, Box } from '@mui/material';

const SelectComponent = () => {
  const [age, setAge] = useState(10); // 设置默认值为 10

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography sx={{ mr: 1, color: 'text.secondary' }}>Sort by</Typography>
      <FormControl sx={{ minWidth: 100 }}>
        <MuiSelect
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{ height: 28 }}
        >
          <MenuItem value={10} sx={{ height: 28 }}>distance</MenuItem>
          <MenuItem value={20} sx={{ height: 28 }}>Twenty</MenuItem>
          <MenuItem value={30} sx={{ height: 28 }}>Thirty</MenuItem>
        </MuiSelect>
      </FormControl>
    </Box>
  );
};

export default SelectComponent;

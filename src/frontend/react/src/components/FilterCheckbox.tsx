import { Box, Checkbox, FormControl, FormControlLabel, FormGroup,  Select } from "@mui/material";
import * as React from 'react';
import { useState } from "react";

const FilterCheckbox = () => {
  const [open, setOpen] = useState(false);

  const handleChange = () => {
    setOpen(!open);
  };

  return (
    <>
      <FormControl sx={{ minWidth: 120 }}>
        <Select
          displayEmpty
          onClick={handleChange}
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{ height: 28 }}
          renderValue={() => "filter by type"}
        >
        </Select>
      </FormControl>

      {open && (
        <Box sx={{ boxShadow: 1, p: 1, borderRadius: 2, backgroundColor: '#fff', marginTop: 1 ,position: 'absolute', zIndex: 1000}}>
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Music" />
            <FormControlLabel control={<Checkbox />} label="Food & Drink" />
            <FormControlLabel control={<Checkbox />} label="Film" />
            <FormControlLabel control={<Checkbox />} label="Art" />
            <FormControlLabel control={<Checkbox />} label="Theater" />
          </FormGroup>
        </Box>
      )}
    </>
  );
};

export default FilterCheckbox;

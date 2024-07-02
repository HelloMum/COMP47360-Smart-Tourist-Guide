import { IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const Searchbar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearchClick = () => {
    onSearch(searchText);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value);
  };

  return (
    <div>
      <TextField
        placeholder="search the places you want to visit"
        variant="outlined"
        value={searchText}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearchClick}>
                <SearchRoundedIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          width: '25vw',
          height: '32px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '20px',
            height: '100%',
          },
          '& .MuiOutlinedInput-input': {
            height: '100%',
            padding: '10px 14px',
            fontSize: '14px', // Adjust input text font size
          },
          '& .MuiInputLabel-root': {
            fontSize: '12px', // Adjust placeholder font size
          },
        }}
        InputLabelProps={{
          sx: {
            fontSize: '12px', // Adjust placeholder font size
          },
        }}
      />
    </div>
  );
};

export default Searchbar;

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
    if (value === '') {
      onSearch('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div>
      <TextField
        placeholder="search the events you like"
        variant="outlined"
        value={searchText}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearchClick} sx={{ color: 'orange' }}>
                <SearchRoundedIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          width: {
            xs: '57vw', 
            sm: '37vw', 
            md: '35vw', 
            lg: '25vw', 
            xl: '20vw'  
          },
          height: '32px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '20px',
            height: '100%',
          },
          '& .MuiOutlinedInput-input': {
            height: '100%',
            padding: '10px 14px',
            fontSize: '14px',
          },
          '& .MuiInputLabel-root': {
            fontSize: '12px',
          },
        }}
        InputLabelProps={{
          sx: {
            fontSize: '12px',
          },
        }}
      />
    </div>
  );
};

export default Searchbar;

import { IconButton, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const Searchbar = () => {
  return (
    <div>
            <TextField
  placeholder="search the spots you want to visit"
  variant="outlined"
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={() => console.log('Search clicked')}>
          <SearchRoundedIcon />
        </IconButton>
      </InputAdornment>
    ),
  }}
  sx={{ 
    width: '450px', 
    height: '38px', 
    '& .MuiOutlinedInput-root': {
      borderRadius: '20px',
      height: '100%',
    },
    '& .MuiOutlinedInput-input': {
      height: '100%',
      padding: '10px 14px', 
    }
  }}
/>
    </div>
  )
}

export default Searchbar

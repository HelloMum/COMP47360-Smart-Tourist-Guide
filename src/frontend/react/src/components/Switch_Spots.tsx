import React from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

const FreeSwitch = styled((props) => (
  <Switch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
  />
))(({ theme }) => ({
  width: 50,
  height: 24,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(26px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(26px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 20,
    height: 20,
    borderRadius: '50%',
  },
  '& .MuiSwitch-track': {
    borderRadius: 24 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#39393D' : '#E9E9EA',
    boxSizing: 'border-box',
  },
}));

const FreeLabel = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.text.secondary,
  marginLeft: theme.spacing(1),
}));

const App = () => {
  return (
    <FormControlLabel
      control={<FreeSwitch  />}
      label={<FreeLabel    >Free</FreeLabel>}
    />
  );
};

export default App;

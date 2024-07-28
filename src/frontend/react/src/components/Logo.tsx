import React from 'react';
import { useTheme, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  const theme = useTheme();

  return (
    <Link
      to="/"
      style={{
        display: 'flex',
        alignItems: 'center',
        fontSize: '1.7rem',
        fontWeight: 'bold',
        textDecoration: 'none',
        color: theme.palette.primary.dark,
        fontFamily: '"Lexend", sans-serif',
        fontWeight: 600,
        fontStyle: 'normal',
        letterSpacing: '-1px',
        marginRight: '0px',
      }}
    >
      <Box
        component="img"
        src="images/logo-xs.png"
        alt="logo-xs"
        sx={{
          width: '28px',
          marginRight: '6px',
          display: { xs: 'block', sm: 'none' }
        }}
      />
      <Box
        component="img"
        src="images/logo2.png"
        alt="logo"
        sx={{
          width: '28px',
          marginRight: '6px',
          display: { xs: 'none', sm: 'block' }
        }}
      />
      <Box
        component="span"
        sx={{
          display: {
            xs: 'none',
            sm: 'none',
            md: 'inline',
            lg: 'inline',
          },
        }}
      >
        TourWise
      </Box>
    </Link>
  );
};

export default Logo;

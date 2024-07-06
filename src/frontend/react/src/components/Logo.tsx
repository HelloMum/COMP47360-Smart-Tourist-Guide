import { useTheme } from '@emotion/react';
import { PublicRounded } from '@mui/icons-material';
import React from 'react';
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
        // marginLeft: '5px',
        letterSpacing: '-1px',
        marginRight: '0px',
      }}
    >
      <PublicRounded sx={{ fontSize: '32px', marginRight: '4px' }} />
      HelloWorld
    </Link>
  );
};

export default Logo;

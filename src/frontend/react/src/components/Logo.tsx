import { useTheme } from '@emotion/react';
import React from 'react';
import { Link } from 'react-router-dom';


const Logo: React.FC = () => {
  const theme = useTheme();

  return (
    <Link
      to="/"
      style={{
        fontSize: '1.75rem',
        fontWeight: 'bold',
        textDecoration: 'none',
        color: theme.palette.primary.dark,
        fontFamily: '"Lexend", sans-serif',
        // fontFamily: '"Oleo Script", system-ui',
        fontWeight: 600,
        fontStyle: 'normal',
        marginLeft: '20px',
        letterSpacing: '-1px',
        marginRight: '0px',
      }}
    >
      HelloWorld
    </Link>
  );
};

export default Logo;

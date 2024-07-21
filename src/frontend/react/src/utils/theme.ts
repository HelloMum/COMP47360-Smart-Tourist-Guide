
import { createTheme, ThemeOptions } from '@mui/material/styles';


const theme = createTheme({

  // -----------------------------------  color -----------------------------------
  palette: {
    primary: {
      main: '#ffc147',  //yellow
      light:'#ffce65',
      dark:'#faa134',

    },
    secondary: {
      main: '#f76b81',  //pink
      light: '#f7a7b3',
    },
    customGreen: {
      main: '#6bc2b4',  //custom green
    },
    darkBlue: {
      main: '#132956',  //darkblue
    },
  },

  // -----------------------------------  typography  --------------------------------

  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontFamily: 'GothicBold, Arial, sans-serif',
      fontSize: '2.5rem',
    },
  
    cardTitle: {
      // fontFamily: 'Arial, sans-serif',
      fontSize: '1.12rem',
      fontWeight: 450,
      // color: '#111',
    },

    cardDesc: {
      fontFamily: 'Arial, sans-serif',
      fontSize: '0.8rem',
      fontWeight: 100,
      color: '#888',
    },
 
 
    smallText: {
      fontSize: '0.8rem',
      fontWeight: 200,
      color: '#555',
    },

  },
  
 // -----------------------------------  breakpoints for screens withe different sizes  --------------------------------

  breakpoints: {
    values: {
      xs: 320,
      sm: 768,
      md: 1024,
      lg: 1440,
      xl: 1920,
    },
  },
} as ThemeOptions);

export default theme;

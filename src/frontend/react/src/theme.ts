
import { createTheme, ThemeOptions } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: '#ffc147',  //yellow
      light:'#fbd589'

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
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontFamily: 'GothicBold, Arial, sans-serif',
      fontSize: '2.5rem',
    },
  
    cardTitle: {
      // fontFamily: 'Arial, sans-serif',
      fontSize: '1.15rem',
      fontWeight: 500,
      // color: '#111',
    },

    cardDesc: {
      fontFamily: 'Arial, sans-serif',
      fontSize: '0.8rem',
      fontWeight: 100,
      color: '#888',
    },
 
 
    smallText: {
      fontSize: '0.875rem',
      fontWeight: 400,
      color: '#777',
    },

  },
  
} as ThemeOptions);

export default theme;


import { createTheme, ThemeOptions } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: '#ffc147',  //yellow
      light:'#fbd589'

    },
    secondary: {
      main: '#f76b81',  //purple
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

    h3:{
      fontFamily: 'Roboto, Arial, sans-serif',
      fontSize: '1.5rem', 
    }
  },
  
} as ThemeOptions);

export default theme;

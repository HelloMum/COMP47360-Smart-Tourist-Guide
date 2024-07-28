import { useTheme, useMediaQuery } from '@mui/material';
import { setLeftWidth, setNavbarHeight,setListWidth } from './constants';

export const useUpdateLeftWidth = (): void => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down(768));
  const isMd = useMediaQuery(theme.breakpoints.down(1024));
  const isLg = useMediaQuery(theme.breakpoints.down(1440));
  const isXl = useMediaQuery(theme.breakpoints.down(1920));

  if (isSm) {
    setLeftWidth('80vw'); // -768px
  } else if (isMd) {
    setLeftWidth('380px'); // 768px-1024px
  } else if (isLg) {
    setLeftWidth('50vw'); // 1024px-1440px
  } else if (isXl) {
    setLeftWidth('41vw'); // 1440px-1920px
  } else {
    setLeftWidth('41vw'); // 
  }
};

export const useUpdateNavbarHeight = (): void => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down(426));
  const isSm = useMediaQuery(theme.breakpoints.down(768));

  if (isXs) {
    setNavbarHeight('85px'); 
  } else if (isSm) {
    setNavbarHeight('85px'); // - 768px
  } else {
    setNavbarHeight('50px'); 
  }
};

export const useResponsiveCardWidth = (): string => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down(768));
  const isMd = useMediaQuery(theme.breakpoints.down(1024));
  const isLg = useMediaQuery(theme.breakpoints.down(1440));
  const isXl = useMediaQuery(theme.breakpoints.down(1920));

  if (isSm) {
    return '71vw'; // -768px
  } else if (isMd) {
    return '45vw'; // 768px-1024px
  } else if (isLg) {
    return '21.5vw'; // 1024px-1440px
  } else if (isXl) {
    return '17.5vw'; // 1440px-1920px
  }
  return '17.5vw'; 
};



export const useResponsiveListWidth = (): string => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down(426));
  const isSm = useMediaQuery(theme.breakpoints.down(768));
  const isMd = useMediaQuery(theme.breakpoints.down(1024));
  const isLg = useMediaQuery(theme.breakpoints.down(1440));
  const isXl = useMediaQuery(theme.breakpoints.down(1920));

  if (isXs) {
    setListWidth ('70vw');
  } else if (isSm) {
    setListWidth ('28vw');
  } else if (isMd) {
    setListWidth ('28vw');
  } else if (isLg) {
    setListWidth ('22vw');
  }
  else if (isXl) {
    setListWidth ('18vw');
  }
  
};

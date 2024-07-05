import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import DateRangePicker from '../../components/DateRangePicker';
import { NAVBAR_HEIGHT } from '../../constants';
import { Carousel } from 'antd';

const Home: React.FC<{ onDateChange: (dates: [moment.Moment | null, moment.Moment | null] | null) => void }> = ({ onDateChange }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const contentStyle: React.CSSProperties = {
    height: '80vh',
    width: '60vw',
    color: '#fff',
    textAlign: 'center',
    background: theme.palette.primary.light,
    borderRadius: '20px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
   
  };

  const imageStyle: React.CSSProperties = {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    borderRadius: '20px',
  };

  return (
    <Box
      style={{
        marginTop: NAVBAR_HEIGHT,
        height: `calc(100vh - ${NAVBAR_HEIGHT})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}
    >

      {/*------------------------- left---------------------------------- */}
      <Box
        style={{
          position: 'absolute',
          top: '10%',
          left: '8vw',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >

      <DateRangePicker onDateChange={onDateChange} />

      <Stack direction='row'>
        <Button
          onClick={() => navigate('/spots')}
          variant="contained"
          endIcon={<ArrowForwardRoundedIcon />}
          style={{
            backgroundColor: theme.palette.primary.main,
            borderRadius: 20,
            boxShadow: 'none',
            marginBottom: 20,
          }}
        >
          Start Now
        </Button>

        <Button
          onClick={() => navigate('/about')}
          variant="contained"
          color="success"
          style={{
            backgroundColor: grey['300'],
            boxShadow: 'none',
            borderRadius: 20,
            marginBottom: 20,
          }}
        >
          About
        </Button>

        </Stack> 
      </Box>

      <Carousel autoplay autoplaySpeed={3000} style={{ width: '60vw', paddingTop: '5vh',left:'10vw' }} effect="fade">
        <div>
          <Box style={contentStyle}>
            <img src="images\homepage\1.png" alt="Image 1" style={imageStyle} />
          </Box>
        </div>
        <div>
          <Box style={contentStyle}>
            <img src="images\homepage\2.png" alt="Image 2" style={imageStyle} />
          </Box>
        </div>
        <div>
          <Box style={contentStyle}>
            <img src="images\homepage\3.png" alt="Image 3" style={imageStyle} />
          </Box>
        </div>
      </Carousel>
    </Box>
  );
};

export default Home;

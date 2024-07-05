import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import DateRangePicker from '../../components/DateRangePicker';
import { NAVBAR_HEIGHT } from '../../constants';
import { Carousel, Typography } from 'antd';
import HomeCard from '../../components/HomeCard';

const Home: React.FC<{ onDateChange: (dates: [moment.Moment | null, moment.Moment | null] | null) => void }> = ({ onDateChange }) => {
  const navigate = useNavigate();
  const theme = useTheme();




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
    <Typography variant='h1' sx={{ mt: 20 }}>
          <span style={{color:theme.palette.darkBlue.main }}>Smart<br/>
          Tourist Guide 
          <br /> 
          
          in </span><span style={{color:theme.palette.secondary.main }}>New York</span></Typography>

   



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


      <Box>
          <HomeCard title='Central Park' rating={4.8} image1={'images/homepage/1.png'}  image3={'images/central_park3.jpg'} user_ratings_total={273613}   />


        </Box>


    </Box>
  );
};

export default Home;

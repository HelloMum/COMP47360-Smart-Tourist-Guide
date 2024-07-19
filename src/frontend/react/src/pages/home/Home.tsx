import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DateRangePicker from '../../components/DateRangePicker';
import { NAVBAR_HEIGHT } from '../../utils/constants';
import HomeCard from '../../components/HomeCard';
import { ListContext } from '../../contexts/ListContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { selectedDates, setSelectedDates } = useContext(ListContext);

  const handleDateChange = (dates: [moment.Moment | null, moment.Moment | null] | null) => {
    setSelectedDates(dates);
  };

  return (
    <Stack direction='row' paddingX='8vw' gap='1vw'
      style={{
        marginTop: NAVBAR_HEIGHT,
        height: `calc(100vh - ${NAVBAR_HEIGHT})`,
        paddingTop: '10vh',
      }}

      sx={{
        backgroundImage: { xs: 'url(images/spots/54_1.webp)', sm: 'none' },
        backgroundSize: 'cover',
        backgroundPosition: 'left',
        backgroundRepeat: 'no-repeat',
      }}

    >
      {/* Left Section */}
      <Stack 
  direction='column' 
  gap='2vh' 
  sx={{ 
    width: { xs: '100vw', sm: '35vw', md: '26vw', lg: '20vw' },
    background: { xs: 'rgba(251, 251, 251, 0.95)', sm: 'none' }, 
    height: { xs: '45vh', sm: '65vh' },
    borderRadius: { xs: '10px', sm: '0' }, 
    paddingLeft: { xs: '2vh', sm: '0' }, 
  }}
  paddingTop='8vh'      
>
        <Typography
          sx={{
            fontFamily: '"Lexend", sans-serif',
            fontWeight: '600',
            letterSpacing: '-1px',
            color: theme.palette.primary.dark,
            marginBottom: '8vh',
            fontSize: { xs: '8vw', sm: '4.5vw', md: '3.3vw', lg: '2.5vw', xl: '2vw' },
            lineHeight: { xs: '10vw', sm: '5.5vw', md: '4.3vw', lg: '3.5vw', xl: '3vw' }
          }}
        >
          Smart<br />
          Tourist Guide
          <br />
          in New York
        </Typography>

        <Stack direction='row' alignItems='center' gap='8px'> {/* Added gap here */}
          <DateRangePicker
            onDateChange={handleDateChange}
            className="home-date-picker"
            value={selectedDates}
          />

          <div
            onClick={() => navigate('/spots')}
            style={{
              backgroundColor: theme.palette.primary.dark,
              color: 'white',
              borderRadius: '50%',
              boxShadow: 'none',
              height: '40px',
              width: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            GO
          </div>
        </Stack>
      </Stack>

      {/* Right Section */}
      <Grid container spacing={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4 }} 
        sx={{ width: { xs: '30vw', sm: '50vw', md: '60vw', lg: '65vw' }, height: '85vh' }}
      >
        <Grid item xs={12} sm={12} md={6} lg={4} sx={{ display: { xs: 'none', sm: 'block' } }}>
          <HomeCard
            title='Central Park'
            rating={4.8}
            image1={'images/spots/22_3.webp'}
            image3={'images/homepage/1.png'}
            user_ratings_total={273613}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4} sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
          <HomeCard
            title='Statue of Liberty'
            rating={4.7}
            image1={'images/spots/54_1.webp'}
            image3={'images/homepage/3.jpg'}
            user_ratings_total={101828}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4} sx={{ display: { xs: 'none', sm: 'none', lg: 'block' } }}>
          <HomeCard
            title='Times Square'
            rating={4.7}
            image1={'images/spots/141_1.webp'}
            image3={'images/spots/141_2.webp'}
            user_ratings_total={213463} 
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Home;

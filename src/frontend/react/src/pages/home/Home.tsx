import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import DateRangePicker from '../../components/DateRangePicker';
import { NAVBAR_HEIGHT } from '../../constants';
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
    >
      {/* ----------------------- left ----------------------------------- */}
      <Stack 
        direction='column' 
        gap='2vh' 
        width='22vw' 
        paddingTop='8vh'      
        height='65vh'  
      >
        <p
          style={{
            fontFamily: '"Lexend", sans-serif',
            fontSize: '2.5vw', 
            fontWeight: '600',
            letterSpacing: '-1px',
            color: theme.palette.primary.dark,
            lineHeight: '3.5vw',
            marginBottom: '8vh'
          }}
        >
          Smart<br />
          Tourist Guide
          <br />
          in New York
        </p>


<Stack direction='row' gap={1} >
        {/* <p
          style={{
            fontFamily: '"Lexend", sans-serif',
            fontSize: '16px', 
            color:'#868686',
            marginBottom:'0', 
            marginLeft:'4px',
            padding:'0'                    
 }}
        >
          set your travel dates 
        </p> */}

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
              marginBottom: 20,
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
   
      {/*------------------------------ right part----------------------------- */}
      <Stack direction='row' gap={4}
        sx={{
          width: '65vw',
          height:'85vh'
        }}
      >
        <HomeCard
          title='Central Park'
          rating={4.8}
          image1={'images/spots/22_3.webp'}
          image3={'images/homepage/1.png'}
          user_ratings_total={273613}
        />
        <HomeCard
          title='Statue of Liberty'
          rating={4.7}
          image1={'images/spots/54_1.webp'}
          image3={'images/homepage/3.jpg'}
          user_ratings_total={101828}
        />
        <HomeCard
          title='Times Square'
          rating={4.7}
          image1={'images/spots/141_1.webp'}
          image3={'images/spots/141_2.webp'}
          user_ratings_total={213463}
        />
      </Stack>
    </Stack>
  );
};

export default Home;

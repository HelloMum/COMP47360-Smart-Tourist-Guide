import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button,  Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const theme=useTheme();

  return (
    <Box  sx={{ mt: 3,mx:"7%",display:'flex', justifyContent: 'space-between'}}>
      <Stack direction="row" spacing={1}>
      <Box   style={{ maxWidth: '600px'  }}>
        <Typography variant='h1' sx={{ mt: 20 }}>
          <span style={{color:theme.palette.darkBlue.main }}>Smart<br/>
          Tourist Guide 
          <br /> 
          
          in </span><span style={{color:theme.palette.secondary.main }}>New York</span></Typography>

   

        <Typography variant='body2' sx={{ mt: 7,mr:10,mb:4,color:grey[600] }} >
          Discover your next adventure with our travel planning app! Effortlessly organize your trips, find top destinations, and get personalized recommendations—all in one place. Start planning your dream vacation today!
        </Typography>

        <Button onClick={() => navigate('/spots')} variant="contained" endIcon={<ArrowForwardRoundedIcon />}  style={{backgroundColor:theme.palette.primary.main,borderRadius:20 ,boxShadow: 'none' }} sx={{ mr:5 }}>
        Start Now
        </Button>

        <Button onClick={() => navigate('/about')}variant="contained" color="success" style={{backgroundColor:grey['300'],boxShadow: 'none', borderRadius:20 }}>
        About
        </Button>

       
      </Box>
      <Box>

        <img src="images\illustration1.jpg" alt="illustration" style={{ width: '700px',marginTop: '10vh' }} />
      </Box>
     
      </Stack>
    </Box>
  );
};

export default Home;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { Carousel } from 'antd';
import 'antd/dist/antd.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const images = [
    '/images/homepage/empire_state_building1.png',
    '/images/homepage/statue_of_liberty3.png',
    '/images/homepage/central_park1.png'
  ];

  return (
    <Box sx={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <Carousel autoplay dotPosition="bottom" style={{ width: '100%', height: '100%' }}>
        {images.map((image, index) => (
          <div key={index} style={{ width: '100%', height: '100%' }}>
            <img src={image} alt={`slide-${index}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        ))}
      </Carousel>
    </Box>
  );
};

export default Home;

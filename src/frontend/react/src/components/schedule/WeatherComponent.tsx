import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface WeatherComponentProps {
  weather: any | null;
  loadingWeather: boolean;
}

const WeatherComponent: React.FC<WeatherComponentProps> = ({ weather, loadingWeather }) => {
  // Function to convert Celsius to Fahrenheit
  const convertToFahrenheit = (celsius: number): number => {
    return (celsius * 9/5) + 32;
  }

  return (
    <Box display="flex" alignItems="center" style={{ minHeight: "70px" }}>
      {loadingWeather ? (
        <CircularProgress size={24} />
      ) : weather ? (
        <Box display="flex" alignItems="center">
          <Typography
            variant="h6"
            sx={{
              fontWeight: 300,
              fontFamily: "Lexend",
              marginRight: 0,
              fontSize: {
                xs: '14px',
                sm: '16px',
                md: '18px'
              }
            }}
          >
            {convertToFahrenheit(weather.tempDay).toFixed(1)}°F
          </Typography>
          <Box
            component="img"
            src={`http://openweathermap.org/img/wn/${weather.weather_icon}@2x.png`}
            alt={weather.weather_description}
            sx={{
              marginRight: 0,
              height: { xs: '50px', sm: '60px', md: '70px' }
            }}
          />
          <Box sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 250,
                fontFamily: "Lexend",
                fontSize: "12px",
              }}
            >
              Wind: {weather.speed.toFixed(1)} m/s
            </Typography>
            <Typography
              variant="body2"
              style={{
                fontWeight: 250,
                fontFamily: "Lexend",
                fontSize: "12px",
              }}
            >
              Humidity: {weather.humidity}%
            </Typography>
          </Box>
        </Box>
      ) : (
        <Typography
          variant="body2"
          style={{ fontWeight: "normal", fontFamily: "Lexend" }}
        >
          No weather data
        </Typography>
      )}
    </Box>
  );
};

export default WeatherComponent;

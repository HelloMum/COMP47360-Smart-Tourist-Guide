package com.example.demo.api;

import com.example.demo.model.HourlyWeatherForecastData;
import com.example.demo.repository.HourlyWeatherForecastRepository;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.RestClientException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class HourlyWeatherForecastScraper {

    private static final Logger logger = LoggerFactory.getLogger(HourlyWeatherForecastScraper.class);

    @Autowired
    private HourlyWeatherForecastRepository hourlyWeatherForecastRepository;

    private final String apiKey = "71287dae2da257653b6b14989d35491f";
    private final String cityName = "Manhattan";
    private final String stateCode = "NY";
    private final String countryCode = "US";

    @Scheduled(fixedRate = 3600000)
    public HourlyWeatherForecastData fetchWeatherData() {
        logger.info("Starting to fetch weather data at {}", LocalDateTime.now());

        RestTemplate restTemplate = new RestTemplate();
        String url = String.format("https://pro.openweathermap.org/data/2.5/forecast/hourly?q=%s,%s,%s&appid=%s",
                cityName, stateCode, countryCode, apiKey);

        WeatherDataRaw weatherDataRaw;
        try {
            weatherDataRaw = restTemplate.getForObject(url, WeatherDataRaw.class);
        } catch (RestClientException e) {
            logger.error("Error fetching weather data: {}", e.getMessage());
            return null;
        }

        if (weatherDataRaw != null && weatherDataRaw.getList() != null && !weatherDataRaw.getList().isEmpty()) {
            HourlyWeatherForecastData weatherData = new HourlyWeatherForecastData();
            weatherData.setId(UUID.randomUUID());
            weatherData.setCod(weatherDataRaw.getCod());
            weatherData.setMessage(weatherDataRaw.getMessage());
            weatherData.setCnt(weatherDataRaw.getCnt());
            weatherData.setCity(weatherDataRaw.getCity());
            weatherData.setFetchTime(LocalDateTime.now());

            List<HourlyWeatherForecastData.HourlyForecastData> hourlyForecasts = weatherDataRaw.getList();
            logger.info("Fetched {} hourly forecast entries", hourlyForecasts.size());

            for (HourlyWeatherForecastData.HourlyForecastData hourlyForecast : hourlyForecasts) {
                hourlyForecast.setHourlyWeatherForecastData(weatherData);
            }
            weatherData.setList(hourlyForecasts);

            hourlyWeatherForecastRepository.save(weatherData);
            logger.info("Weather data saved to database at {}", LocalDateTime.now());
            return weatherData;
        } else {
            logger.warn("No weather data fetched or data list is empty");
            return null;
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    private static class WeatherDataRaw {
        private String cod;
        private int message;
        private int cnt;
        private HourlyWeatherForecastData.City city;
        private List<HourlyWeatherForecastData.HourlyForecastData> list;

        public String getCod() {
            return cod;
        }

        public void setCod(String cod) {
            this.cod = cod;
        }

        public int getMessage() {
            return message;
        }

        public void setMessage(int message) {
            this.message = message;
        }

        public int getCnt() {
            return cnt;
        }

        public void setCnt(int cnt) {
            this.cnt = cnt;
        }

        public HourlyWeatherForecastData.City getCity() {
            return city;
        }

        public void setCity(HourlyWeatherForecastData.City city) {
            this.city = city;
        }

        public List<HourlyWeatherForecastData.HourlyForecastData> getList() {
            return list;
        }

        public void setList(List<HourlyWeatherForecastData.HourlyForecastData> list) {
            this.list = list;
        }
    }
}

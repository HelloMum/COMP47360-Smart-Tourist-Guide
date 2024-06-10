package com.example.demo.service;

import com.example.demo.model.CurrentWeatherData;
import com.example.demo.repository.CurrentWeatherRepository;
import com.example.demo.scrapers.CurrentWeatherScraper;
import com.example.demo.scrapers.CurrentWeatherScraper.WeatherDataRaw;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class CurrentWeatherService {

    private final CurrentWeatherRepository currentWeatherRepository;
    private final CurrentWeatherScraper weatherScraper;

    @Autowired
    public CurrentWeatherService(CurrentWeatherRepository currentWeatherRepository,
                                 CurrentWeatherScraper weatherScraper) {
        this.currentWeatherRepository = currentWeatherRepository;
        this.weatherScraper = weatherScraper;
    }

    @Scheduled(fixedRate = 180000)
    public CurrentWeatherData getCurrentWeather() {
        WeatherDataRaw weatherDataRaw = weatherScraper.fetchWeatherData();

        if (weatherDataRaw != null && weatherDataRaw.getWeather() != null && !weatherDataRaw.getWeather().isEmpty()) {
            CurrentWeatherData weatherData = new CurrentWeatherData();
            weatherData.setId(UUID.randomUUID());
            weatherData.setWeather(weatherDataRaw.getWeather().get(0));
            weatherData.setMain(weatherDataRaw.getMain());
            weatherData.setVisibility(weatherDataRaw.getVisibility());
            weatherData.setWind(weatherDataRaw.getWind());
            weatherData.setClouds(weatherDataRaw.getClouds());
            weatherData.setRain(weatherDataRaw.getRain());
            weatherData.setSnow(weatherDataRaw.getSnow());
            weatherData.setDt(weatherDataRaw.getDt());
            weatherData.setSys(weatherDataRaw.getSys());
            weatherData.setTimezone(weatherDataRaw.getTimezone());
            weatherData.setCod(weatherDataRaw.getCod());
            weatherData.setFetchTime(LocalDateTime.now());
            currentWeatherRepository.save(weatherData);
            return weatherData;
        }

        return null;
    }
}

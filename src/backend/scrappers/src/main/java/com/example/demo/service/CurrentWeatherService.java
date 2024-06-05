package com.example.demo.service;

import com.example.demo.api.CurrentWeatherScraper;
import com.example.demo.model.CurrentWeatherData;
import com.example.demo.repository.CurrentWeatherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public CurrentWeatherData getWeather() {
        CurrentWeatherData weatherData = weatherScraper.fetchWeatherData();
        if (weatherData != null) {
            currentWeatherRepository.save(weatherData);
        }
        return weatherData;
    }
}

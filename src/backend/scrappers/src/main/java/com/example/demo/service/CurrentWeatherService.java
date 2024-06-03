package com.example.demo.service;

import com.example.demo.model.CurrentWeatherData;
import com.example.demo.repository.CurrentWeatherRepository;
import com.example.demo.api.CurrentWeatherScraper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CurrentWeatherService {
    @Autowired
    private CurrentWeatherRepository currentWeatherRepository;

    @Autowired
    private CurrentWeatherScraper weatherScraper;

    public CurrentWeatherData getWeather() {
        CurrentWeatherData weatherData = weatherScraper.fetchWeatherData();
        currentWeatherRepository.save(weatherData);
        return weatherData;
    }

}
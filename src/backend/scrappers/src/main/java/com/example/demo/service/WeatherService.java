package com.example.demo.service;

import com.example.demo.model.WeatherData;
import com.example.demo.repository.WeatherRepository;
import com.example.demo.WeatherScraper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class WeatherService {
    @Autowired
    private WeatherRepository weatherRepository;

    @Autowired
    private WeatherScraper weatherScraper;

    public WeatherData getWeather() {
        WeatherData weatherData = weatherScraper.fetchWeatherData();
        weatherRepository.save(weatherData);
        return weatherData;
    }
}
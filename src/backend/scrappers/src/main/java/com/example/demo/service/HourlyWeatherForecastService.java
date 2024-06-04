package com.example.demo.service;

import com.example.demo.api.HourlyWeatherForecastScraper;
import com.example.demo.model.HourlyWeatherForecastData;
import com.example.demo.repository.HourlyWeatherForecastRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HourlyWeatherForecastService {
    @Autowired
    private HourlyWeatherForecastRepository hourlyWeatherForecastRepository;

    @Autowired
    private HourlyWeatherForecastScraper hourlyWeatherForecastScraper;

    public HourlyWeatherForecastData getWeather() {
        HourlyWeatherForecastData weatherData = hourlyWeatherForecastScraper.fetchWeatherData();
        hourlyWeatherForecastRepository.save(weatherData);
        return weatherData;
    }
}

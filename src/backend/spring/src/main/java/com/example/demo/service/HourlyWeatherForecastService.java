package com.example.demo.service;

import com.example.demo.scrapers.HourlyWeatherForecastScraper;
import com.example.demo.model.HourlyWeatherForecastData;
import com.example.demo.repository.HourlyWeatherForecastRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HourlyWeatherForecastService {

    private final HourlyWeatherForecastRepository hourlyWeatherForecastRepository;
    private final HourlyWeatherForecastScraper hourlyWeatherForecastScraper;

    @Autowired
    public HourlyWeatherForecastService(HourlyWeatherForecastRepository hourlyWeatherForecastRepository,
                                        HourlyWeatherForecastScraper hourlyWeatherForecastScraper) {
        this.hourlyWeatherForecastRepository = hourlyWeatherForecastRepository;
        this.hourlyWeatherForecastScraper = hourlyWeatherForecastScraper;
    }

    public HourlyWeatherForecastData getWeather() {
        HourlyWeatherForecastData weatherData = hourlyWeatherForecastScraper.fetchWeatherData();
        if (weatherData != null) {
            hourlyWeatherForecastRepository.save(weatherData);
        }
        return weatherData;
    }
}

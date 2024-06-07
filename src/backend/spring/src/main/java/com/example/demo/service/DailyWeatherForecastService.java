package com.example.demo.service;

import com.example.demo.scrapers.DailyWeatherForecastScraper;
import com.example.demo.model.DailyWeatherForecastData;
import com.example.demo.repository.DailyWeatherForecastRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DailyWeatherForecastService {

    private final DailyWeatherForecastRepository dailyWeatherForecastRepository;
    private final DailyWeatherForecastScraper dailyWeatherForecastScraper;

    @Autowired
    public DailyWeatherForecastService(DailyWeatherForecastRepository dailyWeatherForecastRepository,
                                       DailyWeatherForecastScraper dailyWeatherForecastScraper) {
        this.dailyWeatherForecastRepository = dailyWeatherForecastRepository;
        this.dailyWeatherForecastScraper = dailyWeatherForecastScraper;
    }

    public DailyWeatherForecastData getWeather() {
        DailyWeatherForecastData weatherData = dailyWeatherForecastScraper.fetchWeatherData();
        if (weatherData != null) {
            dailyWeatherForecastRepository.save(weatherData);
        }
        return weatherData;
    }
}

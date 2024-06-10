package com.example.demo.controller;

import com.example.demo.model.HourlyWeatherForecastData;
import com.example.demo.service.HourlyWeatherForecastService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hourly_weather_forecast")
public class HourlyWeatherForecastController {
    @Autowired
    private HourlyWeatherForecastService hourlyWeatherForecastService;

    @GetMapping("/four_day")
    public HourlyWeatherForecastData getWeather() {
        return hourlyWeatherForecastService.getHourlyWeather();
    }
}


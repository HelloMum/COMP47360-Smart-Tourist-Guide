package com.example.demo.controller;

import com.example.demo.model.CurrentWeatherData;
import com.example.demo.service.CurrentWeatherService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.beans.factory.annotation.Autowired;

// Process the client's request, call the service layer to obtain data and then return it to the client.

@RestController
@RequestMapping("/weather")
public class CurrentWeatherController {
    @Autowired
    private CurrentWeatherService currentWeatherService;

    @GetMapping("/current_weather")
    public CurrentWeatherData getWeather() {
        return currentWeatherService.getCurrentWeather();
    }

}
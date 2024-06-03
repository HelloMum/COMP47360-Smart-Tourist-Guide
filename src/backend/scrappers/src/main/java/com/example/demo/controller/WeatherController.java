package com.example.demo.controller;

import com.example.demo.service.WeatherService;
import com.example.demo.model.WeatherData;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.beans.factory.annotation.Autowired;


@RestController
@RequestMapping
public class WeatherController {
    @Autowired
    private WeatherService weatherService;

    @GetMapping
    public WeatherData getWeather() {
        return weatherService.getWeather();
    }
}
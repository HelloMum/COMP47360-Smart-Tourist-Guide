package com.example.demo.controller;

import com.example.demo.model.DailyForecastData;
import com.example.demo.service.DailyWeatherDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/latest-weather")
public class DailyWeatherDataController {

    @Autowired
    private DailyWeatherDataService service;

    @GetMapping("/all")
    public List<DailyForecastData> getLatestForecast() {
        return service.getLatestForecast();
    }

    @GetMapping("/{date}")
    public List<DailyForecastData> getForecastByDate(@PathVariable String date) {
        LocalDate localDate = LocalDate.parse(date);
        return service.getForecastByDate(localDate);
    }
}


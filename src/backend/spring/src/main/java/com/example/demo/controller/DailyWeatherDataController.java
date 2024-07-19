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

@RestController
@RequestMapping("/weather")
public class DailyWeatherDataController {

    private final DailyWeatherDataService service;

    @Autowired
    public DailyWeatherDataController(DailyWeatherDataService service) {
        this.service = service;
    }

    @GetMapping("/by_date_range/{startDate}/{endDate}")
    public List<DailyForecastData> getForecastByDateRange(@PathVariable String startDate, @PathVariable String endDate) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        return service.getForecastByDateRange(start, end);
    }
}
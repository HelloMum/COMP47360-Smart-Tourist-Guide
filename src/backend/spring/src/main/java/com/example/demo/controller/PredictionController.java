package com.example.demo.controller;

import com.example.demo.model.Attraction;
import com.example.demo.model.DailyForecastData;
import com.example.demo.service.AttractionService;
import com.example.demo.service.DailyWeatherDataService;
import com.example.demo.service.PredictionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@RestController
@RequestMapping("/busyness")
public class PredictionController {

    @Autowired
    private PredictionService predictionService;

    @Autowired
    private AttractionService attractionService;

    @Autowired
    private DailyWeatherDataService dailyWeatherDataService;

    private static final Map<LocalDate, String> usHolidays = new HashMap<>();

    static {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            InputStream inputStream = PredictionController.class.getResourceAsStream("/us_holidays.json");
            Map<String, String> holidays = objectMapper.readValue(inputStream, HashMap.class);
            holidays.forEach((key, value) -> usHolidays.put(LocalDate.parse(key), value));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @PostMapping("/predictByAttractionId")
    public float[] predict(@RequestParam int attractionIndex, @RequestParam String dateTime) {
        try {
            // Attraction Data
            Attraction attraction = attractionService.getAttractionByIndex(attractionIndex);
            LocalDateTime localDateTime = LocalDateTime.parse(dateTime);

            // Weather Data
            List<DailyForecastData> dailyForecastDataList = dailyWeatherDataService.getForecastByDate(localDateTime.toLocalDate());

            if (attraction == null || dailyForecastDataList.isEmpty()) {
                throw new IllegalArgumentException("Invalid attraction index or weather data not found for the given date.");
            }

            DailyForecastData dailyForecastData = dailyForecastDataList.get(0);

            double[] features = predictionService.prepareFeatures(attraction, dailyForecastData, localDateTime);

            // Print all the features
            predictionService.printFeatures(features);

            return predictionService.predict(features);
        } catch (Exception e) {
            e.printStackTrace();
            return new float[]{};
        }
    }

    @GetMapping("/predictAll")
    public Map<LocalDateTime, Map<Integer, Float>> predictAll(@RequestParam String startDate, @RequestParam String endDate) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        Map<LocalDateTime, Map<Integer, Float>> result = new TreeMap<>();

        List<Integer> taxiZoneIds = predictionService.getTaxiZoneIds();

        LocalDate currentDate = start;
        while (!currentDate.isAfter(end)) {
            for (int hour = 0; hour < 24; hour++) {
                LocalDateTime dateTime = currentDate.atTime(LocalTime.of(hour, 0));
                Map<Integer, Float> busynessMap = new TreeMap<>();
                for (int taxiZone : taxiZoneIds) {
                    try {
                        float[] prediction = predictionService.predictForTaxiZone(taxiZone, dateTime);
                        busynessMap.put(taxiZone, prediction[0]);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
                result.put(dateTime, busynessMap);
            }
            currentDate = currentDate.plusDays(1);
        }
        return result;
    }

}
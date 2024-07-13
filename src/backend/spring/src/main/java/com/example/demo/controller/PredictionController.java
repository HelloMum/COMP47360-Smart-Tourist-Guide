package com.example.demo.controller;

import com.example.demo.service.AttractionService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.example.demo.service.PredictionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import ml.dmlc.xgboost4j.java.XGBoostError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;

@RestController
@RequestMapping("/busyness")
public class PredictionController {

    @Autowired
    private PredictionService predictionService;

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

    @Autowired
    private AttractionService attractionService;


    @PostMapping("/predict_by_attraction_id")
    public float predict(@RequestParam int attractionIndex, @RequestParam String dateTime) {
        try {
            // Parse the dateTime string to LocalDateTime
            DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
            LocalDateTime localDateTime = LocalDateTime.parse(dateTime, formatter);

            // Get the taxi zone of the attraction by its index
            int attractionZone = attractionService.getAttractionByIndex(attractionIndex).getTaxi_zone();

            // Get busyness value from the JSON data
            return predictionService.getBusynessByZoneFromJson(attractionZone, localDateTime);
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Invalid dateTime format. Please use ISO_LOCAL_DATE_TIME format.", e);
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    @PostMapping("/predict_by_taxi_zone")
    public float predictByTaxiZone(@RequestParam int taxiZone, @RequestParam String dateTime) {
        try {
            // Parse the dateTime string to LocalDateTime
            DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
            LocalDateTime localDateTime = LocalDateTime.parse(dateTime, formatter);

            // Get busyness value from the JSON data
            return predictionService.getBusynessByZoneFromJson(taxiZone, localDateTime);
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Invalid dateTime format. Please use ISO_LOCAL_DATE_TIME format.", e);
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    @PostMapping("/predict_all_sort_by_date_range")
    public Map<String, Map<Integer, Float>> predictByDateRange(@RequestParam String startDate, @RequestParam String endDate) {
        Map<String, Map<Integer, Float>> result = new TreeMap<>();
        try {
            LocalDate start = LocalDate.parse(startDate);
            LocalDate end = LocalDate.parse(endDate);

            // Load predictions from JSON file
            ObjectMapper mapper = new ObjectMapper();
            String path = "src/main/resources/busyness_predictions.json";
            TypeReference<Map<Integer, Map<String, Map<String, Float>>>> typeRef = new TypeReference<>() {};
            Map<Integer, Map<String, Map<String, Float>>> predictions = mapper.readValue(new File(path), typeRef);

            // Loop through each day in the date range
            for (LocalDate date = start; !date.isAfter(end); date = date.plusDays(1)) {
                String dateKey = date.toString();

                // Loop through each hour of the day
                for (int hour = 0; hour < 24; hour++) {
                    LocalDateTime dateTime = LocalDateTime.of(date, LocalTime.of(hour, 0));
                    String dateTimeKey = dateTime.toString();
                    Map<Integer, Float> hourlyPredictions = new TreeMap<>();

                    // Loop through each taxi zone
                    for (Map.Entry<Integer, Map<String, Map<String, Float>>> zoneEntry : predictions.entrySet()) {
                        int taxiZone = zoneEntry.getKey();
                        Map<String, Map<String, Float>> dateMap = zoneEntry.getValue();

                        if (dateMap.containsKey(dateKey)) {
                            Map<String, Float> timeMap = dateMap.get(dateKey);
                            if (timeMap.containsKey(dateTimeKey)) {
                                float prediction = timeMap.get(dateTimeKey);
                                hourlyPredictions.put(taxiZone, prediction);
                            } else {
                                hourlyPredictions.put(taxiZone, -1.0f);
                            }
                        } else {
                            hourlyPredictions.put(taxiZone, -1.0f);
                        }
                    }
                    result.put(dateTimeKey, hourlyPredictions);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @PostMapping("/predict_all_sort_by_zone")
    public Map<Integer, Map<String, Map<String, Float>>> predictAllSortByDateRange(@RequestParam String startDate, @RequestParam String endDate) {
        Map<Integer, Map<String, Map<String, Float>>> result = new TreeMap<>();
        try {
            LocalDate start = LocalDate.parse(startDate);
            LocalDate end = LocalDate.parse(endDate);

            // Load predictions from JSON file
            ObjectMapper mapper = new ObjectMapper();
            String path = "src/main/resources/busyness_predictions.json";
            TypeReference<Map<Integer, Map<String, Map<String, Float>>>> typeRef = new TypeReference<>() {};
            Map<Integer, Map<String, Map<String, Float>>> predictions = mapper.readValue(new File(path), typeRef);

            // Loop through each day in the date range
            for (LocalDate date = start; !date.isAfter(end); date = date.plusDays(1)) {
                String dateKey = date.toString();

                // Loop through each taxi zone
                for (Map.Entry<Integer, Map<String, Map<String, Float>>> zoneEntry : predictions.entrySet()) {
                    int taxiZone = zoneEntry.getKey();
                    Map<String, Map<String, Float>> dateMap = zoneEntry.getValue();

                    if (dateMap.containsKey(dateKey)) {
                        Map<String, Float> hourlyPredictions = dateMap.get(dateKey);

                        // Add to result map
                        result.computeIfAbsent(taxiZone, k -> new TreeMap<>())
                                .put(dateKey, hourlyPredictions);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

}
package com.example.demo.controller;

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


    @PostMapping("/predict_by_attraction_id")
    public float predict(@RequestParam int attractionIndex, @RequestParam String dateTime) {
        try {
            LocalDateTime localDateTime = LocalDateTime.parse(dateTime);
            return predictionService.predictByAttractionId(attractionIndex, localDateTime);
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    @PostMapping("/predict_by_taxi_zone")
    public float predictByTaxiZone(@RequestParam int taxiZone, @RequestParam String dateTime) {
        try {
            LocalDateTime localDateTime = LocalDateTime.parse(dateTime);
            System.out.println("Predict by taxi zone called with taxiZone: " + taxiZone + " and dateTime: " + dateTime);
            float prediction = predictionService.predictByTaxiZone(taxiZone, localDateTime);
            System.out.println("Prediction for taxiZone " + taxiZone + ": " + prediction);
            return prediction;
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
//    public Map<String, Map<Integer, Float>> predictByDateRange(@RequestParam String startDate, @RequestParam String endDate) {
//        Map<String, Map<Integer, Float>> result = new TreeMap<>();
//        try {
//            LocalDate start = LocalDate.parse(startDate);
//            LocalDate end = LocalDate.parse(endDate);
//
//            // Read taxi zones from CSV
//            List<Integer> taxiZones = readTaxiZonesFromCSV();
//
//            // Loop through each day in the date range
//            for (LocalDate date = start; !date.isAfter(end); date = date.plusDays(1)) {
//                // Loop through each hour of the day
//                for (int hour = 0; hour < 24; hour++) {
//                    LocalDateTime dateTime = LocalDateTime.of(date, LocalTime.of(hour, 0));
//                    String dateTimeKey = dateTime.toString();
//                    Map<Integer, Float> hourlyPredictions = new TreeMap<>();
//
//                    // Loop through each taxi zone
//                    for (int taxiZone : taxiZones) {
//                        try {
//                            System.out.println("Predicting for dateTime: " + dateTimeKey + " taxiZone: " + taxiZone);
//
//                            float prediction = predictionService.predictByTaxiZone(taxiZone, dateTime);
//                            System.out.println("Prediction for taxiZone " + taxiZone + ": " + prediction);
//
//                            hourlyPredictions.put(taxiZone, prediction);
//                        } catch (IllegalArgumentException e) {
//                            System.err.println("Mean or standard deviation not found for key: " + taxiZone + "_" + dateTime.getDayOfMonth() + "_" + dateTime.getHour());
//                            hourlyPredictions.put(taxiZone, -1.0f);
//                        } catch (XGBoostError e) {
//                            e.printStackTrace();
//                            hourlyPredictions.put(taxiZone, -1.0f);
//                        }
//                    }
//                    result.put(dateTimeKey, hourlyPredictions);
//                }
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return result;
//    }

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

    private List<Integer> readTaxiZonesFromCSV() throws IOException {
        List<Integer> taxiZones = new ArrayList<>();
        ClassPathResource resource = new ClassPathResource("manhattan_taxi_zones_id.csv");
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(resource.getInputStream()))) {
            String line = reader.readLine();
            while ((line = reader.readLine()) != null) {
                taxiZones.add(Integer.parseInt(line.trim()));
            }
        }
        return taxiZones;
    }
}
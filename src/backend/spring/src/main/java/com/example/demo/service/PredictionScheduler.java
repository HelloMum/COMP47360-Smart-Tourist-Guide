package com.example.demo.service;

import ml.dmlc.xgboost4j.java.XGBoostError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@Service
public class PredictionScheduler {

    @Autowired
    private PredictionService predictionService;

    @Scheduled(fixedRate = 3600000)
    public void calculateAndSaveBusyness() {
        LocalDate startDate = LocalDate.now();
        LocalDate endDate = startDate.plusDays(31);
        Map<Integer, Map<String, Map<String, Float>>> result = new TreeMap<>();

        try {
            // Read taxi zones from CSV
            List<Integer> taxiZones = readTaxiZonesFromCSV();

            // Loop through each day in the date range
            for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
                String dateKey = date.toString();

                // Loop through each taxi zone
                for (int taxiZone : taxiZones) {
                    Map<String, Map<String, Float>> dateMap = result.computeIfAbsent(taxiZone, k -> new TreeMap<>());
                    Map<String, Float> hourlyPredictions = dateMap.computeIfAbsent(dateKey, k -> new TreeMap<>());

                    // Loop through each hour of the day
                    for (int hour = 0; hour < 24; hour++) {
                        LocalDateTime dateTime = LocalDateTime.of(date, LocalTime.of(hour, 0));
                        String timeKey = dateTime.toString();
                        try {
                            System.out.println("Predicting for dateTime: " + timeKey + " taxiZone: " + taxiZone);
                            float prediction = predictionService.predictByTaxiZone(taxiZone, dateTime);
                            System.out.println("Prediction for taxiZone " + taxiZone + ": " + prediction);
                            hourlyPredictions.put(timeKey, prediction);
                        } catch (IllegalArgumentException e) {
                            hourlyPredictions.put(timeKey, -1.0f);
                        } catch (XGBoostError e) {
                            e.printStackTrace();
                            hourlyPredictions.put(timeKey, -1.0f);
                        }
                    }
                }
            }

            // Save result to JSON file
            saveResultToJson(result);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void saveResultToJson(Map<Integer, Map<String, Map<String, Float>>> result) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            mapper.writeValue(new File("src//main/resources/busyness_predictions.json"), result);
        } catch (IOException e) {
            e.printStackTrace();
        }
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
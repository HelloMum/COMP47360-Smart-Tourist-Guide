package com.example.demo.controller;

import com.example.demo.model.Attraction;
import com.example.demo.model.DailyForecastData;
import com.example.demo.service.AttractionService;
import com.example.demo.service.DailyWeatherDataService;
import com.example.demo.service.PredictionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
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

    @PostMapping("/predict_by_attraction_id")
    public float[] predict(@RequestParam int attractionIndex, @RequestParam String dateTime) {
        try {
            Attraction attraction = attractionService.getAttractionByIndex(attractionIndex);
            LocalDateTime localDateTime = LocalDateTime.parse(dateTime);

            List<DailyForecastData> dailyForecastDataList = dailyWeatherDataService.getForecastByDate(localDateTime.toLocalDate());

            if (attraction == null || dailyForecastDataList.isEmpty()) {
                throw new IllegalArgumentException("Invalid attraction index or weather data not found for the given date.");
            }

            DailyForecastData dailyForecastData = dailyForecastDataList.get(0);

            double[] features = predictionService.createFeatures(attraction, dailyForecastData, localDateTime);

            return predictionService.predict(features);
        } catch (Exception e) {
            e.printStackTrace();
            return new float[]{};
        }
    }

    @PostMapping("/predict_by_taxi_zone")
    public float[] predictByTaxiZone(@RequestParam int taxiZone, @RequestParam String dateTime) {
        try {
            LocalDateTime localDateTime = LocalDateTime.parse(dateTime);
            System.out.println("Predict by taxi zone called with taxiZone: " + taxiZone + " and dateTime: " + dateTime);

            // Weather Data
            List<DailyForecastData> dailyForecastDataList = dailyWeatherDataService.getForecastByDate(localDateTime.toLocalDate());

            if (dailyForecastDataList.isEmpty()) {
                throw new IllegalArgumentException("Weather data not found for the given date.");
            }

            DailyForecastData dailyForecastData = dailyForecastDataList.get(0);
            System.out.println("Weather data for " + dateTime + ": " + dailyForecastData);

            double[] features = predictionService.createFeaturesByTaxiZone(taxiZone, dailyForecastData, localDateTime);
            System.out.println("Features for taxiZone " + taxiZone + ": " + Arrays.toString(features));

            float[] prediction = predictionService.predict(features);
            System.out.println("Prediction for taxiZone " + taxiZone + ": " + Arrays.toString(prediction));

            return prediction;
        } catch (Exception e) {
            e.printStackTrace();
            return new float[]{};
        }
    }


    @PostMapping("/predict_by_date_range")
    public Map<String, Map<Integer, float[]>> predictByDateRange(@RequestParam String startDate, @RequestParam String endDate) {
        Map<String, Map<Integer, float[]>> result = new TreeMap<>();
        try {
            LocalDate start = LocalDate.parse(startDate);
            LocalDate end = LocalDate.parse(endDate);

            // Read taxi zones from CSV
            List<Integer> taxiZones = readTaxiZonesFromCSV();

            // Loop through each day in the date range
            for (LocalDate date = start; !date.isAfter(end); date = date.plusDays(1)) {
                // Get weather data for the day
                List<DailyForecastData> dailyForecastDataList = dailyWeatherDataService.getForecastByDate(date);

                if (dailyForecastDataList.isEmpty()) {
                    continue;
                }

                DailyForecastData dailyForecastData = dailyForecastDataList.get(0);

                // Loop through each hour of the day
                for (int hour = 0; hour < 24; hour++) {
                    LocalDateTime dateTime = LocalDateTime.of(date, LocalTime.of(hour, 0));
                    String dateTimeKey = dateTime.toString();
                    Map<Integer, float[]> hourlyPredictions = new TreeMap<>();

                    // Loop through each taxi zone
                    for (int taxiZone : taxiZones) {
                        System.out.println("Predicting for dateTime: " + dateTimeKey + " taxiZone: " + taxiZone);
                        System.out.println("Weather data: " + dailyForecastData);

                        double[] features = predictionService.createFeaturesByTaxiZone(taxiZone, dailyForecastData, dateTime);
                        System.out.println("Features for taxiZone " + taxiZone + ": " + Arrays.toString(features));

                        float[] prediction = predictionService.predict(features);
                        System.out.println("Prediction for taxiZone " + taxiZone + ": " + Arrays.toString(prediction));

                        hourlyPredictions.put(taxiZone, prediction);
                    }
                    result.put(dateTimeKey, hourlyPredictions);
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
            String line = reader.readLine(); // Skip header
            while ((line = reader.readLine()) != null) {
                taxiZones.add(Integer.parseInt(line.trim()));
            }
        }
        return taxiZones;
    }
}
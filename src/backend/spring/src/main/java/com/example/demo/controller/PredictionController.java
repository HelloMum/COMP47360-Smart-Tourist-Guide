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
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @PostMapping("/predict")
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

            double[] features = createFeatures(attraction, dailyForecastData, localDateTime);

            // Print all the features
            printFeatures(features);

            return predictionService.predict(features);
        } catch (Exception e) {
            e.printStackTrace();
            return new float[]{};
        }
    }

    private double[] createFeatures(Attraction attraction, DailyForecastData dailyForecastData, LocalDateTime dateTime) {
        // Prepare features array
        double[] features = new double[predictionService.getExpectedFeaturesSize()];

        // Map attraction and weather data to features
        features[predictionService.getFeatureIndex("taxi_zone")] = attraction.getTaxi_zone();
        features[predictionService.getFeatureIndex("temperature_2m (°C)")] = dailyForecastData.getTempDay();
        features[predictionService.getFeatureIndex("rain (mm)")] = dailyForecastData.getRain();
        features[predictionService.getFeatureIndex("snow_depth (m)")] = 0;  // Assuming no snow depth data
        features[predictionService.getFeatureIndex("snowfall (cm)")] = dailyForecastData.getSnow();
        features[predictionService.getFeatureIndex("wind_speed_10m (km/h)")] = dailyForecastData.getSpeed();

        // Date-based features
        features[predictionService.getFeatureIndex("day")] = dateTime.getDayOfMonth();
        features[predictionService.getFeatureIndex("day_of_week")] = dateTime.getDayOfWeek().getValue();
        features[predictionService.getFeatureIndex("is_weekend")] = (dateTime.getDayOfWeek().getValue() == 6 || dateTime.getDayOfWeek().getValue() == 7) ? 1 : 0;
        features[predictionService.getFeatureIndex("quarter")] = (dateTime.getMonthValue() - 1) / 3 + 1;

        // Day of the week features
        for (String day : new String[]{"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"}) {
            features[predictionService.getFeatureIndex("week_" + day)] = (dateTime.getDayOfWeek().toString().equalsIgnoreCase(day)) ? 1 : 0;
        }

        // Holidays features
        LocalDate date = dateTime.toLocalDate();
        String holiday = usHolidays.getOrDefault(date, "No");

        // Initialize all holiday features to 0
        for (String holidayFeature : new String[]{
                "holiday_Christmas Day", "holiday_Christmas Day (observed)", "holiday_Columbus Day",
                "holiday_Independence Day", "holiday_Juneteenth National Independence Day",
                "holiday_Juneteenth National Independence Day (observed)", "holiday_Labor Day",
                "holiday_Martin Luther King Jr. Day", "holiday_Memorial Day", "holiday_New Year's Day",
                "holiday_New Year's Day (observed)", "holiday_No", "holiday_Thanksgiving",
                "holiday_Veterans Day", "holiday_Veterans Day (observed)", "holiday_Washington's Birthday"
        }) {
            features[predictionService.getFeatureIndex(holidayFeature)] = 0;
        }

        // Set the corresponding holiday feature to 1
        if (!holiday.equals("No")) {
            features[predictionService.getFeatureIndex("holiday_" + holiday)] = 1;
        } else {
            features[predictionService.getFeatureIndex("holiday_No")] = 1;
        }

        // Month features
        for (int i = 1; i <= 12; i++) {
            features[predictionService.getFeatureIndex("month_" + i)] = (dateTime.getMonthValue() == i) ? 1 : 0;
        }

        // Hour features
        for (int i = 0; i < 24; i++) {
            features[predictionService.getFeatureIndex("hour_" + i)] = (dateTime.getHour() == i) ? 1 : 0;
        }

        return features;
    }

    private void printFeatures(double[] features) {
        List<String> featureNames = predictionService.getExpectedFeatures();
        System.out.println("Features:");
        for (int i = 0; i < features.length; i++) {
            System.out.println(featureNames.get(i) + ": " + features[i]);
        }
    }
}
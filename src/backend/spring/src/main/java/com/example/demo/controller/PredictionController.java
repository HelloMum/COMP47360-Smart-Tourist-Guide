package com.example.demo.controller;

import com.example.demo.model.Attraction;
import com.example.demo.model.DailyForecastData;
import com.example.demo.service.AttractionService;
import com.example.demo.service.DailyWeatherDataService;
import com.example.demo.service.PredictionService;
import ml.dmlc.xgboost4j.java.XGBoostError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/busyness")
public class PredictionController {

    @Autowired
    private PredictionService predictionService;

    @Autowired
    private AttractionService attractionService;

    @Autowired
    private DailyWeatherDataService dailyWeatherDataService;

    @PostMapping("/predict")
    public float[] predict(@RequestParam int attractionIndex, @RequestParam String date) {
        try {
            // Attraction Data
            Attraction attraction = attractionService.getAttractionByIndex(attractionIndex);
            LocalDate localDate = LocalDate.parse(date);

            // Weather Data
            List<DailyForecastData> dailyForecastDataList = dailyWeatherDataService.getForecastByDate(localDate);

            if (attraction == null || dailyForecastDataList.isEmpty()) {
                throw new IllegalArgumentException("Invalid attraction index or weather data not found for the given date.");
            }

            DailyForecastData dailyForecastData = dailyForecastDataList.get(0);

            double[] features = createFeatures(attraction, dailyForecastData);

            return predictionService.predict(features);
        } catch (Exception e) {
            e.printStackTrace();
            return new float[]{};
        }
    }

    private double[] createFeatures(Attraction attraction, DailyForecastData dailyForecastData) {
        return new double[]{
                attraction.getAttractionLatitude(),
                attraction.getAttractionLongitude(),
                attraction.getAttractionRating(),
                dailyForecastData.getTempDay(),
                dailyForecastData.getRain(),
                dailyForecastData.getSpeed()
        };
    }
}
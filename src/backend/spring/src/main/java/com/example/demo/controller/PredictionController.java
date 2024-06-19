package com.example.demo.controller;

import com.example.demo.service.PredictionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class PredictionController {

    @Autowired
    private PredictionService predictionService;

    @PostMapping("/predict")
    public float[] predict(@RequestBody Map<String, Double> featureMap) {
        // Convert the feature map to an array
        double[] features = convertFeatureMapToArray(featureMap);
        try {
            return predictionService.predict(features);
        } catch (Exception e) {
            e.printStackTrace();
            return new float[]{};
        }
    }

    private double[] convertFeatureMapToArray(Map<String, Double> featureMap) {
        // Assuming the order of features is known and fixed
        String[] featureNames = {
                "taxi_zone", "temperature_2m (°C)", "rain (mm)", "snow_depth (m)", "snowfall (cm)",
                "wind_speed_10m (km/h)", "day", "day_of_week", "is_weekend", "quarter", "week_Friday",
                "week_Monday", "week_Saturday", "week_Sunday", "week_Thursday", "week_Tuesday",
                "week_Wednesday", "holiday_Christmas Day", "holiday_Christmas Day (observed)",
                "holiday_Columbus Day", "holiday_Independence Day", "holiday_Juneteenth National Independence Day",
                "holiday_Juneteenth National Independence Day (observed)", "holiday_Labor Day",
                "holiday_Martin Luther King Jr. Day", "holiday_Memorial Day", "holiday_New Year's Day",
                "holiday_New Year's Day (observed)", "holiday_No", "holiday_Thanksgiving",
                "holiday_Veterans Day", "holiday_Veterans Day (observed)", "holiday_Washington's Birthday",
                "month_1", "month_2", "month_3", "month_4", "month_5", "month_6", "month_7",
                "month_8", "month_9", "month_10", "month_11", "month_12", "hour_0", "hour_1",
                "hour_2", "hour_3", "hour_4", "hour_5", "hour_6", "hour_7", "hour_8", "hour_9",
                "hour_10", "hour_11", "hour_12", "hour_13", "hour_14", "hour_15", "hour_16",
                "hour_17", "hour_18", "hour_19", "hour_20", "hour_21", "hour_22", "hour_23"
        };
        double[] features = new double[featureNames.length];
        for (int i = 0; i < featureNames.length; i++) {
            features[i] = featureMap.getOrDefault(featureNames[i], 0.0);
        }
        return features;
    }
}
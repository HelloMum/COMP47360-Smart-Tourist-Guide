package com.example.demo.service;


import com.example.demo.model.Attraction;
import com.example.demo.model.DailyForecastData;
import ml.dmlc.xgboost4j.java.Booster;
import ml.dmlc.xgboost4j.java.DMatrix;
import ml.dmlc.xgboost4j.java.XGBoost;
import ml.dmlc.xgboost4j.java.XGBoostError;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.List;

@Service
public class PredictionService {

    private static final Logger logger = LoggerFactory.getLogger(PredictionService.class);
    private Booster booster;

    @Autowired
    private AttractionService attractionService;

    @Autowired
    private DailyWeatherDataService dailyWeatherDataService;

    // Define expected features based on the model input
    private final List<String> expected_features = Arrays.asList(
            "taxi_zone",
            "temperature_2m (°C)",
            "rain (mm)",
            "snow_depth (m)",
            "snowfall (cm)",
            "wind_speed_10m (km/h)",
            "day",
            "day_of_week",
            "is_weekend",
            "quarter",
            "week_Friday",
            "week_Monday",
            "week_Saturday",
            "week_Sunday",
            "week_Thursday",
            "week_Tuesday",
            "week_Wednesday",
            "holiday_Christmas Day",
            "holiday_Christmas Day (observed)",
            "holiday_Columbus Day",
            "holiday_Independence Day",
            "holiday_Juneteenth National Independence Day",
            "holiday_Juneteenth National Independence Day (observed)",
            "holiday_Labor Day",
            "holiday_Martin Luther King Jr. Day",
            "holiday_Memorial Day",
            "holiday_New Year's Day",
            "holiday_New Year's Day (observed)",
            "holiday_No",
            "holiday_Thanksgiving",
            "holiday_Veterans Day",
            "holiday_Veterans Day (observed)",
            "holiday_Washington's Birthday",
            "month_1",
            "month_2",
            "month_3",
            "month_4",
            "month_5",
            "month_6",
            "month_7",
            "month_8",
            "month_9",
            "month_10",
            "month_11",
            "month_12",
            "hour_0",
            "hour_1",
            "hour_2",
            "hour_3",
            "hour_4",
            "hour_5",
            "hour_6",
            "hour_7",
            "hour_8",
            "hour_9",
            "hour_10",
            "hour_11",
            "hour_12",
            "hour_13",
            "hour_14",
            "hour_15",
            "hour_16",
            "hour_17",
            "hour_18",
            "hour_19",
            "hour_20",
            "hour_21",
            "hour_22",
            "hour_23"
    );

    /**
     * Constructs a PredictionService and loads the XGBoost model.
     */
    public PredictionService() {
        try {
            // Load the XGBoost model
            ClassPathResource resource = new ClassPathResource("mlm/XGboost_model_depth_12_lr_0.1_estimators_200_2.bin");
            InputStream modelStream = resource.getInputStream();
            logger.info("Loading XGBoost model from: " + resource.getURL().getPath());
            booster = XGBoost.loadModel(modelStream);
            logger.info("XGBoost model loaded successfully.");
        } catch (IOException | XGBoostError e) {
            logger.error("Failed to load XGBoost model.", e);
        }
    }

    /**
     * Makes a prediction based on the attraction index and date.
     *
     * @param attractionIndex the index of the attraction.
     * @param date            the date for which data is required.
     * @return a float array containing the prediction results.
     * @throws XGBoostError if an error occurs during prediction.
     */
    public float[] predict(int attractionIndex, LocalDate date) throws XGBoostError {
        // Get attraction data
        Attraction attraction = attractionService.getAttractionByIndex(attractionIndex);

        // Get weather data for the given date
        LocalDate targetDate = date.atStartOfDay(ZoneId.of("America/New_York")).toLocalDate();
        DailyForecastData dailyForecastData = dailyWeatherDataService.getForecastByDate(targetDate).get(0);

        // Prepare features for prediction
        double[] features = prepareFeatures(attraction, dailyForecastData);

        // Call the predict method that accepts double[]
        return predict(features);
    }

    /**
     * Makes a prediction based on the input features.
     *
     * @param features an array of double values representing the input features.
     * @return a float array containing the prediction results.
     * @throws XGBoostError if an error occurs during prediction.
     */
    public float[] predict(double[] features) throws XGBoostError {
        // Convert features to float array
        float[] floatFeatures = new float[features.length];
        for (int i = 0; i < features.length; i++) {
            floatFeatures[i] = (float) features[i];
        }

        // Create DMatrix from the float array
        DMatrix dmatrix;
        try {
            dmatrix = new DMatrix(floatFeatures, 1, features.length, Float.NaN);
        } catch (XGBoostError e) {
            throw new RuntimeException("Failed to create DMatrix for prediction.", e);
        }

        // Predict
        try {
            float[][] predictions = booster.predict(dmatrix);
            return predictions[0];
        } catch (XGBoostError e) {
            throw new XGBoostError("Failed to make predictions with XGBoost model.", e);
        }
    }

    private double[] prepareFeatures(Attraction attraction, DailyForecastData dailyForecastData) {
        double[] features = new double[expected_features.size()];

        for (int i = 0; i < features.length; i++) {
            features[i] = 0.0;
        }

        // Map attraction and weather data to features
        features[expected_features.indexOf("taxi_zone")] = attraction.getTaxiZone();
        features[expected_features.indexOf("temperature_2m (°C)")] = dailyForecastData.getTempDay();
        features[expected_features.indexOf("rain (mm)")] = dailyForecastData.getRain();
        features[expected_features.indexOf("snow_depth (m)")] = 0;
        features[expected_features.indexOf("snowfall (cm)")] = dailyForecastData.getSnow();
        features[expected_features.indexOf("wind_speed_10m (km/h)")] = dailyForecastData.getSpeed();
        // Add more mappings as needed based on expected_features array

        return features;
    }
}

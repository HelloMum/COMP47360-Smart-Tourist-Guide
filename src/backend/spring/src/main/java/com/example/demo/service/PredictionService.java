package com.example.demo.service;

import com.example.demo.model.Attraction;
import com.example.demo.model.DailyForecastData;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import ml.dmlc.xgboost4j.java.Booster;
import ml.dmlc.xgboost4j.java.DMatrix;
import ml.dmlc.xgboost4j.java.XGBoost;
import ml.dmlc.xgboost4j.java.XGBoostError;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;


import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
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

    private static final Map<LocalDate, String> usHolidays = new HashMap<>();

    static {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            InputStream inputStream = PredictionService.class.getResourceAsStream("/us_holidays.json");
            Map<String, String> holidays = objectMapper.readValue(inputStream, HashMap.class);
            holidays.forEach((key, value) -> usHolidays.put(LocalDate.parse(key), value));

            InputStream geoJsonStream = PredictionService.class.getResourceAsStream("/manhattan_taxi_zones.geojson");
            JsonNode geoJson = objectMapper.readTree(geoJsonStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public float[] predictByTaxiZone(int taxiZone, LocalDateTime dateTime) throws XGBoostError {
        LocalDate date = dateTime.toLocalDate();
        List<DailyForecastData> dailyForecastDataList = dailyWeatherDataService.getForecastByDate(date);
        if (dailyForecastDataList.isEmpty()) {
            throw new IllegalArgumentException("Weather data not found for the given date.");
        }
        DailyForecastData dailyForecastData = dailyForecastDataList.get(0);

        double[] features = createFeaturesByTaxiZone(taxiZone, dailyForecastData, dateTime);
        return predict(features);
    }

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

    public PredictionService() {
        try {
            ClassPathResource resource = new ClassPathResource("mlm/XGboost_model_depth_12_lr_0.1_estimators_200_2.bin");
            InputStream modelStream = resource.getInputStream();
            logger.info("Loading XGBoost model from: " + resource.getURL().getPath());
            booster = XGBoost.loadModel(modelStream);
            logger.info("XGBoost model loaded successfully.");
        } catch (IOException | XGBoostError e) {
            logger.error("Failed to load XGBoost model.", e);
        }
    }

    public int getExpectedFeaturesSize() {
        return expected_features.size();
    }

    public int getFeatureIndex(String featureName) {
        return expected_features.indexOf(featureName);
    }

    public List<String> getExpectedFeatures() {
        return expected_features;
    }

    public float[] predict(double[] features) throws XGBoostError {
        float[] floatFeatures = new float[features.length];
        for (int i = 0; i < features.length; i++) {
            floatFeatures[i] = (float) features[i];
        }

        DMatrix dmatrix;
        try {
            dmatrix = new DMatrix(floatFeatures, 1, features.length, Float.NaN);
        } catch (XGBoostError e) {
            throw new RuntimeException("Failed to create DMatrix for prediction.", e);
        }

        try {
            float[][] predictions = booster.predict(dmatrix);
            return predictions[0];
        } catch (XGBoostError e) {
            throw new XGBoostError("Failed to make predictions with XGBoost model.", e);
        }
    }

    public double[] createFeatures(Attraction attraction, DailyForecastData dailyForecastData, LocalDateTime dateTime) {
        double[] features = new double[expected_features.size()];

        Arrays.fill(features, 0.0);

        features[getFeatureIndex("taxi_zone")] = attraction.getTaxi_zone();
        features[getFeatureIndex("temperature_2m (°C)")] = dailyForecastData.getTempDay();
        features[getFeatureIndex("rain (mm)")] = dailyForecastData.getRain();
        features[getFeatureIndex("snow_depth (m)")] = 0;
        features[getFeatureIndex("snowfall (cm)")] = dailyForecastData.getSnow();
        features[getFeatureIndex("wind_speed_10m (km/h)")] = dailyForecastData.getSpeed();

        features[getFeatureIndex("day")] = dateTime.getDayOfMonth();
        features[getFeatureIndex("day_of_week")] = dateTime.getDayOfWeek().getValue();
        features[getFeatureIndex("is_weekend")] = (dateTime.getDayOfWeek().getValue() == 6 || dateTime.getDayOfWeek().getValue() == 7) ? 1 : 0;
        features[getFeatureIndex("quarter")] = (dateTime.getMonthValue() - 1) / 3 + 1;

        for (String day : new String[]{"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"}) {
            features[getFeatureIndex("week_" + day)] = (dateTime.getDayOfWeek().toString().equalsIgnoreCase(day)) ? 1 : 0;
        }

        LocalDate date = dateTime.toLocalDate();
        String holiday = usHolidays.getOrDefault(date, "No");

        for (String holidayFeature : new String[]{
                "holiday_Christmas Day", "holiday_Christmas Day (observed)", "holiday_Columbus Day",
                "holiday_Independence Day", "holiday_Juneteenth National Independence Day",
                "holiday_Juneteenth National Independence Day (observed)", "holiday_Labor Day",
                "holiday_Martin Luther King Jr. Day", "holiday_Memorial Day", "holiday_New Year's Day",
                "holiday_New Year's Day (observed)", "holiday_No", "holiday_Thanksgiving",
                "holiday_Veterans Day", "holiday_Veterans Day (observed)", "holiday_Washington's Birthday"
        }) {
            features[getFeatureIndex(holidayFeature)] = 0;
        }

        if (!holiday.equals("No")) {
            features[getFeatureIndex("holiday_" + holiday)] = 1;
        } else {
            features[getFeatureIndex("holiday_No")] = 1;
        }

        for (int i = 1; i <= 12; i++) {
            features[getFeatureIndex("month_" + i)] = (dateTime.getMonthValue() == i) ? 1 : 0;
        }

        for (int i = 0; i < 24; i++) {
            features[getFeatureIndex("hour_" + i)] = (dateTime.getHour() == i) ? 1 : 0;
        }

        return features;
    }

    public float[] predictByAttractionId(int attractionId, LocalDateTime dateTime) throws XGBoostError {
        Attraction attraction = attractionService.getAttractionByIndex(attractionId);
        LocalDate date = dateTime.toLocalDate();
        List<DailyForecastData> dailyForecastDataList = dailyWeatherDataService.getForecastByDate(date);
        if (dailyForecastDataList.isEmpty()) {
            throw new IllegalArgumentException("Weather data not found for the given date.");
        }
        DailyForecastData dailyForecastData = dailyForecastDataList.get(0);
        double[] features = createFeatures(attraction, dailyForecastData, dateTime);
        return predict(features);
    }

    public double[] createFeaturesByTaxiZone(int taxiZone, DailyForecastData dailyForecastData, LocalDateTime dateTime) {
        double[] features = new double[expected_features.size()];

        Arrays.fill(features, 0.0);

        features[getFeatureIndex("taxi_zone")] = taxiZone;
        features[getFeatureIndex("temperature_2m (°C)")] = dailyForecastData.getTempDay();
        features[getFeatureIndex("rain (mm)")] = dailyForecastData.getRain();
        features[getFeatureIndex("snow_depth (m)")] = 0;
        features[getFeatureIndex("snowfall (cm)")] = dailyForecastData.getSnow();
        features[getFeatureIndex("wind_speed_10m (km/h)")] = dailyForecastData.getSpeed();

        features[getFeatureIndex("day")] = dateTime.getDayOfMonth();
        features[getFeatureIndex("day_of_week")] = dateTime.getDayOfWeek().getValue();
        features[getFeatureIndex("is_weekend")] = (dateTime.getDayOfWeek().getValue() == 6 || dateTime.getDayOfWeek().getValue() == 7) ? 1 : 0;
        features[getFeatureIndex("quarter")] = (dateTime.getMonthValue() - 1) / 3 + 1;

        for (String day : new String[]{"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"}) {
            features[getFeatureIndex("week_" + day)] = (dateTime.getDayOfWeek().toString().equalsIgnoreCase(day)) ? 1 : 0;
        }

        LocalDate date = dateTime.toLocalDate();
        String holiday = usHolidays.getOrDefault(date, "No");

        for (String holidayFeature : new String[]{
                "holiday_Christmas Day", "holiday_Christmas Day (observed)", "holiday_Columbus Day",
                "holiday_Independence Day", "holiday_Juneteenth National Independence Day",
                "holiday_Juneteenth National Independence Day (observed)", "holiday_Labor Day",
                "holiday_Martin Luther King Jr. Day", "holiday_Memorial Day", "holiday_New Year's Day",
                "holiday_New Year's Day (observed)", "holiday_No", "holiday_Thanksgiving",
                "holiday_Veterans Day", "holiday_Veterans Day (observed)", "holiday_Washington's Birthday"
        }) {
            features[getFeatureIndex(holidayFeature)] = 0;
        }

        if (!holiday.equals("No")) {
            features[getFeatureIndex("holiday_" + holiday)] = 1;
        } else {
            features[getFeatureIndex("holiday_No")] = 1;
        }

        for (int i = 1; i <= 12; i++) {
            features[getFeatureIndex("month_" + i)] = (dateTime.getMonthValue() == i) ? 1 : 0;
        }

        for (int i = 0; i < 24; i++) {
            features[getFeatureIndex("hour_" + i)] = (dateTime.getHour() == i) ? 1 : 0;
        }

        return features;
    }

    public float[] predictByTaxiZone(int taxiZone, DailyForecastData dailyForecastData, LocalDateTime dateTime) throws XGBoostError {
        double[] features = createFeaturesByTaxiZone(taxiZone, dailyForecastData, dateTime);
        return predict(features);
    }

}
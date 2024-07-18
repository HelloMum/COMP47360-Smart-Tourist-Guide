package com.example.demo.service;

import com.example.demo.model.DailyForecastData;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import ml.dmlc.xgboost4j.java.Booster;
import ml.dmlc.xgboost4j.java.DMatrix;
import ml.dmlc.xgboost4j.java.XGBoost;
import ml.dmlc.xgboost4j.java.XGBoostError;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class PredictionService {

    private static final Logger logger = LoggerFactory.getLogger(PredictionService.class);
    private Booster booster;

    @Autowired
    private DailyWeatherDataService dailyWeatherDataService;


    private final Map<String, Double> meanMap = new HashMap<>();
    private final Map<String, Double> stdMap = new HashMap<>();

    @PostConstruct
    public void init() {
        loadMeanStdData();
        loadHolidaysData();
    }

    private void loadMeanStdData() {
        try {
            ClassPathResource resource = new ClassPathResource("mean_std_data.csv");
            BufferedReader reader = new BufferedReader(new InputStreamReader(resource.getInputStream()));
            String line;
            reader.readLine(); // skip header
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",");
                if (parts.length >= 5) {
                    String key = parts[0] + "_" + parts[1] + "_" + parts[2];
                    meanMap.put(key, Double.parseDouble(parts[3]));
                    stdMap.put(key, Double.parseDouble(parts[4]));
                }
            }
            reader.close();
        } catch (Exception e) {
            logger.error("Failed to load mean and standard deviation data", e);
        }
    }

    private static final Map<LocalDate, String> usHolidays = new HashMap<>();

    private void loadHolidaysData() {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            InputStream inputStream = new ClassPathResource("us_holidays.json").getInputStream();
            Map<String, String> holidays = objectMapper.readValue(inputStream, HashMap.class);
            holidays.forEach((key, value) -> usHolidays.put(LocalDate.parse(key), value));

            InputStream geoJsonStream = new ClassPathResource("manhattan_taxi_zones.geojson").getInputStream();
            JsonNode geoJson = objectMapper.readTree(geoJsonStream);
        } catch (IOException e) {
            logger.error("Failed to load holiday or geoJSON data", e);
        }
    }

    private final List<String> expectedFeatures = Arrays.asList(
            "taxi_zone",
            "temperature_2m (°C)",
            "rain (mm)",
            "snowfall (cm)",
            "wind_speed_10m (km/h)",
            "day",
            "week_Friday",
            "week_Monday",
            "week_Saturday",
            "week_Sunday",
            "week_Thursday",
            "week_Tuesday",
            "week_Wednesday",
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
            "hour_23",
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
            "day_of_week_0",
            "day_of_week_1",
            "day_of_week_2",
            "day_of_week_3",
            "day_of_week_4",
            "day_of_week_5",
            "day_of_week_6",
            "is_weekend_0",
            "is_weekend_1",
            "quarter_1",
            "quarter_2",
            "quarter_3",
            "quarter_4"
    );

    public PredictionService() {
        try {
            ClassPathResource resource = new ClassPathResource("mlm/XGboost_improved_model_depth_9_lr_0.2_estimators_200.bin");
            InputStream modelStream = resource.getInputStream();
            logger.info("Loading XGBoost model from: " + resource.getURL().getPath());
            booster = XGBoost.loadModel(modelStream);
            logger.info("XGBoost model loaded successfully.");
        } catch (IOException | XGBoostError e) {
            logger.error("Failed to load XGBoost model.", e);
        }
    }

    public int getFeatureIndex(String featureName) {
        return expectedFeatures.indexOf(featureName);
    }

    public float predictByTaxiZone(int taxiZone, LocalDateTime dateTime) throws XGBoostError {
        LocalDate date = dateTime.toLocalDate();
        List<DailyForecastData> dailyForecastDataList = dailyWeatherDataService.getForecastByDate(date);
        if (dailyForecastDataList.isEmpty()) {
            throw new IllegalArgumentException("Weather data not found for the given date.");
        }
        DailyForecastData dailyForecastData = dailyForecastDataList.get(0);

        // Create features
        double[] features = new double[expectedFeatures.size()];
        Arrays.fill(features, 0.0);

        features[getFeatureIndex("taxi_zone")] = taxiZone;
        features[getFeatureIndex("temperature_2m (°C)")] = dailyForecastData.getTempDay();
        features[getFeatureIndex("rain (mm)")] = dailyForecastData.getRain();
        features[getFeatureIndex("snowfall (cm)")] = dailyForecastData.getSnow();
        features[getFeatureIndex("wind_speed_10m (km/h)")] = dailyForecastData.getSpeed();
        features[getFeatureIndex("day")] = dateTime.getDayOfMonth();

        for (String day : new String[]{"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"}) {
            features[getFeatureIndex("week_" + day)] = (dateTime.getDayOfWeek().toString().equalsIgnoreCase(day)) ? 1 : 0;
        }

        for (int i = 1; i <= 12; i++) {
            features[getFeatureIndex("month_" + i)] = (dateTime.getMonthValue() == i) ? 1 : 0;
        }

        for (int i = 0; i < 24; i++) {
            features[getFeatureIndex("hour_" + i)] = (dateTime.getHour() == i) ? 1 : 0;
        }

        String holiday = usHolidays.getOrDefault(date, "No");

        for (String holidayFeature : new String[]{
                "holiday_Christmas Day", "holiday_Christmas Day (observed)", "holiday_Columbus Day",
                "holiday_Independence Day", "holiday_Juneteenth National Independence Day",
                "holiday_Juneteenth National Independence Day (observed)", "holiday_Labor Day",
                "holiday_Martin Luther King Jr. Day", "holiday_Memorial Day", "holiday_New Year's Day",
                "holiday_New Year's Day (observed)", "holiday_No", "holiday_Thanksgiving",
                "holiday_Veterans Day", "holiday_Veterans Day (observed)", "holiday_Washington's Birthday"}) {
            features[getFeatureIndex(holidayFeature)] = 0;
        }

        if (!holiday.equals("No")) {
            features[getFeatureIndex("holiday_" + holiday)] = 1;
        } else {
            features[getFeatureIndex("holiday_No")] = 1;
        }

        int dayOfWeekIndex = dateTime.getDayOfWeek().getValue() - 1;
        features[getFeatureIndex("day_of_week_" + dayOfWeekIndex)] = 1;
        features[getFeatureIndex("is_weekend_1")] = (dateTime.getDayOfWeek().getValue() == 6 || dateTime.getDayOfWeek().getValue() == 7) ? 1 : 0;
        features[getFeatureIndex("is_weekend_0")] = (dateTime.getDayOfWeek().getValue() >= 1 && dateTime.getDayOfWeek().getValue() <= 5) ? 1 : 0;

        for (String quarterFeature : new String[]{"quarter_1", "quarter_2", "quarter_3", "quarter_4"}) {
            features[getFeatureIndex(quarterFeature)] = 0;
        }
        int quarter = (dateTime.getMonthValue() - 1) / 3 + 1;
        features[getFeatureIndex("quarter_" + quarter)] = 1;

        // Predict passenger count
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
            float passengerCount = (float) Math.expm1(predictions[0][0]);

            // Calculate busyness index
            String key = taxiZone + "_" + dateTime.getDayOfMonth() + "_" + dateTime.getHour();
            Double mean = meanMap.get(key);
            Double std = stdMap.get(key);

            if (mean == null || std == null) {
                throw new IllegalArgumentException("Mean or standard deviation not found for key: " + key);
            }

            double zScore = (passengerCount - mean) / std;
            int busynessIndex100 = (int) Math.min(Math.max((zScore + 4) / 8 * 100, 1), 100);

            // Range : 1 - 100
            return busynessIndex100;
        } catch (XGBoostError e) {
            throw new XGBoostError("Failed to make predictions with XGBoost model.", e);
        }
    }

    public float getBusynessByZoneFromMemory(int taxiZone, LocalDateTime dateTime) {
        try {
            // Get predictions from savedResult in PredictionScheduler
            Map<Integer, Map<String, Map<String, Float>>> savedResult = PredictionScheduler.getSavedResult();

            // Round dateTime to the nearest hour
            LocalDateTime roundedDateTime = dateTime.withMinute(0).withSecond(0).withNano(0);

            // Format date and time keys
            DateTimeFormatter dateFormatter = DateTimeFormatter.ISO_LOCAL_DATE;
            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
            String dateKey = dateFormatter.format(roundedDateTime.toLocalDate());
            String timeKey = timeFormatter.format(roundedDateTime);

            // Retrieve busyness prediction
            Map<String, Map<String, Float>> dateMap = savedResult.get(taxiZone);
            if (dateMap == null) {
                throw new IllegalArgumentException("Taxi zone not found: " + taxiZone);
            }

            Map<String, Float> timeMap = dateMap.get(dateKey);
            if (timeMap == null) {
                throw new IllegalArgumentException("Date not found for taxi zone " + taxiZone + ": " + dateKey);
            }

            Float prediction = timeMap.get(timeKey);
            if (prediction == null) {
                throw new IllegalArgumentException("Prediction not found for taxi zone " + taxiZone + " at time " + timeKey);
            }

            return prediction;

        } catch (Exception e) {
            e.printStackTrace();
            return -1.0f; // Handle error case
        }
    }
}
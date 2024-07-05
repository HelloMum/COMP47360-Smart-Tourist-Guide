package com.example.demo.service;

import com.example.demo.model.Attraction;
import com.example.demo.model.DailyForecastData;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import ml.dmlc.xgboost4j.java.Booster;
import ml.dmlc.xgboost4j.java.DMatrix;
import ml.dmlc.xgboost4j.java.XGBoost;
import ml.dmlc.xgboost4j.java.XGBoostError;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Service
public class PredictionService {

    private static final Logger logger = LoggerFactory.getLogger(PredictionService.class);
    private Booster booster;

    @Autowired
    private AttractionService attractionService;

    @Autowired
    private DailyWeatherDataService dailyWeatherDataService;

    private static final Map<LocalDate, String> usHolidays = new HashMap<>();

    private List<Integer> taxiZoneIds = new ArrayList<>();

    private List<GeoFeature> geoFeatures;

    private void loadGeoFeatures() {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            InputStream inputStream = new ClassPathResource("manhattan_taxi_zones.geojson").getInputStream();
            GeoFeatureCollection featureCollection = objectMapper.readValue(inputStream, GeoFeatureCollection.class);
            geoFeatures = featureCollection.getFeatures();
        } catch (IOException e) {
            e.printStackTrace();
            geoFeatures = new ArrayList<>();
        }
    }

    public int getTaxiZoneIdForEvent(double latitude, double longitude) {
        for (GeoFeature feature : geoFeatures) {
            if (feature.contains(latitude, longitude)) {
                return Integer.parseInt(feature.getProperties().getLocation_id());
            }
        }
        return -1; // Return -1 if no matching zone is found
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    private static class GeoFeatureCollection {
        private List<GeoFeature> features;

        public List<GeoFeature> getFeatures() {
            return features;
        }

        public void setFeatures(List<GeoFeature> features) {
            this.features = features;
        }
    }


    @JsonIgnoreProperties(ignoreUnknown = true)
    private static class GeoFeature {
        private Geometry geometry;
        private Properties properties;

        public Geometry getGeometry() {
            return geometry;
        }

        public void setGeometry(Geometry geometry) {
            this.geometry = geometry;
        }

        public Properties getProperties() {
            return properties;
        }

        public void setProperties(Properties properties) {
            this.properties = properties;
        }

        public boolean contains(double latitude, double longitude) {
            // Implement point-in-polygon check for MultiPolygon geometry type
            for (List<List<Double[]>> polygon : geometry.getCoordinates()) {
                for (List<Double[]> ring : polygon) {
                    if (isPointInPolygon(ring, latitude, longitude)) {
                        return true;
                    }
                }
            }
            return false;
        }

        private boolean isPointInPolygon(List<Double[]> polygon, double latitude, double longitude) {
            boolean result = false;
            int j = polygon.size() - 1;
            for (int i = 0; i < polygon.size(); i++) {
                if (polygon.get(i)[1] > latitude != polygon.get(j)[1] > latitude &&
                        longitude < (polygon.get(j)[0] - polygon.get(i)[0]) * (latitude - polygon.get(i)[1]) / (polygon.get(j)[1] - polygon.get(i)[1]) + polygon.get(i)[0]) {
                    result = !result;
                }
                j = i;
            }
            return result;
        }

        @JsonIgnoreProperties(ignoreUnknown = true)
        private static class Geometry {
            private String type;
            private List<List<List<Double[]>>> coordinates;

            public String getType() {
                return type;
            }

            public void setType(String type) {
                this.type = type;
            }

            public List<List<List<Double[]>>> getCoordinates() {
                return coordinates;
            }

            public void setCoordinates(List<List<List<Double[]>>> coordinates) {
                this.coordinates = coordinates;
            }
        }

        @JsonIgnoreProperties(ignoreUnknown = true)
        private static class Properties {
            @JsonProperty("location_id")
            private String locationId;

            public String getLocation_id() {
                return locationId;
            }

            public void setLocation_id(String locationId) {
                this.locationId = locationId;
            }
        }
    }

    static {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            InputStream inputStream = PredictionService.class.getResourceAsStream("/us_holidays.json");
            Map<String, String> holidays = objectMapper.readValue(inputStream, HashMap.class);
            holidays.forEach((key, value) -> usHolidays.put(LocalDate.parse(key), value));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

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
            ClassPathResource modelResource = new ClassPathResource("mlm/XGboost_model_depth_12_lr_0.1_estimators_200_2.bin");
            InputStream modelStream = modelResource.getInputStream();
            logger.info("Loading XGBoost model from: " + modelResource.getURL().getPath());
            booster = XGBoost.loadModel(modelStream);
            logger.info("XGBoost model loaded successfully.");

            // Load the taxi zone IDs from the CSV file
            Resource csvResource = new ClassPathResource("manhattan_taxi_zones_id.csv");
            BufferedReader reader = new BufferedReader(new InputStreamReader(csvResource.getInputStream()));
            taxiZoneIds = new ArrayList<>();
            String line;
            while ((line = reader.readLine()) != null) {
                // Skip the header
                if (line.trim().equals("attraction_id")) {
                    continue;
                }
                taxiZoneIds.add(Integer.parseInt(line.trim()));
            }
            reader.close();
            logger.info("Loaded taxi zone IDs successfully.");
            loadGeoFeatures();
        } catch (IOException | XGBoostError e) {
            logger.error("Failed to initialize PredictionService.", e);
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

    public List<Integer> getTaxiZoneIds() {
        return taxiZoneIds;
    }

    public float[] predictForTaxiZone(int taxiZone, LocalDateTime dateTime) throws XGBoostError {
        // Prepare features for prediction
        double[] features = prepareFeaturesForTaxiZone(taxiZone, dateTime);

        // Call the predict method that accepts double[]
        return predict(features);
    }

    private double[] prepareFeaturesForTaxiZone(int taxiZone, LocalDateTime dateTime) {
        double[] features = new double[expected_features.size()];

        for (int i = 0; i < features.length; i++) {
            features[i] = 0.0;
        }

        // Map taxi zone ID to features
        features[getFeatureIndex("taxi_zone")] = taxiZone;

        // Get weather data for the given date
        LocalDate targetDate = dateTime.toLocalDate().atStartOfDay(ZoneId.of("America/New_York")).toLocalDate();
        DailyForecastData dailyForecastData = dailyWeatherDataService.getForecastByDate(targetDate).get(0);

        // Map weather data to features
        features[getFeatureIndex("temperature_2m (°C)")] = dailyForecastData.getTempDay();
        features[getFeatureIndex("rain (mm)")] = dailyForecastData.getRain();
        features[getFeatureIndex("snow_depth (m)")] = 0;
        features[getFeatureIndex("snowfall (cm)")] = dailyForecastData.getSnow();
        features[getFeatureIndex("wind_speed_10m (km/h)")] = dailyForecastData.getSpeed();

        // Date-based features
        features[getFeatureIndex("day")] = dateTime.getDayOfMonth();
        features[getFeatureIndex("day_of_week")] = dateTime.getDayOfWeek().getValue();
        features[getFeatureIndex("is_weekend")] = (dateTime.getDayOfWeek().getValue() == 6 || dateTime.getDayOfWeek().getValue() == 7) ? 1 : 0;
        features[getFeatureIndex("quarter")] = (dateTime.getMonthValue() - 1) / 3 + 1;

        // Day of the week features
        for (String day : new String[]{"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"}) {
            features[getFeatureIndex("week_" + day)] = (dateTime.getDayOfWeek().toString().equalsIgnoreCase(day)) ? 1 : 0;
        }

        // Holiday features
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
            features[getFeatureIndex(holidayFeature)] = 0;
        }

        // Set the corresponding holiday feature to 1
        if (!holiday.equals("No")) {
            features[getFeatureIndex("holiday_" + holiday)] = 1;
        } else {
            features[getFeatureIndex("holiday_No")] = 1;
        }

        // Month features
        for (int i = 1; i <= 12; i++) {
            features[getFeatureIndex("month_" + i)] = (dateTime.getMonthValue() == i) ? 1 : 0;
        }
        // Hour features
        for (int i = 0; i < 24; i++) {
            features[getFeatureIndex("hour_" + i)] = (dateTime.getHour() == i) ? 1 : 0;
        }

        return features;
    }

    public double[] prepareFeatures(Attraction attraction, DailyForecastData dailyForecastData, LocalDateTime dateTime) {
        double[] features = new double[expected_features.size()];

        for (int i = 0; i < features.length; i++) {
            features[i] = 0.0;
        }

        // Map attraction and weather data to features
        features[getFeatureIndex("taxi_zone")] = attraction.getTaxi_zone();
        features[getFeatureIndex("temperature_2m (°C)")] = dailyForecastData.getTempDay();
        features[getFeatureIndex("rain (mm)")] = dailyForecastData.getRain();
        features[getFeatureIndex("snow_depth (m)")] = 0;
        features[getFeatureIndex("snowfall (cm)")] = dailyForecastData.getSnow();
        features[getFeatureIndex("wind_speed_10m (km/h)")] = dailyForecastData.getSpeed();

        // Date-based features
        features[getFeatureIndex("day")] = dateTime.getDayOfMonth();
        features[getFeatureIndex("day_of_week")] = dateTime.getDayOfWeek().getValue();
        features[getFeatureIndex("is_weekend")] = (dateTime.getDayOfWeek().getValue() == 6 || dateTime.getDayOfWeek().getValue() == 7) ? 1 : 0;
        features[getFeatureIndex("quarter")] = (dateTime.getMonthValue() - 1) / 3 + 1;

        // Day of the week features
        for (String day : new String[]{"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"}) {
            features[getFeatureIndex("week_" + day)] = (dateTime.getDayOfWeek().toString().equalsIgnoreCase(day)) ? 1 : 0;
        }

        // Holiday features
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
            features[getFeatureIndex(holidayFeature)] = 0;
        }

        // Set the corresponding holiday feature to 1
        if (!holiday.equals("No")) {
            features[getFeatureIndex("holiday_" + holiday)] = 1;
        } else {
            features[getFeatureIndex("holiday_No")] = 1;
        }

        // Month features
        for (int i = 1; i <= 12; i++) {
            features[getFeatureIndex("month_" + i)] = (dateTime.getMonthValue() == i) ? 1 : 0;
        }

        // Hour features
        for (int i = 0; i < 24; i++) {
            features[getFeatureIndex("hour_" + i)] = (dateTime.getHour() == i) ? 1 : 0;
        }

        return features;
    }

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

    public void printFeatures(double[] features) {
        List<String> featureNames = getExpectedFeatures();
        System.out.println("Features:");
        for (int i = 0; i < features.length; i++) {
            System.out.println(featureNames.get(i) + ": " + features[i]);
        }
    }
}
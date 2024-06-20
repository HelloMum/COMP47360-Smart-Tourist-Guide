package com.example.demo.service;

import ml.dmlc.xgboost4j.java.Booster;
import ml.dmlc.xgboost4j.java.XGBoostError;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for the PredictionService class.
 * <p>
 * This class tests the PredictionService using SpringJUnitConfig annotation,
 * which loads the specified configuration class for the test context.
 */
@SpringJUnitConfig(PredictionServiceTest.TestConfig.class)
public class PredictionServiceTest {

    @Configuration
    static class TestConfig {
        @Bean
        public PredictionService predictionService() {
            return new PredictionService();
        }
    }

    private PredictionService predictionService;

    /**
     * Sets up the test environment before each test method execution.
     * <p>
     * This method initializes the PredictionService instance.
     */
    @BeforeEach
    public void setUp() {
        predictionService = new PredictionService();
    }

    /**
     * Tests that the PredictionService is correctly loaded and initialized.
     * <p>
     * This test checks that the PredictionService instance is not null and
     * that the loaded model is an instance of Booster (XGBoost model).
     */
    @Test
    public void testModelLoading() {
        // Test that the predictionService is not null
        assertNotNull(predictionService, "PredictionService is null");

        // Test that the loaded model is an XGBoost model
        assertInstanceOf(Booster.class, predictionService.getBooster(), "Loaded model is not an XGBoost model");
    }

    /**
     * Tests the predict method of the PredictionService.
     * <p>
     * This test checks that the predict method returns a non-null prediction
     * for the given input features.
     *
     * @throws XGBoostError if an error occurs during prediction.
     */
    @Test
    public void testPredict() throws XGBoostError {
        // Test prediction with given input
        double[] features = {
                263, 25.0, 0.0, 0.0, 0.0, 10.0, 1, 3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        };

        float[] prediction = predictionService.predict(features);
        assertNotNull(prediction, "Prediction is null");
    }
}
package com.example.demo.service;

import ml.dmlc.xgboost4j.java.XGBoostError;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class PredictionServiceTest {

    private PredictionService predictionService;

    @BeforeEach
    public void setUp() throws XGBoostError {
        predictionService = new PredictionService();
    }

    @Test
    public void testModelLoading() {
        // Test that the model is loaded correctly
        assertNotNull(predictionService);
    }

    @Test
    public void testPredict() throws XGBoostError {
        // Test prediction
        double[] features = {1.0, 20.0, 0.0, 0.0, 0.0, 5.0, 15.0, 3.0, 0.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0,
                0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0,
                0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0};

        float[] prediction = predictionService.predict(features);
        assertNotNull(prediction);
    }
}
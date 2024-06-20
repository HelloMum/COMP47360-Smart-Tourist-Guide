package com.example.demo.controller;

import com.example.demo.service.PredictionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for handling prediction requests.
 * <p>
 * This controller provides an endpoint to receive input features and return
 * predictions based on a pre-trained XGBoost model.
 */
@RestController
@RequestMapping("/api")
public class PredictionController {

    @Autowired
    private PredictionService predictionService;

    /**
     * Handles POST requests to /api/predict and returns the prediction results.
     * <p>
     * @param featureStrings an array of strings representing the input features.
     * @return a float array containing the prediction results.
     */
    @PostMapping("/predict")
    public float[] predict(@RequestBody String[] featureStrings) {
        try {
            if (featureStrings == null || featureStrings.length == 0) {
                throw new IllegalArgumentException("Input features cannot be null or empty");
            }

            double[] features = new double[featureStrings.length];
            for (int i = 0; i < featureStrings.length; i++) {
                features[i] = Double.parseDouble(featureStrings[i]);
            }
            return predictionService.predict(features);
        } catch (Exception e) {
            e.printStackTrace();
            return new float[]{};
        }
    }
}
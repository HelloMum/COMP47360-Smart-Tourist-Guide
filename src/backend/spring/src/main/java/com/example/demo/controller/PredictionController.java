package com.example.demo.controller;

import com.example.demo.service.PredictionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PredictionController {

    @Autowired
    private PredictionService predictionService;

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
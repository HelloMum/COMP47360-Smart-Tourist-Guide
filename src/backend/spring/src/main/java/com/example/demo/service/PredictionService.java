package com.example.demo.service;

import ml.dmlc.xgboost4j.java.Booster;
import ml.dmlc.xgboost4j.java.DMatrix;
import ml.dmlc.xgboost4j.java.XGBoost;
import ml.dmlc.xgboost4j.java.XGBoostError;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;

/**
 * Service class for making predictions using a pre-trained XGBoost model.
 */
@Service
public class PredictionService {

    private static final Logger logger = LoggerFactory.getLogger(PredictionService.class);
    private Booster booster;

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
}

package com.example.demo.service;

import ml.dmlc.xgboost4j.java.Booster;
import ml.dmlc.xgboost4j.java.DMatrix;
import ml.dmlc.xgboost4j.java.XGBoost;
import ml.dmlc.xgboost4j.java.XGBoostError;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class PredictionService {

    private static final Logger logger = LoggerFactory.getLogger(PredictionService.class);
    private Booster booster;

    public PredictionService() {
        try {
            // Load the XGBoost model
            String modelPath = "../model/XGboost_model_depth_12_lr_0.1_estimators_200_2.bin";
            logger.info("Loading XGBoost model from: " + modelPath);
            booster = XGBoost.loadModel(modelPath);
            logger.info("XGBoost model loaded successfully.");
        } catch (XGBoostError e) {
            logger.error("Failed to load XGBoost model.", e);
        } catch (Exception e) {
            logger.error("Unexpected error during model loading.", e);
        }
    }

    public float[] predict(double[] features) throws XGBoostError {
        // Convert features to float array
        float[] floatFeatures = new float[features.length];
        for (int i = 0; i < features.length; i++) {
            floatFeatures[i] = (float) features[i];
        }

        // Create DMatrix from the float array
        DMatrix dmatrix = new DMatrix(floatFeatures, 1, features.length, Float.NaN);

        // Predict
        float[][] predictions = booster.predict(dmatrix);
        return predictions[0];
    }
}
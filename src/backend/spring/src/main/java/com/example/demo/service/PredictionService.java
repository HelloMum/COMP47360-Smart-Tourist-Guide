package com.example.demo.service;

import lombok.Getter;
import ml.dmlc.xgboost4j.java.Booster;
import ml.dmlc.xgboost4j.java.DMatrix;
import ml.dmlc.xgboost4j.java.XGBoost;
import ml.dmlc.xgboost4j.java.XGBoostError;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

/**
 * Service class for making predictions using a pre-trained XGBoost model.
 * <p>
 * This service loads the XGBoost model from the specified file in the classpath
 * and provides a method to make predictions based on input features.
 */
@Getter
@Service
public class PredictionService {

    private static final Logger logger = LoggerFactory.getLogger(PredictionService.class);
    private Booster booster;

    /**
     * Constructs a PredictionService and loads the XGBoost model.
     * <p>
     * The model file is expected to be located in the classpath at "mlm/XGboost_model_depth_12_lr_0.1_estimators_200_2.bin".
     * If the model file cannot be loaded, an error is logged.
     */
    public PredictionService() {
        try {
            // Load the XGBoost model
            File file = ResourceUtils.getFile("classpath:mlm/XGboost_model_depth_12_lr_0.1_estimators_200_2.bin");
            InputStream modelStream = new FileInputStream(file);
            logger.info("Loading XGBoost model from: " + file.getPath());
            booster = XGBoost.loadModel(modelStream);
            logger.info("XGBoost model loaded successfully.");
        } catch (XGBoostError e) {
            logger.error("Failed to load XGBoost model.", e);
        } catch (Exception e) {
            logger.error("Unexpected error during model loading.", e);
        }
    }

    /**
     * Makes a prediction based on the input features.
     * <p>
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
        DMatrix dmatrix = new DMatrix(floatFeatures, 1, features.length, Float.NaN);

        // Predict
        float[][] predictions = booster.predict(dmatrix);
        return predictions[0];
    }
}
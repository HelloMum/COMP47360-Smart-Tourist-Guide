package com.example.demo.controller;

import com.example.demo.service.PredictionService;
import ml.dmlc.xgboost4j.java.XGBoostError;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
// import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class PredictionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PredictionService predictionService;

    @BeforeEach
    public void setUp() throws XGBoostError {
        // Mock the prediction service to return a predefined prediction
        when(predictionService.predict(any(double[].class))).thenReturn(new float[]{0.5f});
    }

    @Test
    public void testPredictEndpoint() throws Exception {
        String featuresJson = "{"
                + "\"taxi_zone\": 1, \"temperature_2m (°C)\": 20, \"rain (mm)\": 0, \"snow_depth (m)\": 0, \"snowfall (cm)\": 0, "
                + "\"wind_speed_10m (km/h)\": 5, \"day\": 15, \"day_of_week\": 3, \"is_weekend\": 0, \"quarter\": 2, "
                + "\"week_Friday\": 0, \"week_Monday\": 0, \"week_Saturday\": 0, \"week_Sunday\": 0, \"week_Thursday\": 0, "
                + "\"week_Tuesday\": 1, \"week_Wednesday\": 0, \"holiday_Christmas Day\": 0, \"holiday_Christmas Day (observed)\": 0, "
                + "\"holiday_Columbus Day\": 0, \"holiday_Independence Day\": 0, \"holiday_Juneteenth National Independence Day\": 0, "
                + "\"holiday_Juneteenth National Independence Day (observed)\": 0, \"holiday_Labor Day\": 0, "
                + "\"holiday_Martin Luther King Jr. Day\": 0, \"holiday_Memorial Day\": 0, \"holiday_New Year's Day\": 0, "
                + "\"holiday_New Year's Day (observed)\": 0, \"holiday_No\": 1, \"holiday_Thanksgiving\": 0, \"holiday_Veterans Day\": 0, "
                + "\"holiday_Veterans Day (observed)\": 0, \"holiday_Washington's Birthday\": 0, \"month_1\": 0, \"month_2\": 0, "
                + "\"month_3\": 0, \"month_4\": 0, \"month_5\": 1, \"month_6\": 0, \"month_7\": 0, \"month_8\": 0, \"month_9\": 0, "
                + "\"month_10\": 0, \"month_11\": 0, \"month_12\": 0, \"hour_0\": 0, \"hour_1\": 0, \"hour_2\": 0, \"hour_3\": 0, "
                + "\"hour_4\": 0, \"hour_5\": 0, \"hour_6\": 0, \"hour_7\": 1, \"hour_8\": 0, \"hour_9\": 0, \"hour_10\": 0, "
                + "\"hour_11\": 0, \"hour_12\": 0, \"hour_13\": 0, \"hour_14\": 0, \"hour_15\": 0, \"hour_16\": 0, \"hour_17\": 0, "
                + "\"hour_18\": 0, \"hour_19\": 0, \"hour_20\": 0, \"hour_21\": 0, \"hour_22\": 0, \"hour_23\": 0"
                + "}";

        mockMvc.perform(post("/api/predict")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(featuresJson))
                .andExpect(status().isOk())
                .andExpect(content().json("[0.5]"));
    }
}
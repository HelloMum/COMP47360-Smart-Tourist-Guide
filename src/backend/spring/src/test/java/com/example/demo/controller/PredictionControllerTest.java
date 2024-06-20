package com.example.demo.controller;

import com.example.demo.service.PredictionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.junit.jupiter.api.Assertions.assertEquals;


@WebMvcTest(PredictionController.class)
public class PredictionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PredictionService predictionService;

    @BeforeEach
    public void setUp() throws Exception {
        // Mock the prediction service to return a predefined prediction
        when(predictionService.predict(any(double[].class))).thenReturn(new float[]{0.5f});
    }

    @Test
    public void testPredictEndpoint() throws Exception {
        String featuresJson = "[263, 25.0, 0.0, 0.0, 0.0, 10.0, 1, 3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]";

        mockMvc.perform(post("/api/predict")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(featuresJson))
                .andExpect(status().isOk())
                .andExpect(result -> {
                    String jsonResponse = result.getResponse().getContentAsString();
                    float[] predictedValue = new float[]{0.5f};
                    if (!jsonResponse.equals("[0.5]")) {
                        System.err.println("Did not get the expected response. Prediction is not accurate.");
                    }
                    assertEquals("[0.5]", jsonResponse, "Prediction is not accurate.");

                    // Check if the connection was established
                    int status = result.getResponse().getStatus();
                    if (status != 200) {
                        System.err.println("Connection to the endpoint was not established. Status code: " + status);
                    }
                    assertEquals(200, status, "Connection to the endpoint was not established.");
                });
    }
}
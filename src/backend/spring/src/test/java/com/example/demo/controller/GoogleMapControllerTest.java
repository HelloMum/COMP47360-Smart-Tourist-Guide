package com.example.demo.controller;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.beans.factory.annotation.Autowired;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(GoogleMapController.class)
@TestPropertySource(properties = {"google.maps.api.key=test-api-key"})
public class GoogleMapControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Value("${google.maps.api.key}")
    private String apiKey;

    @Test
    public void testGetApiKey() throws Exception {
        mockMvc.perform(get("/maps/key"))
                .andExpect(status().isOk())
                .andExpect(content().string("test-api-key"));
    }
}
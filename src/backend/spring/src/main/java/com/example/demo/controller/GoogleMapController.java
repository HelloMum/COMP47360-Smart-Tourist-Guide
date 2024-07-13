package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class GoogleMapController {

    @Value("${google.maps.api.key}")
    private String apiKey;

    @GetMapping("/maps/key")
    public String getApiKey() {
        return apiKey;
    }
}
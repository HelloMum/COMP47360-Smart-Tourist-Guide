package com.example.demo.scrapers;

import com.example.demo.model.EventData;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClientException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.List;

@Component
public class EventScraper {

    private static final Logger logger = LoggerFactory.getLogger(EventScraper.class);

    @Value("${yelp.api.key}")
    private String apiKey;

    @Value("${yelp.location}")
    private String location;

    @Value("${yelp.limit}")
    private int limit;

    public List<EventData> fetchYelpEvents(int offset, long startDate, long endDate) {
        RestTemplate restTemplate = new RestTemplate();
        String url = String.format("https://api.yelp.com/v3/events?location=%s&limit=%d&offset=%d&start_date=%d", location, limit, offset, startDate);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "application/json");
        headers.set("Authorization", "Bearer " + apiKey);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            logger.info("Requesting URL: " + url);
            ResponseEntity<YelpResponse> response = restTemplate.exchange(url, HttpMethod.GET, entity, YelpResponse.class);
            logger.info("Response received: " + response.getBody());
            return response.getBody().getEvents();
        } catch (HttpClientErrorException e) {
            logger.error("API request failed with status code: {}", e.getStatusCode());
            logger.error("Error response body: {}", e.getResponseBodyAsString());
        } catch (RestClientException e) {
            logger.error("API request failed: {}", e.getMessage());
        }

        return Collections.emptyList();
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    private static class YelpResponse {
        private List<EventData> events;

        public List<EventData> getEvents() {
            return events;
        }

        public void setEvents(List<EventData> events) {
            this.events = events;
        }
    }
}

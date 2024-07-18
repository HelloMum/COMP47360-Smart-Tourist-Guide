package com.example.demo.service;

import com.example.demo.model.Event;
import com.example.demo.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@Service
public class EventService {
    private static final Logger logger = LoggerFactory.getLogger(EventService.class);
    private List<GeoFeature> geoFeatures;

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getFilteredEventsWithinDateRange(String startDate, String endDate, Boolean isFree, List<String> combined_categories, String name) {
        return eventRepository.findFilteredEventsWithinDateRange(startDate, endDate, isFree, combined_categories, name);
    }

    public List<Event> getFilteredEventsWithoutDateRange(Boolean isFree, List<String> combined_categories, String name) {
        return eventRepository.findFilteredEventsWithoutDateRange(isFree, combined_categories, name);
    }

    public Event getEventById(UUID id) {
        Optional<Event> event = eventRepository.findById(id);
        return event.orElse(null);
    }

    public EventService() {
        loadGeoFeatures();
    }

    private void loadGeoFeatures() {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            InputStream inputStream = new ClassPathResource("manhattan_taxi_zones.geojson").getInputStream();
            GeoFeatureCollection featureCollection = objectMapper.readValue(inputStream, GeoFeatureCollection.class);
            geoFeatures = featureCollection.getFeatures();
        } catch (IOException e) {
            e.printStackTrace();
            geoFeatures = new ArrayList<>();
        }
    }

    public int getTaxiZoneIdByPosition(double latitude, double longitude) {
        for (GeoFeature feature : geoFeatures) {
            if (feature.contains(latitude, longitude)) {
                return Integer.parseInt(feature.getProperties().getLocationId());
            }
        }
        return -1;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    private static class GeoFeatureCollection {
        private List<GeoFeature> features;

        public List<GeoFeature> getFeatures() {
            return features;
        }

        public void setFeatures(List<GeoFeature> features) {
            this.features = features;
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    private static class GeoFeature {
        private Geometry geometry;
        private Properties properties;

        public Geometry getGeometry() {
            return geometry;
        }

        public void setGeometry(Geometry geometry) {
            this.geometry = geometry;
        }

        public Properties getProperties() {
            return properties;
        }

        public void setProperties(Properties properties) {
            this.properties = properties;
        }

        public boolean contains(double latitude, double longitude) {
            for (List<List<Double[]>> polygon : geometry.getCoordinates()) {
                for (List<Double[]> ring : polygon) {
                    if (isPointInPolygon(ring, latitude, longitude)) {
                        return true;
                    }
                }
            }
            return false;
        }

        private boolean isPointInPolygon(List<Double[]> polygon, double latitude, double longitude) {
            boolean result = false;
            int j = polygon.size() - 1;
            for (int i = 0; i < polygon.size(); i++) {
                if (polygon.get(i)[1] > latitude != polygon.get(j)[1] > latitude &&
                        longitude < (polygon.get(j)[0] - polygon.get(i)[0]) * (latitude - polygon.get(i)[1]) / (polygon.get(j)[1] - polygon.get(i)[1]) + polygon.get(i)[0]) {
                    result = !result;
                }
                j = i;
            }
            return result;
        }

        @JsonIgnoreProperties(ignoreUnknown = true)
        private static class Geometry {
            private String type;
            private List<List<List<Double[]>>> coordinates;

            public String getType() {
                return type;
            }

            public void setType(String type) {
                this.type = type;
            }

            public List<List<List<Double[]>>> getCoordinates() {
                return coordinates;
            }

            public void setCoordinates(List<List<List<Double[]>>> coordinates) {
                this.coordinates = coordinates;
            }
        }

        @JsonIgnoreProperties(ignoreUnknown = true)
        private static class Properties {
            @JsonProperty("location_id")
            private String locationId;

            public String getLocationId() {
                return locationId;
            }

            public void setLocationId(String locationId) {
                this.locationId = locationId;
            }
        }
    }

}

package com.example.demo.service;

import com.example.demo.model.Attraction;
import com.opencsv.CSVReader;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class AttractionServiceTest {

    private AttractionService attractionService;

    @BeforeEach
    public void setUp() throws Exception {
        attractionService = new AttractionService();
        InputStream testResource = getClass().getClassLoader().getResourceAsStream("attractions_test.csv");
        loadTestData(attractionService, testResource);
    }

    @Test
    public void testGetAttractionByIndex() {
        Attraction attraction = attractionService.getAttractionByIndex(1);
        assertThat(attraction).isNotNull();
        assertThat(attraction.getAttraction_name()).isEqualTo("Test Attraction 1");
    }

    @Test
    public void testFilterAndSortAttractions() {
        List<Attraction> attractions = attractionService.filterAndSortAttractions("Test", true, List.of("Art"), "price", "asc");
        assertThat(attractions).hasSize(1);
        assertThat(attractions.get(0).getAttraction_name()).isEqualTo("Test Attraction 1");
    }

    private void loadTestData(AttractionService attractionService, InputStream inputStream) throws Exception {
        List<Attraction> testAttractions = new ArrayList<>();
        CSVReader reader = new CSVReader(new InputStreamReader(inputStream));

        reader.readNext(); // Skip header

        String[] line;
        int lineNumber = 1;
        while ((line = reader.readNext()) != null) {
            lineNumber++;
            try {
                Attraction attraction = new Attraction();
                attraction.setTaxi_zone(Integer.parseInt(line[0]));
                attraction.setZone_name(line[1]);
                attraction.setAttraction_place_id(line[2]);
                attraction.setIndex(Integer.parseInt(line[3]));
                attraction.setAttraction_name(line[4]);
                attraction.setCategory(line[5]);
                attraction.setPrice(Double.parseDouble(line[6]));
                attraction.setFree(Boolean.parseBoolean(line[7]));
                attraction.setDescription(line[8]);
                attraction.setAttraction_latitude(Double.parseDouble(line[9]));
                attraction.setAttraction_longitude(Double.parseDouble(line[10]));
                attraction.setAttraction_vicinity(line[11]);
                attraction.setAttraction_rating(Double.parseDouble(line[12]));
                attraction.setUser_ratings_total(Integer.parseInt(line[13]));
                attraction.setAttraction_phone_number(line[14]);
                attraction.setAttractionWebsite(line[15]);
                attraction.setOpening_hours(line[16]);
                attraction.setPrice_level((int) Double.parseDouble(line[17]));
                attraction.setTypes(List.of(line[18].replace("[", "").replace("]", "").split(", ")));
                attraction.setInternational_phone_number(line[19]);
                attraction.setUrl(line[20]);
                attraction.setIcon(line[21]);
                attraction.setFormatted_hours(line[22]);
                attraction.setPopular_times(line[23]);
                attraction.setTime_spent(List.of(line[24].replace("[", "").replace("]", "").split(", ")));

                testAttractions.add(attraction);
            } catch (Exception e) {
                System.err.println("Error processing line " + lineNumber + ": " + e.getMessage());
            }
        }
        reader.close();

        Field attractionsField = AttractionService.class.getDeclaredField("attractions");
        attractionsField.setAccessible(true);
        attractionsField.set(attractionService, testAttractions);
    }
}
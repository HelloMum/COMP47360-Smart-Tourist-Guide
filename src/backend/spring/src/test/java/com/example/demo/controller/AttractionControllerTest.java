package com.example.demo.controller;

import com.example.demo.controller.AttractionController;
import com.example.demo.model.Attraction;
import com.example.demo.service.AttractionService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(AttractionController.class)
public class AttractionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AttractionService attractionService;

    private Attraction createTestAttraction() {
        Attraction attraction = new Attraction();
        attraction.setIndex(1);
        attraction.setAttraction_name("Times Square");
        attraction.setCategory("Landmark");
        attraction.setPrice(0);
        attraction.setFree(true);
        attraction.setDescription("Known as \"The Crossroads of the World,\" Times Square is a vibrant hub of entertainment, shopping, and dining. Famous for its bright lights, Broadway theaters, and bustling atmosphere, it's an iconic destination in New York City.");
        attraction.setAttraction_latitude(10);
        attraction.setAttraction_longitude(20);
        attraction.setAttraction_vicinity("NYC");
        attraction.setAttraction_rating(4.7);
        attraction.setUser_ratings_total(100);
        attraction.setAttraction_phone_number("+129387");
        attraction.setAttractionWebsite("https://www.timessquarenyc.org");
        attraction.setOpening_hours("09:00-00:00");
        attraction.setPrice_level(0);
        attraction.setTypes(List.of("tourist_attraction", "landmark"));
        attraction.setInternational_phone_number("null");
        attraction.setUrl("https://www.timessquarenyc.org");
        attraction.setIcon("https://www.timessquarenyc.org");
        attraction.setFormatted_hours("9 AM to 12 AM");
        attraction.setPopular_times("afternoon");
        attraction.setTime_spent(List.of("2-3 hours"));
        attraction.setCurrent_popularity(90);
        return attraction;
    }


    @Test
    public void testFilterAttractions() throws Exception {
        Attraction attraction = createTestAttraction();

        BDDMockito.given(attractionService.filterAndSortAttractions(null, null, null, "rating", "desc"))
                .willReturn(Collections.singletonList(attraction));

        mockMvc.perform(get("/attractions/filter"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].index", is(1)))
                .andExpect(jsonPath("$[0].attraction_name", is("Times Square")));
    }

    @Test
    public void testFilterAttractionsWithDate() throws Exception {
        Attraction attraction = createTestAttraction();

        LocalDate startDate = LocalDate.of(2024, 8, 1);
        LocalDate endDate = LocalDate.of(2024, 8, 2);

        BDDMockito.given(attractionService.filterAndSortAttractionsWithDate(null, null, null, "rating", "desc", startDate, endDate))
                .willReturn(Collections.singletonList(attraction));

        mockMvc.perform(get("/attractions/filter_within_date")
                        .param("startDate", "2024-08-01")
                        .param("endDate", "2024-08-02"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].index", is(1)))
                .andExpect(jsonPath("$[0].attraction_name", is("Times Square")));
    }
}
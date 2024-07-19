package com.example.demo.controller;

import com.example.demo.model.ItineraryItem;
import com.example.demo.model.UserSelection;
import com.example.demo.service.ItineraryService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(ItineraryController.class)
public class ItineraryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ItineraryService itineraryService;

    @Autowired
    private ObjectMapper objectMapper;

    private ItineraryItem createTestItineraryItem() {
        return new ItineraryItem(
                UUID.randomUUID(),
                "Test Itinerary Item",
                LocalDateTime.of(2024, 7, 20, 10, 0),
                LocalDateTime.of(2024, 7, 20, 12, 0),
                40.7128,
                -74.0060,
                true,
                true,
                "Tourism",
                "123 Test St",
                "http://testitem.com",
                "A test itinerary item",
                "http://testitem.com/image.jpg"
        );
    }

    @Test
    public void testCreateItinerary() throws Exception {
        UserSelection selection = new UserSelection();
        selection.setIds(Arrays.asList(UUID.randomUUID().toString(), UUID.randomUUID().toString()));

        LocalDate startDate = LocalDate.of(2024, 7, 20);
        LocalDate endDate = LocalDate.of(2024, 7, 25);

        Map<LocalDate, List<ItineraryItem>> itineraryMap = new HashMap<>();
        itineraryMap.put(startDate, Collections.singletonList(createTestItineraryItem()));

        BDDMockito.given(itineraryService.createItineraryFromSelection(selection.getIds(), startDate, endDate))
                .willReturn(itineraryMap);

        mockMvc.perform(post("/itinerary/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(selection))
                        .param("startDate", startDate.toString())
                        .param("endDate", endDate.toString()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$['2024-07-20']", hasSize(1)))
                .andExpect(jsonPath("$['2024-07-20'][0].name", is("Test Itinerary Item")));
    }
}
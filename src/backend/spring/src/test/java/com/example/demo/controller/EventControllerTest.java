package com.example.demo.controller;

import com.example.demo.model.Event;
import com.example.demo.service.EventService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.UUID;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(EventController.class)
public class EventControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EventService eventService;

    private Event createTestEvent() {
        return new Event(
                UUID.randomUUID(),
                "Test Event",
                40.7128,
                -74.0060,
                "Music",
                "Music,Concert",
                "A test music event",
                "http://testevent.com",
                "http://testevent.com/image.jpg",
                true,
                "2024-07-20T20:00:00",
                "2024-07-20T22:00:00",
                100,
                200,
                false,
                true,
                LocalDateTime.now(),
                "123 Test St",
                "Test City",
                "Test State",
                "12345"
        );
    }

    @Test
    public void testGetAllEvents() throws Exception {
        Event event = createTestEvent();

        BDDMockito.given(eventService.getFilteredEventsWithoutDateRange(true, Collections.singletonList("Music"), "%test%event%"))
                .willReturn(Collections.singletonList(event));

        System.out.println("Mocked Service Response: " + eventService.getFilteredEventsWithoutDateRange(true, Collections.singletonList("Music"), "%test%event%"));

        mockMvc.perform(get("/events/filter")
                        .param("isFree", "true")
                        .param("combined_categories", "Music")
                        .param("name", "Test Event"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].name", is("Test Event")))
                .andExpect(jsonPath("$[0].category", is("Music")));
    }
}
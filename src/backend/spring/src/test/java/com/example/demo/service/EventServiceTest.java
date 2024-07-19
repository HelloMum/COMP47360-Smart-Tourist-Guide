package com.example.demo.service;

import com.example.demo.model.Event;
import com.example.demo.repository.EventRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class EventServiceTest {

    @InjectMocks
    private EventService eventService;

    @Mock
    private EventRepository eventRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetFilteredEventsWithinDateRange() {
        Event event = createSampleEvent();
        when(eventRepository.findFilteredEventsWithinDateRange(any(), any(), any(), any(), any())).thenReturn(List.of(event));

        List<Event> result = eventService.getFilteredEventsWithinDateRange(
                "2024-07-20", "2024-07-21", true, Arrays.asList("Music"), "Test Event");
        assertThat(result).hasSize(1);
        assertThat(result.get(0)).isEqualTo(event);
    }

    @Test
    void testGetFilteredEventsWithoutDateRange() {
        Event event = createSampleEvent();
        when(eventRepository.findFilteredEventsWithoutDateRange(any(), any(), any())).thenReturn(List.of(event));

        List<Event> result = eventService.getFilteredEventsWithoutDateRange(true, Arrays.asList("Music"), "Test Event");

        assertThat(result).hasSize(1);
        assertThat(result.get(0)).isEqualTo(event);
    }

    @Test
    void testGetEventById() {
        UUID eventId = UUID.randomUUID();
        Event event = createSampleEvent();
        when(eventRepository.findById(eventId)).thenReturn(Optional.of(event));

        Event result = eventService.getEventById(eventId);

        assertThat(result).isEqualTo(event);
    }

    @Test
    void testGetEventByIdNotFound() {
        UUID eventId = UUID.randomUUID();
        when(eventRepository.findById(eventId)).thenReturn(Optional.empty());

        Event result = eventService.getEventById(eventId);
        assertThat(result).isNull();
    }

    private Event createSampleEvent() {
        return new Event(
                UUID.randomUUID(),
                "Test Event",
                40.7128,
                -74.0060,
                "Music",
                "Music, Concert",
                "A sample event description",
                "http://eventsite.com",
                "http://imageurl.com",
                true,
                "2024-07-20T10:00:00",
                "2024-07-20T12:00:00",
                100,
                50,
                false,
                true,
                LocalDateTime.now(),
                "123 Event St",
                "New York",
                "NY",
                "10001"
        );
    }
}
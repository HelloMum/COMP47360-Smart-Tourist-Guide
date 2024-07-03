package com.example.demo.service;

import com.example.demo.model.Event;
import com.example.demo.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.Optional;

@Service
public class EventService {
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

}

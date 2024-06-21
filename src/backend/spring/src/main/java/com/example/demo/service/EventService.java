package com.example.demo.service;

import com.example.demo.model.Event;
import com.example.demo.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAllByOrderByTimeStartAsc();
    }

    public List<Event> getFilteredEventsWithinDateRange(String startDate, String endDate, Boolean isFree, List<String> categories) {
        return eventRepository.findFilteredEventsWithinDateRange(startDate, endDate, isFree, categories);
    }

    public List<Event> getSelectedEvents(List<UUID> eventIds) {
        return eventRepository.findAllById(eventIds);
    }
}

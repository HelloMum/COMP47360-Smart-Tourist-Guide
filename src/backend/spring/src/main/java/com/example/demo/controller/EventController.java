package com.example.demo.controller;

import com.example.demo.model.Event;
import com.example.demo.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {
    @Autowired
    private EventService eventService;

    // Return all the events, order by start date
    @GetMapping("/all")
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    // Return all the events that meet all the conditions between two dates, order by start date
    // When isFree or categories is null, the query ignores these parameters, ensuring that no filtering is applied based on their values.

    @GetMapping("/filtered")
    public List<Event> getFilteredEvents(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(value = "isFree", required = false) Boolean isFree,
            @RequestParam(value = "categories", required = false) String categories) {

        ZoneOffset zoneOffset = ZoneOffset.of("-04:00");

        String startDateTime = startDate.atStartOfDay().atOffset(zoneOffset).format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
        String endDateTime = endDate.atTime(23, 59, 59).atOffset(zoneOffset).format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);

        List<String> categoryList = (categories != null && !categories.isEmpty()) ? Arrays.asList(categories.split(",")) : null;
        return eventService.getFilteredEventsWithinDateRange(startDateTime, endDateTime, isFree, categoryList);
    }
}

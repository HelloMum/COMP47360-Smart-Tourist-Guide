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
//
//@RestController
//@RequestMapping("/events")
//public class EventController {
//
//    @Autowired
//    private EventService eventService;
//
//    // Return the events ordered by start date.
//    // Can be filtered without date
//    @GetMapping("/filter")
//    public List<Event> getAllEvents(
//            @RequestParam(value = "isFree", required = false) Boolean isFree,
//            @RequestParam(value = "combined_categories", required = false) String combined_categories,
//            @RequestParam(value = "name", required = false) String name) {
//
//        List<String> categoryList = (combined_categories != null && !combined_categories.isEmpty()) ? Arrays.asList(combined_categories.split(",")) : null;
//        return eventService.getFilteredEventsWithoutDateRange(isFree, categoryList, name);
//    }
//
//    // Return all the events that meet all the conditions between two dates, order by start date
//    // When isFree or categories is null, the query ignores these parameters, ensuring that no filtering is applied based on their values.
//    @GetMapping("/filterWithDate")
//    public List<Event> getFilteredEventsWithDates(
//            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
//            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
//            @RequestParam(value = "isFree", required = false) Boolean isFree,
//            @RequestParam(value = "combined_categories", required = false) String combined_categories,
//            @RequestParam(value = "name", required = false) String name) {
//
//        ZoneOffset zoneOffset = ZoneOffset.of("-04:00");
//
//        String startDateTime = startDate.atStartOfDay().atOffset(zoneOffset).format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
//        String endDateTime = endDate.atTime(23, 59, 59).atOffset(zoneOffset).format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
//
//        List<String> categoryList = (combined_categories != null && !combined_categories.isEmpty()) ? Arrays.asList(combined_categories.split(",")) : null;
//        return eventService.getFilteredEventsWithinDateRange(startDateTime, endDateTime, isFree, categoryList, name);
//    }
//}


@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping("/filter")
    public List<Event> getAllEvents(
            @RequestParam(value = "isFree", required = false) Boolean isFree,
            @RequestParam(value = "combined_categories", required = false) String combined_categories,
            @RequestParam(value = "name", required = false) String name) {

        if (name != null && !name.isEmpty()) {
            name = "%" + String.join("%", name.trim().toLowerCase().split("\\s+")) + "%";
        }
        List<String> categoryList = (combined_categories != null && !combined_categories.isEmpty()) ? Arrays.asList(combined_categories.split(",")) : null;
        return eventService.getFilteredEventsWithoutDateRange(isFree, categoryList, name);
    }

    @GetMapping("/filterWithDate")
    public List<Event> getFilteredEventsWithDates(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(value = "isFree", required = false) Boolean isFree,
            @RequestParam(value = "combined_categories", required = false) String combined_categories,
            @RequestParam(value = "name", required = false) String name) {

        ZoneOffset zoneOffset = ZoneOffset.of("-04:00");
        String startDateTime = startDate.atStartOfDay().atOffset(zoneOffset).format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
        String endDateTime = endDate.atTime(23, 59, 59).atOffset(zoneOffset).format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);

        if (name != null && !name.isEmpty()) {
            name = "%" + String.join("%", name.trim().toLowerCase().split("\\s+")) + "%";
        }
        List<String> categoryList = (combined_categories != null && !combined_categories.isEmpty()) ? Arrays.asList(combined_categories.split(",")) : null;
        return eventService.getFilteredEventsWithinDateRange(startDateTime, endDateTime, isFree, categoryList, name);
    }
}
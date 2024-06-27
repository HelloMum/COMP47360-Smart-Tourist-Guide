//package com.example.demo.service;
//
//import com.example.demo.model.Event;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalTime;
//import java.time.ZoneId;
//import java.time.ZonedDateTime;
//import java.time.format.DateTimeFormatter;
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.List;
//import java.util.UUID;
//import java.util.stream.Collectors;
//
//@Service
//public class ItineraryService {
//
//    @Autowired
//    private AttractionCsvReader attractionCsvReader;
//
//    @Autowired
//    private EventService eventService;
//
//    private static final ZoneId MANHATTAN_ZONE = ZoneId.of("America/New_York");
//
//    public List<String> createItinerary() {
//        List<String> itinerary = new ArrayList<>();
//
//        // Get attraction data (fake to test)
//        List<Attraction> attractions = attractionCsvReader.readCsvFile("attractions.csv");
//        List<String> selectedAttractions = Arrays.asList("368052081", "368061337", "566445454");
//
//        List<Attraction> filteredAttractions = attractions.stream()
//                .filter(attraction -> selectedAttractions.contains(attraction.getId()))
//                .collect(Collectors.toList());
//
//        // Get event data from database (fake to test)
//        List<UUID> selectedEventIds = Arrays.asList(
//                UUID.fromString("bc17c032-15e3-4354-af3b-27e876af907e"),
//                UUID.fromString("3f06b22e-b3f9-4e1d-953e-798992e11dcb"),
//                UUID.fromString("1d2cad20-2037-4cd1-8fc5-0c5e8c7be37b")
//        );
//        List<Event> selectedEvents = eventService.getSelectedEvents(selectedEventIds);
//
//        return generateItinerary(filteredAttractions, selectedEvents);
//    }
//
//    private List<String> generateItinerary(List<Attraction> attractions, List<Event> events) {
//        List<String> itinerary = new ArrayList<>();
//
//        // Divide the time window into hourly slots from 9 AM to 6 PM in Manhattan time
//        List<ZonedDateTime> timeSlots = new ArrayList<>();
//        ZonedDateTime currentDateTime = ZonedDateTime.now(MANHATTAN_ZONE).with(LocalTime.of(9, 0));
//        for (int i = 0; i <= 9; i++) {
//            timeSlots.add(currentDateTime.plusHours(i));
//        }
//
//        // DateTimeFormatter for parsing event time strings
//        DateTimeFormatter formatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME;
//
//        // Schedule events within their specific time windows
//        for (Event event : events) {
//            ZonedDateTime startTime = ZonedDateTime.parse(event.getTime_start(), formatter);
//            ZonedDateTime endTime = ZonedDateTime.parse(event.getTime_end(), formatter);
//            itinerary.add("Attend: " + event.getName() + " from " + startTime + " to " + endTime);
//            timeSlots = removeSlotsWithinTimeRange(timeSlots, startTime, endTime);
//        }
//
//        //
//
//        return itinerary;
//    }
//
//    private List<ZonedDateTime> removeSlotsWithinTimeRange(List<ZonedDateTime> timeSlots, ZonedDateTime startTime, ZonedDateTime endTime) {
//        return timeSlots.stream().filter(slot -> slot.isBefore(startTime) || slot.isAfter(endTime)).collect(Collectors.toList());
//    }
//}

package com.example.demo.service;

import com.example.demo.model.Attraction;
import com.example.demo.model.Event;
import com.example.demo.model.ItineraryItem;
import com.example.demo.model.TimeSlot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ItineraryService {

    @Autowired AttractionService attractionService;

    private List<Event> events = new ArrayList<>();

    public ItineraryService() {
        events.add(new Event(UUID.fromString("6eb2c6ad-c018-47b6-9c65-76e0eaa8e1be"), "Watson Adventures' Munch Around the Village Scavenger Hunt",
                40.7302746144448, -74.0021777051505, "food-and-drink", "Food & Festival",
                "Join Watson Adventures on a unique food scavenger hunt for adults in Greenwich Village! Discover the gourmet delights of Greenwich Village while...",
                "https://www.yelp.com/events/new-york-watson-adventures-munch-around-the-village-scavenger-hunt-46?adjust_creative=L_ZMOhSyovpnXCXbbl1pCw&utm_campaign=yelp_api_v3&utm_medium=api_v3_event_search&utm_source=L_ZMOhSyovpnXCXbbl1pCw",
                "https://s3-media4.fl.yelpcdn.com/ephoto/_LpB87rx_Ee5s4rhTCTEqg/o.jpg", false,
                "2024-07-06T12:00:00", "2024-07-06T14:00:00", 1, 0, false, false,
                LocalDateTime.parse("2024-07-01T10:05:32.453645"), "Bleecker St & 6th Ave", "New York", "NY", "10012"));

        events.add(new Event(UUID.fromString("40f2ffa3-9ba9-4c2e-ad47-206d9bc55217"), "Poster House First Friday",
                40.7433885071265, -73.9935075903394, "visual-arts", "Art & Fashion",
                "Poster House, the first museum in the United States dedicated to the global history of posters, will host its monthly \"First Friday\" event July 5, 2024 from...",
                "https://www.yelp.com/events/new-york-poster-house-first-friday-11?adjust_creative=L_ZMOhSyovpnXCXbbl1pCw&utm_campaign=yelp_api_v3&utm_medium=api_v3_event_search&utm_source=L_ZMOhSyovpnXCXbbl1pCw",
                "https://s3-media1.fl.yelpcdn.com/ephoto/1OY0oqe3u4_T9QXeKSIsYQ/o.jpg", true,
                "2024-07-05T10:00:00", "2024-07-05T12:00:00", 1, 0, false, false,
                LocalDateTime.parse("2024-07-01T10:05:32.450916"), "119 W 23rd St", "New York", "NY", "10011"));

        events.add(new Event(UUID.fromString("bdec29fe-6b73-49af-a16c-3c2485cbea5a"), "South Street Seaport Museum Announces Beach Fest",
                40.705466, -74.001579, "kids-family", "Kids & Family",
                "The South Street Seaport Museum announces Beach Fest at the Seaport Museum on Saturday, July 6, from 11am to 2pm at Pier 16 (Fulton and South Streets). Each...",
                "https://www.yelp.com/events/new-york-south-street-seaport-museum-announces-beach-fest?adjust_creative=L_ZMOhSyovpnXCXbbl1pCw&utm_campaign=yelp_api_v3&utm_medium=api_v3_event_search&utm_source=L_ZMOhSyovpnXCXbbl1pCw",
                "https://s3-media1.fl.yelpcdn.com/ephoto/slzowiJPg1UFsajmmPCqzg/o.jpg", true,
                "2024-07-06T11:00:00", "2024-07-06T14:00:00", 1, 0, false, false,
                LocalDateTime.parse("2024-07-01T10:05:32.469712"), "89 S St", "New York", "NY", "10038"));

        events.add(new Event(UUID.fromString("9b3e3169-0988-4b63-9663-2eafe5335a53"), "Watson Adventures' Murder at the Met Scavenger Hunt",
                40.779449, -73.963245, "visual-arts", "Art & Fashion",
                "Join Watson Adventures on a murder mystery scavenger hunt for adults at the Metropolitan Museum! A murdered curator has left behind a cryptic trail of clues...",
                "https://www.yelp.com/events/new-york-watson-adventures-murder-at-the-met-scavenger-hunt-330?adjust_creative=L_ZMOhSyovpnXCXbbl1pCw&utm_campaign=yelp_api_v3&utm_medium=api_v3_event_search&utm_source=L_ZMOhSyovpnXCXbbl1pCw",
                "https://s3-media3.fl.yelpcdn.com/ephoto/bi2qU7DBHsCv7prwTd3UxQ/o.jpg", false,
                "2024-07-06T17:00:00", "2024-07-06T19:00:00", 1, 0, false, false,
                LocalDateTime.parse("2024-07-01T10:05:32.447952"), "1000 Fifth Ave", "New York", "NY", "10028"));

        Attraction attraction1 = attractionService.getAttractionByIndex(3);
        Attraction attraction2 = attractionService.getAttractionByIndex(13);
        Attraction attraction3 = attractionService.getAttractionByIndex(16);
    }


    public List<ItineraryItem> createItinerary(LocalDate startDate, LocalDate endDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        List<ItineraryItem> itinerary = new ArrayList<>();

        List<LocalDate> dates = startDate.datesUntil(endDate.plusDays(1)).collect(Collectors.toList());

        for (LocalDate date : dates) {
            List<Event> dailyEvents = events.stream()
                    .filter(event -> LocalDateTime.parse(event.getTime_start(), formatter).toLocalDate().isEqual(date))
                    .collect(Collectors.toList());

            dailyEvents.sort(Comparator.comparing(event -> LocalDateTime.parse(event.getTime_start(), formatter)));

            for (Event event : dailyEvents) {
                LocalDateTime eventStart = LocalDateTime.parse(event.getTime_start(), formatter);
                LocalDateTime eventEnd = LocalDateTime.parse(event.getTime_end(), formatter);

                boolean isConflict = itinerary.stream().anyMatch(item ->
                        item.getStartTime().isBefore(eventEnd) && eventStart.isBefore(item.getEndTime()));

                if (!isConflict) {
                    ItineraryItem item = new ItineraryItem(event.getId(), event.getName(), eventStart, eventEnd,
                            event.getLatitude(), event.getLongitude(), true);
                    itinerary.add(item);
                } else {
                    System.out.println("Time conflict, remove " + event.getName() + " (" + eventStart + " - " + eventEnd + ")");
                }
            }

            itinerary.sort(Comparator.comparing(ItineraryItem::getStartTime));
        }

        List<TimeSlot> availableTimeSlots = generateAvailableTimeSlots(startDate, endDate);

        System.out.println("Available time slots : ");
        for (TimeSlot slot : availableTimeSlots) {
            System.out.println(slot.getStart() + " - " + slot.getEnd());
        }

        printEvents(itinerary);
        return itinerary;
    }

    public void printEvents(List<ItineraryItem> itinerary) {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

        Set<LocalDate> printedDates = new HashSet<>();

        for (ItineraryItem item : itinerary) {
            LocalDate eventDate = item.getStartTime().toLocalDate();

            if (!printedDates.contains(eventDate)) {
                System.out.println(dateFormatter.format(eventDate) + ":");
                printedDates.add(eventDate);
            }

            System.out.println("  " + timeFormatter.format(item.getStartTime()) + " - " + timeFormatter.format(item.getEndTime()) +
                    ": " + item.getName() + " (Event)");
        }
    }


    public List<TimeSlot> generateAvailableTimeSlots(LocalDate startDate, LocalDate endDate) {
        List<TimeSlot> availableTimeSlots = new ArrayList<>();
        LocalDate currentDate = startDate;
        LocalTime dayStart = LocalTime.of(9, 0);
        LocalTime dayEnd = LocalTime.of(19, 0);

        while (!currentDate.isAfter(endDate)) {
            List<Event> dayEvents = getEventsForDate(currentDate);

            LocalTime currentStart = dayStart;

            for (Event event : dayEvents) {
                LocalDateTime eventStart = LocalDateTime.parse(event.getTime_start());
                LocalDateTime eventEnd = LocalDateTime.parse(event.getTime_end());

                while (Duration.between(currentStart, eventStart.toLocalTime()).toHours() >= 2) {
                    LocalTime slotEnd = currentStart.plusHours(2);
                    if (slotEnd.isAfter(eventStart.toLocalTime())) {
                        slotEnd = eventStart.toLocalTime();
                    }
                    availableTimeSlots.add(new TimeSlot(LocalDateTime.of(currentDate, currentStart),
                            LocalDateTime.of(currentDate, slotEnd)));
                    currentStart = slotEnd;
                }

                currentStart = eventEnd.toLocalTime();
            }

            while (Duration.between(currentStart, dayEnd).toHours() >= 2) {
                LocalTime slotEnd = currentStart.plusHours(2);
                if (slotEnd.isAfter(dayEnd)) {
                    slotEnd = dayEnd;
                }
                availableTimeSlots.add(new TimeSlot(LocalDateTime.of(currentDate, currentStart),
                        LocalDateTime.of(currentDate, slotEnd)));
                currentStart = slotEnd;
            }

            currentDate = currentDate.plusDays(1);
        }

        return availableTimeSlots;
    }

    private List<Event> getEventsForDate(LocalDate date) {
        List<Event> dayEvents = new ArrayList<>();
        for (Event event : events) {
            LocalDateTime eventStart = LocalDateTime.parse(event.getTime_start());
            if (eventStart.toLocalDate().isEqual(date)) {
                dayEvents.add(event);
            }
        }
        return dayEvents;
    }
}

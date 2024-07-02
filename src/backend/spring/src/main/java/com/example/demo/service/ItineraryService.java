package com.example.demo.service;

import com.example.demo.model.Attraction;
import com.example.demo.model.Event;
import com.example.demo.model.ItineraryItem;
import com.example.demo.model.TimeSlot;
import ml.dmlc.xgboost4j.java.XGBoostError;
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

    private List<Event> events = new ArrayList<>();

    private List<TimeSlot> availableTimeSlots; // List of available time slots, each containing a start and end time
    private List<Attraction> attractions; // List of attractions

    @Autowired
    private AttractionService attractionService;

    @Autowired
    private PredictionService predictionService;

    public ItineraryService() {
        intializeEvents();
        this.availableTimeSlots = new ArrayList<>();
    }

    private void intializeEvents() {

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
    }

    public List<ItineraryItem> createItinerary(LocalDate startDate, LocalDate endDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        List<ItineraryItem> itinerary = new ArrayList<>();
        List<Event> unarrangedEvents = new ArrayList<>();
        List<Attraction> unarrangedAttractions = new ArrayList<>();

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
                    unarrangedEvents.add(event);
                }
            }

            itinerary.sort(Comparator.comparing(ItineraryItem::getStartTime));
        }

        availableTimeSlots = new ArrayList<>();
        for (LocalDate date : dates) {
            availableTimeSlots.addAll(generateAvailableTimeSlots(itinerary, date));
        }

        Map<LocalDateTime, Map<Attraction, Double>> attractionBusynessMap = new HashMap<>();
        addAttractionsToItinerary(itinerary, attractionBusynessMap, unarrangedAttractions);

        printItinerary(itinerary, availableTimeSlots, attractionBusynessMap, unarrangedEvents, unarrangedAttractions);

        return itinerary;
    }

    private void addAttractionsToItinerary(List<ItineraryItem> itinerary, Map<LocalDateTime, Map<Attraction, Double>> attractionBusynessMap, List<Attraction> unarrangedAttractions) {
        List<Attraction> attractions = new ArrayList<>(Arrays.asList(
                attractionService.getAttractionByIndex(3),
                attractionService.getAttractionByIndex(13),
                attractionService.getAttractionByIndex(16),
                attractionService.getAttractionByIndex(100),
                attractionService.getAttractionByIndex(19),
                attractionService.getAttractionByIndex(160)
        ));

        // Sort by the number of days open per week
        attractions.sort(Comparator.comparingInt(this::calculateWeeklyOpenDays));

        double[] currentLatLon = {0.0, 0.0};
        // Initialize the current coordinates to the end point or event location of the first time slot
        if (!itinerary.isEmpty() && itinerary.get(0).isEvent()) {
            currentLatLon[0] = itinerary.get(0).getLatitude();
            currentLatLon[1] = itinerary.get(0).getLongitude();
        }

        for (TimeSlot timeSlot : availableTimeSlots) {
            LocalDateTime slotStart = timeSlot.getStart();
            LocalDateTime slotEnd = timeSlot.getEnd();
            int dayOfWeek = slotStart.getDayOfWeek().getValue() % 7; // 0 for Monday, 6 for Sunday

            boolean found = false;
            double searchRadius = 3.0;

            while (!found) {
                final double searchRadiusFinal = searchRadius;
                List<Attraction> filteredAttractions = attractions.stream()
                        .filter(attraction -> calculateDistance(currentLatLon[0], currentLatLon[1], attraction.getAttraction_latitude(), attraction.getAttraction_longitude()) <= searchRadiusFinal)
                        .filter(attraction -> isAttractionOpenDuring(attraction.getFormatted_hours(), dayOfWeek, slotStart.toLocalTime(), slotEnd.toLocalTime()))
                        .collect(Collectors.toList());

                Attraction bestAttraction = null;
                double minBusyness = Double.MAX_VALUE;

                for (Attraction attraction : filteredAttractions) {
                    try {
                        float[] prediction = predictionService.predict(attraction.getIndex(), slotStart);
                        double busyness = prediction[0];

                        // Store the visit time and busyness level of the attraction in the Map
                        attractionBusynessMap.computeIfAbsent(slotStart, k -> new HashMap<>()).put(attraction, busyness);

                        if (busyness < minBusyness) {
                            minBusyness = busyness;
                            bestAttraction = attraction;
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }

                if (bestAttraction != null) {
                    ItineraryItem item = new ItineraryItem(bestAttraction.getIndex(), bestAttraction.getAttraction_name(), slotStart, slotEnd,
                            bestAttraction.getAttraction_latitude(), bestAttraction.getAttraction_longitude(), false);
                    timeSlot.setOccupied(true);
                    item.setBusyness(minBusyness); // Set busyness level
                    itinerary.add(item);
                    attractions.remove(bestAttraction);

                    // Update current coordinates
                    currentLatLon[0] = bestAttraction.getAttraction_latitude();
                    currentLatLon[1] = bestAttraction.getAttraction_longitude();
                    found = true;
                } else {
                    // If no suitable attraction is found, expand the search radius
                    searchRadius += 1.0;
                    if (searchRadius > 20.0) {
                        // If the search radius exceeds 20 kilometers, give up the time slot
                        break;
                    }
                }
            }
        }

        itinerary.sort(Comparator.comparing(ItineraryItem::getStartTime));

        // Add unscheduled attractions to the list
        if (!attractions.isEmpty()) {
            unarrangedAttractions.addAll(attractions);
        }
    }

    private boolean isAttractionOpenDuring(String formattedHours, int dayOfWeek, LocalTime startTime, LocalTime endTime) {
        String[] hoursArray = formattedHours.split(", ");
        for (String hours : hoursArray) {
            String[] parts = hours.split(": ");
            if (parts.length != 2) {
                continue;
            }
            int parsedDayOfWeek = Integer.parseInt(parts[0]);
            String timeRange = parts[1];

            String[] times = timeRange.split(" - ");
            if (times.length != 2) {
                continue;
            }
            LocalTime openTime = LocalTime.parse(times[0]);
            LocalTime closeTime = LocalTime.parse(times[1]);

            if (dayOfWeek == parsedDayOfWeek &&
                    startTime.compareTo(openTime) >= 0 &&
                    endTime.compareTo(closeTime) <= 0) {
                return true;
            }
        }
        return false;
    }

    private int calculateWeeklyOpenDays(Attraction attraction) {
        String formattedHours = attraction.getFormatted_hours();
        Set<Integer> openDays = new HashSet<>();

        String[] days = formattedHours.split(", ");
        for (String day : days) {
            String[] parts = day.split(": ");
            int dayOfWeek = Integer.parseInt(parts[0]);
            openDays.add(dayOfWeek);
        }

        return openDays.size();
    }

    public List<TimeSlot> generateAvailableTimeSlots(List<ItineraryItem> itinerary, LocalDate date) {
        List<TimeSlot> availableTimeSlots = new ArrayList<>();
        LocalTime dayStart = LocalTime.of(9, 0);
        LocalTime dayEnd = LocalTime.of(19, 0); // Modified to be inclusive of both start and end times

        LocalDateTime currentStart = LocalDateTime.of(date, dayStart);
        LocalDateTime dayEndDateTime = LocalDateTime.of(date, dayEnd);

        for (ItineraryItem item : itinerary) {
            if (item.getStartTime().toLocalDate().equals(date)) {
                LocalDateTime eventStart = item.getStartTime();
                LocalDateTime eventEnd = item.getEndTime();

                while (Duration.between(currentStart, eventStart).toHours() >= 2) {
                    LocalDateTime slotEnd = currentStart.plusHours(2);
                    if (slotEnd.isAfter(eventStart)) {
                        slotEnd = eventStart;
                    }
                    availableTimeSlots.add(new TimeSlot(currentStart, slotEnd));
                    currentStart = slotEnd;
                }

                currentStart = eventEnd;
            }
        }

        while (Duration.between(currentStart, dayEndDateTime).toHours() >= 2) {
            LocalDateTime slotEnd = currentStart.plusHours(2);
            if (slotEnd.isAfter(dayEndDateTime)) {
                slotEnd = dayEndDateTime;
            }
            availableTimeSlots.add(new TimeSlot(currentStart, slotEnd));
            currentStart = slotEnd;
        }

        return availableTimeSlots;
    }

    private void printItinerary(List<ItineraryItem> itinerary, List<TimeSlot> availableTimeSlots, Map<LocalDateTime, Map<Attraction, Double>> attractionBusynessMap, List<Event> unarrangedEvents, List<Attraction> unarrangedAttractions) {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

        List<ItineraryOutputItem> outputItems = new ArrayList<>();
        for (ItineraryItem item : itinerary) {
            outputItems.add(new ItineraryOutputItem(item.getStartTime(), item.getEndTime(), item.getName(), item.isEvent(), item.getBusyness()));
        }
        for (TimeSlot slot : availableTimeSlots) {
            if (!slot.isOccupied()) {
                outputItems.add(new ItineraryOutputItem(slot.getStart(), slot.getEnd(), "Available TimeSlot", false, 0));
            }
        }

        outputItems.sort(Comparator.comparing(ItineraryOutputItem::getStartTime));

        System.out.println("Itinerary: ");
        LocalDate currentDate = null;
        for (ItineraryOutputItem item : outputItems) {
            LocalDate itemDate = item.getStartTime().toLocalDate();
            if (currentDate == null || !currentDate.equals(itemDate)) {
                currentDate = itemDate;
                System.out.println(dateFormatter.format(currentDate) + ":");
            }
            if (item.isEvent()) {
                System.out.println("  " + timeFormatter.format(item.getStartTime()) + " - " + timeFormatter.format(item.getEndTime()) + ": " + item.getName() + " (Event)");
            } else {
                if (item.getBusyness() > 0) {
                    System.out.printf("  %s - %s: %s Busyness: %.2f\n", timeFormatter.format(item.getStartTime()), timeFormatter.format(item.getEndTime()), item.getName(), item.getBusyness());
                } else {
                    System.out.printf("  %s - %s: %s\n", timeFormatter.format(item.getStartTime()), timeFormatter.format(item.getEndTime()), item.getName());
                }
            }
        }

        // Print unscheduled events
        if (!unarrangedEvents.isEmpty()) {
            System.out.println("Unscheduled Events:");
            for (Event event : unarrangedEvents) {
                LocalDateTime eventStart = LocalDateTime.parse(event.getTime_start(), DateTimeFormatter.ISO_LOCAL_DATE_TIME);
                LocalDateTime eventEnd = LocalDateTime.parse(event.getTime_end(), DateTimeFormatter.ISO_LOCAL_DATE_TIME);
                System.out.println("  " + event.getName() + " (" + eventStart.format(dateFormatter) + " " + eventStart.format(timeFormatter) + " - " + eventEnd.format(timeFormatter) + ")");
            }
        }

        // Print unscheduled attractions
        if (!unarrangedAttractions.isEmpty()) {
            System.out.println("Unscheduled Attractions:");
            for (Attraction attraction : unarrangedAttractions) {
                System.out.println("  " + attraction.getAttraction_name());
            }
        }
    }

    private static class ItineraryOutputItem {
        private final LocalDateTime startTime;
        private final LocalDateTime endTime;
        private final String name;
        private final boolean isEvent;
        private final double busyness;

        public ItineraryOutputItem(LocalDateTime startTime, LocalDateTime endTime, String name, boolean isEvent, double busyness) {
            this.startTime = startTime;
            this.endTime = endTime;
            this.name = name;
            this.isEvent = isEvent;
            this.busyness = busyness;
        }

        public LocalDateTime getStartTime() {
            return startTime;
        }

        public LocalDateTime getEndTime() {
            return endTime;
        }

        public String getName() {
            return name;
        }

        public boolean isEvent() {
            return isEvent;
        }

        public double getBusyness() {
            return busyness;
        }
    }

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Radius of the Earth in kilometers
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Returns the distance in kilometers
    }
}
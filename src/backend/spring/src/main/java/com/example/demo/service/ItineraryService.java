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

    private List<Event> events = new ArrayList<>();

    private List<TimeSlot> availableTimeSlots; // List of available time slots, each containing a start and end time
    private List<Attraction> attractions; // List of attractions

    @Autowired
    private AttractionService attractionService;

    @Autowired
    private EventService eventService;

    @Autowired
    private PredictionService predictionService;

    public ItineraryService() {
        this.availableTimeSlots = new ArrayList<>();
    }

    public List<ItineraryItem> createItineraryFromSelection(List<String> ids, LocalDate startDate, LocalDate endDate) {
        List<Attraction> selectedAttractions = new ArrayList<>();
        List<Event> selectedEvents = new ArrayList<>();

        for (String id : ids) {
            try {
                int attractionId = Integer.parseInt(id);
                Attraction attraction = attractionService.getAttractionByIndex(attractionId);
                if (attraction != null) {
                    selectedAttractions.add(attraction);
                }
            } catch (NumberFormatException e) {
                try {
                    UUID eventId = UUID.fromString(id);
                    Event event = eventService.getEventById(eventId);
                    if (event != null) {
                        selectedEvents.add(event);
                    }
                } catch (IllegalArgumentException ex) {
                }
            }
        }

        return createItinerary(selectedEvents, selectedAttractions, startDate, endDate);
    }

    public List<ItineraryItem> createItinerary(List<Event> events, List<Attraction> attractions, LocalDate startDate, LocalDate endDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        List<ItineraryItem> itinerary = new ArrayList<>();
        List<Event> unarrangedEvents = new ArrayList<>();
        List<Attraction> unarrangedAttractions = new ArrayList<>();
        List<LocalDate> dates = startDate.datesUntil(endDate.plusDays(1)).collect(Collectors.toList());
        System.out.println("Dates to process: " + dates);

        Map<LocalDate, Long> dailyEventCount = new HashMap<>();

        for (LocalDate date : dates) {
            System.out.println("Processing date: " + date);
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
                    int taxiZone = predictionService.getTaxiZoneIdForEvent(event.getLatitude(), event.getLongitude());
                    double busyness = 0;
                    if (taxiZone != -1) {
                        try {
                            float[] prediction = predictionService.predictForTaxiZone(taxiZone, eventStart);
                            busyness = prediction[0];
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                    ItineraryItem item = new ItineraryItem(event.getId(), event.getName(), eventStart, eventEnd,
                            event.getLatitude(), event.getLongitude(), true);
                    item.setBusyness(busyness);
                    itinerary.add(item);
                    dailyEventCount.put(date, dailyEventCount.getOrDefault(date, 0L) + 1);
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

        // Calculate total arranged events and attractions
        int totalEvents = itinerary.size();
        int totalAttractions = attractions.size();
        int totalActivities = totalEvents + totalAttractions;
        int totalDays = (int) Duration.between(startDate.atStartOfDay(), endDate.plusDays(1).atStartOfDay()).toDays();
        int averageDailyActivities = (int) Math.ceil((double) totalActivities / totalDays);

        System.out.println("Total days: " + totalDays);
        System.out.println("Total activities: " + totalActivities);
        System.out.println("Average daily activities: " + averageDailyActivities);

        Map<LocalDateTime, Map<Attraction, Double>> attractionBusynessMap = new HashMap<>();
        addAttractionsToItinerary(itinerary, attractionBusynessMap, attractions, unarrangedAttractions, startDate, endDate, averageDailyActivities, dailyEventCount);

        printItinerary(itinerary, availableTimeSlots, attractionBusynessMap, unarrangedEvents, unarrangedAttractions);

        return itinerary;
    }

    private void addAttractionsToItinerary(List<ItineraryItem> itinerary, Map<LocalDateTime, Map<Attraction, Double>> attractionBusynessMap, List<Attraction> attractions, List<Attraction> unarrangedAttractions, LocalDate startDate, LocalDate endDate, int averageDailyActivities, Map<LocalDate, Long> dailyEventCount) {
        // Sort by number of open days within a given date range
        attractions.sort(Comparator.comparingInt(attraction -> calculateOpenDaysInRange(attraction, startDate, endDate)));

        double[] currentLatLon = {0.0, 0.0};

        // Initialize currentLatLon coordinates
        if (itinerary.isEmpty()) {
            // If there is no event, select the least crowded attraction in the first timeslot
            if (!availableTimeSlots.isEmpty()) {
                TimeSlot firstSlot = availableTimeSlots.get(0);
                LocalDateTime slotStart = firstSlot.getStart();
                LocalDateTime slotEnd = firstSlot.getEnd();
                int dayOfWeek = (slotStart.getDayOfWeek().getValue() + 6) % 7;

                // Select an attraction that is open during the timeslot
                List<Attraction> openAttractions = attractions.stream()
                        .filter(attraction -> isAttractionOpenDuring(attraction.getFormatted_hours(), dayOfWeek, slotStart.toLocalTime(), slotEnd.toLocalTime()))
                        .sorted(Comparator.comparingInt(attraction -> calculateOpenDaysInRange(attraction, startDate, endDate)))
                        .collect(Collectors.toList());

                if (!openAttractions.isEmpty()) {
                    Attraction bestAttraction = openAttractions.get(0);
                    double minBusyness = Double.MAX_VALUE;

                    for (Attraction attraction : openAttractions) {
                        try {
                            int taxiZone = attraction.getTaxi_zone();
                            float[] prediction = predictionService.predictForTaxiZone(taxiZone, slotStart);
                            double busyness = prediction[0];
                            if (busyness < minBusyness) {
                                minBusyness = busyness;
                                bestAttraction = attraction;
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }

                    // Arrange the best attraction to the first timeslot
                    ItineraryItem item = new ItineraryItem(bestAttraction.getIndex(), bestAttraction.getAttraction_name(), slotStart, slotEnd, bestAttraction.getAttraction_latitude(), bestAttraction.getAttraction_longitude(), false);
                    item.setBusyness(minBusyness);
                    itinerary.add(item);
                    attractions.remove(bestAttraction);

                    // Update currentLatLon coordinates
                    currentLatLon[0] = bestAttraction.getAttraction_latitude();
                    currentLatLon[1] = bestAttraction.getAttraction_longitude();
                    availableTimeSlots.get(0).setOccupied(true);
                }
            }
        } else {
            // Initialize currentLatLon to the coordinates of the first itinerary item
            currentLatLon[0] = itinerary.get(0).getLatitude();
            currentLatLon[1] = itinerary.get(0).getLongitude();
        }

        for (TimeSlot timeSlot : availableTimeSlots) {
            if (timeSlot.isOccupied()) continue;

            LocalDateTime slotStart = timeSlot.getStart();
            LocalDateTime slotEnd = timeSlot.getEnd();
            LocalDate currentDate = slotStart.toLocalDate();
            int dayOfWeek = (slotStart.getDayOfWeek().getValue() + 6) % 7;

            long eventsToday = dailyEventCount.getOrDefault(currentDate, 0L);
            long activitiesToday = itinerary.stream()
                    .filter(item -> item.getStartTime().toLocalDate().equals(currentDate))
                    .count();

            if (activitiesToday >= averageDailyActivities) {
                continue;
            }

            boolean found = false;
            double searchRadius = 3.0;

            while (!found) {
                final double searchRadiusFinal = searchRadius;
                List<Attraction> filteredAttractions = attractions.stream()
                        .filter(attraction -> {
                            double distance = calculateDistance(currentLatLon[0], currentLatLon[1], attraction.getAttraction_latitude(), attraction.getAttraction_longitude());
                            boolean withinRadius = distance <= searchRadiusFinal;
                            System.out.println("Checking distance for attraction " + attraction.getAttraction_name() + ": " + distance + " km (within radius: " + withinRadius + ")");
                            return withinRadius;
                        })
                        .filter(attraction -> {
                            boolean openDuring = isAttractionOpenDuring(attraction.getFormatted_hours(), dayOfWeek, slotStart.toLocalTime(), slotEnd.toLocalTime());
                            System.out.println("Checking opening hours for attraction " + attraction.getAttraction_name() + ": " + (openDuring ? "Open" : "Closed"));
                            return openDuring;
                        })
                        .sorted(Comparator.comparingInt(attraction -> calculateOpenDaysInRange(attraction, startDate, endDate)))
                        .collect(Collectors.toList());

                System.out.println("Filtered attractions count: " + filteredAttractions.size());

                Attraction bestAttraction = null;
                double minBusyness = Double.MAX_VALUE;

                for (Attraction attraction : filteredAttractions) {
                    try {
                        int taxiZone = attraction.getTaxi_zone();
                        float[] prediction = predictionService.predictForTaxiZone(taxiZone, slotStart);
                        double busyness = prediction[0];

                        attractionBusynessMap.computeIfAbsent(slotStart, k -> new HashMap<>()).put(attraction, busyness);

                        System.out.println("Attraction " + attraction.getAttraction_name() + " busyness prediction: " + busyness);

                        if (busyness < minBusyness) {
                            minBusyness = busyness;
                            bestAttraction = attraction;
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }

                if (bestAttraction != null) {
                    System.out.println("Adding attraction: " + bestAttraction.getAttraction_name() + " with busyness: " + minBusyness);
                    ItineraryItem item = new ItineraryItem(bestAttraction.getIndex(), bestAttraction.getAttraction_name(), slotStart, slotEnd, bestAttraction.getAttraction_latitude(), bestAttraction.getAttraction_longitude(), false);
                    timeSlot.setOccupied(true);
                    item.setBusyness(minBusyness);
                    itinerary.add(item);
                    attractions.remove(bestAttraction);

                    currentLatLon[0] = bestAttraction.getAttraction_latitude();
                    currentLatLon[1] = bestAttraction.getAttraction_longitude();
                    found = true;
                } else {
                    searchRadius += 1.0;
                    System.out.println("Increasing search radius to " + searchRadius);
                    if (filteredAttractions.isEmpty() && searchRadius > 100.0) {
                        System.out.println("No suitable attraction found within a reasonable distance. Skipping time slot: " + slotStart + " - " + slotEnd);
                        break;
                    }
                }
            }
        }

        itinerary.sort(Comparator.comparing(ItineraryItem::getStartTime));

        if (!attractions.isEmpty()) {
            unarrangedAttractions.addAll(attractions);
        }
    }

    private boolean isAttractionOpenDuring(String formattedHours, int dayOfWeek, LocalTime startTime, LocalTime endTime) {
        // Convert dayOfWeek to 0-6
        // 0-Sunday 1-Monday ... 6-Saturday
        dayOfWeek = (dayOfWeek + 6) % 7;

        //System.out.println("Checking opening hours for day " + dayOfWeek + " between " + startTime + " and " + endTime);
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

            // If the end time is 00:00, treat it as 23:59
            if (closeTime.equals(LocalTime.MIDNIGHT)) {
                closeTime = LocalTime.of(23, 59);
            }

            //System.out.println("Parsed day: " + parsedDayOfWeek + ", Open time: " + openTime + ", Close time: " + closeTime);

            if (dayOfWeek == parsedDayOfWeek &&
                    !startTime.isBefore(openTime) &&
                    !endTime.isAfter(closeTime)) {
                return true;
            }
        }
        return false;
    }

    private int calculateOpenDaysInRange(Attraction attraction, LocalDate startDate, LocalDate endDate) {
        String formattedHours = attraction.getFormatted_hours();
        Set<LocalDate> openDays = new HashSet<>();

        String[] days = formattedHours.split(", ");
        for (String day : days) {
            String[] parts = day.split(": ");
            int dayOfWeek = Integer.parseInt(parts[0]);

            // from startDate to endDate
            LocalDate currentDate = startDate;
            while (!currentDate.isAfter(endDate)) {
                if (currentDate.getDayOfWeek().getValue() % 7 == dayOfWeek) {
                    openDays.add(currentDate);
                }
                currentDate = currentDate.plusDays(1);
            }
        }

        return openDays.size();
    }

    public List<TimeSlot> generateAvailableTimeSlots(List<ItineraryItem> itinerary, LocalDate date) {
        List<TimeSlot> availableTimeSlots = new ArrayList<>();
        LocalTime dayStart = LocalTime.of(9, 0);
        LocalTime dayEnd = LocalTime.of(19, 0);

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
                System.out.println("    Opening hours: " + attraction.getFormatted_hours());
            }
        }

        // Print available time slots
        System.out.println("Available Time Slots:");
        for (TimeSlot slot : availableTimeSlots) {
            if (!slot.isOccupied()) {
                System.out.printf("  %s - %s\n", slot.getStart().format(timeFormatter), slot.getEnd().format(timeFormatter));
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
        // Radius of the Earth in kilometers
        final int R = 6371;
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
}
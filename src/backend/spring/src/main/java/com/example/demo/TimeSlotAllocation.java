package com.example.demo;

import java.time.Duration;
import java.time.LocalTime;
import java.util.*;

public class TimeSlotAllocation {

    public static Map<Integer, List<ScheduledEvent>> timeSlotAllocationAlgorithm(
            Map<Integer, List<Event>> dayWiseEvents,
            UserAvailability availability,
            List<Attraction> attractions) {

        Map<Integer, List<ScheduledEvent>> scheduledEventsPerDay = new HashMap<>();

        // Iterate through each day's events
        for (Map.Entry<Integer, List<Event>> entry : dayWiseEvents.entrySet()) {
            int day = entry.getKey();
            List<Event> events = entry.getValue();
            List<ScheduledEvent> scheduledEvents = new ArrayList<>();

            // Get available time slots for the day
            List<TimeSlot> availableTimeSlots = new ArrayList<>(availability.getTimeSlotsForDay(day));

            // Allocate time slots for each event
            for (Event event : events) {
                if (isTimeSlotAvailable(event, scheduledEvents)) {
                    TimeSlot optimalTimeSlot = findAndAllocateTimeSlot(event, availableTimeSlots);
                    if (optimalTimeSlot != null) {
                        scheduledEvents.add(new ScheduledEvent(event, optimalTimeSlot));
                    } else {
                        System.out.println("Event \"" + event.getName() + "\" could not be scheduled due to a time conflict.");
                    }
                }
            }

            // Sort scheduled events by start time
            scheduledEvents.sort(Comparator.comparing(scheduledEvent -> scheduledEvent.getTimeSlot().getStart()));

            // Generate available time slots after scheduling events
            List<TimeSlot> freeTimeSlots = generateAvailableTimeSlots(scheduledEvents);

            // Initialize set of unvisited attractions
            Set<Attraction> notVisitedAttractions = new HashSet<>(attractions);

            // Replace available time slots with attraction activities
            scheduleAttractions(freeTimeSlots, scheduledEvents, notVisitedAttractions, day);

            scheduledEventsPerDay.put(day, scheduledEvents);
        }

        return scheduledEventsPerDay;
    }

    // Schedule attractions in available time slots
    private static void scheduleAttractions(
            List<TimeSlot> freeTimeSlots,
            List<ScheduledEvent> scheduledEvents,
            Set<Attraction> notVisitedAttractions,
            int day) {

        ScheduledEvent lastScheduledEvent = scheduledEvents.isEmpty() ? null : scheduledEvents.get(scheduledEvents.size() - 1);

        for (TimeSlot slot : freeTimeSlots) {
            if (scheduledEvents.size() >= 4) break;

            Attraction nextAttraction = findNextAttraction(notVisitedAttractions, lastScheduledEvent, slot, day);

            if (nextAttraction != null) {
                ScheduledEvent newEvent = new ScheduledEvent(nextAttraction, slot);
                scheduledEvents.add(newEvent);
                notVisitedAttractions.remove(nextAttraction);
                lastScheduledEvent = newEvent;
            }
        }
    }

    private static Attraction findNextAttraction(
            Set<Attraction> notVisitedAttractions,
            ScheduledEvent lastScheduledEvent,
            TimeSlot slot,
            int day) {

        double lastLat = lastScheduledEvent != null ? lastScheduledEvent.getActivity().getLat() : 0.0;
        double lastLon = lastScheduledEvent != null ? lastScheduledEvent.getActivity().getLon() : 0.0;
        int currentHour = slot.getStart().getHour();

        List<Attraction> potentialAttractions = notVisitedAttractions.stream()
                .filter(attraction -> attraction.isOpenOnDay(day) && attraction.isOpenAtHour(currentHour))
                .sorted(Comparator.comparingInt(Attraction::getOpenDaysCount)
                        .thenComparing(attraction -> calculateDistance(lastLat, lastLon, attraction.getLat(), attraction.getLon()))
                        .thenComparing(attraction -> attraction.getBusyness(currentHour)))
                .toList();

        double[] rangeArray = {6.0, 8.0, 10.0};
        for (double range : rangeArray) {
            Optional<Attraction> attraction = potentialAttractions.stream()
                    .filter(a -> calculateDistance(lastLat, lastLon, a.getLat(), a.getLon()) <= range)
                    .findFirst();
            if (attraction.isPresent()) {
                return attraction.get();
            }
        }

        return potentialAttractions.stream()
                .min(Comparator.comparingInt(a -> a.getBusyness(currentHour)))
                .orElse(null);
    }

    private static double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lon1 - lon2, 2));
    }

    // Adjust available time slots by removing the allocated slot and adding any remaining time slots
    private static void adjustAvailableTimeSlots(List<TimeSlot> availableTimeSlots, TimeSlot original, TimeSlot allocated) {
        availableTimeSlots.remove(original);
        if (allocated.getStart().isAfter(original.getStart())) {
            availableTimeSlots.add(new TimeSlot(original.getStart(), allocated.getStart()));
        }
        if (allocated.getEnd().isBefore(original.getEnd())) {
            availableTimeSlots.add(new TimeSlot(allocated.getEnd(), original.getEnd()));
        }
    }

    private static boolean isTimeSlotAvailable(Event event, List<ScheduledEvent> scheduledEvents) {
        for (ScheduledEvent scheduledEvent : scheduledEvents) {
            TimeSlot scheduledTimeSlot = scheduledEvent.getTimeSlot();
            if (!(event.getEnd_time().isBefore(scheduledTimeSlot.getStart()) || event.getStart_time().isAfter(scheduledTimeSlot.getEnd()))) {
                return false;
            }
        }
        return true;
    }

    private static TimeSlot findAndAllocateTimeSlot(Event event, List<TimeSlot> availableTimeSlots) {
        for (TimeSlot timeSlot : availableTimeSlots) {
            if (!timeSlot.getStart().isAfter(event.getStart_time()) && !timeSlot.getEnd().isBefore(event.getEnd_time())) {
                TimeSlot allocatedSlot = new TimeSlot(event.getStart_time(), event.getEnd_time());
                adjustAvailableTimeSlots(availableTimeSlots, timeSlot, allocatedSlot);
                return allocatedSlot;
            }
        }
        return null;
    }

    public static List<TimeSlot> generateAvailableTimeSlots(List<ScheduledEvent> scheduledEvents) {
        List<TimeSlot> availableTimeSlots = new ArrayList<>();
        LocalTime dayStart = LocalTime.of(9, 0);
        LocalTime dayEnd = LocalTime.of(18, 0);

        LocalTime currentStart = dayStart;
        for (ScheduledEvent event : scheduledEvents) {
            LocalTime eventStart = event.getTimeSlot().getStart();
            if (Duration.between(currentStart, eventStart).toHours() >= 2) {
                while (Duration.between(currentStart, eventStart).toHours() >= 2) {
                    LocalTime slotEnd = currentStart.plusHours(2);
                    if (slotEnd.isAfter(eventStart)) {
                        slotEnd = eventStart;
                    }
                    availableTimeSlots.add(new TimeSlot(currentStart, slotEnd));
                    currentStart = slotEnd;
                }
            }
            currentStart = event.getTimeSlot().getEnd();
        }

        while (Duration.between(currentStart, dayEnd).toHours() >= 2) {
            LocalTime slotEnd = currentStart.plusHours(2);
            if (slotEnd.isAfter(dayEnd)) {
                slotEnd = dayEnd;
            }
            availableTimeSlots.add(new TimeSlot(currentStart, slotEnd));
            currentStart = slotEnd;
        }

        return availableTimeSlots;
    }



}
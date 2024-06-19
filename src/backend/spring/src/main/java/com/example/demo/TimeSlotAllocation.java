package com.example.demo;

import java.time.LocalTime;
import java.util.*;

public class TimeSlotAllocation {

    public static Map<Integer, List<ScheduledEvent>> timeSlotAllocationAlgorithm(
            Map<Integer, List<Event>> dayWiseEvents,
            Map<Integer, List<Attraction>> dayWiseAttractions,
            UserAvailability availability) {

        Map<Integer, List<ScheduledEvent>> scheduledEventsPerDay = new HashMap<>();

        for (Map.Entry<Integer, List<Event>> entry : dayWiseEvents.entrySet()) {
            int day = entry.getKey();
            List<Event> events = entry.getValue();
            List<Attraction> attractions = dayWiseAttractions.getOrDefault(day, new ArrayList<>());
            List<ScheduledEvent> scheduledEvents = new ArrayList<>();
            List<TimeSlot> availableTimeSlots = new ArrayList<>(availability.getTimeSlotsForDay(day));

            // Arrange events at first
            for (Event event : events) {
                if (scheduledEvents.size() >= 4) break;
                if (isTimeSlotAvailable(event, scheduledEvents)) {
                    TimeSlot optimalTimeSlot = findAndAllocateTimeSlot(event, availableTimeSlots);
                    if (optimalTimeSlot != null) {
                        scheduledEvents.add(new ScheduledEvent(event, optimalTimeSlot));
                    }
                } else {
                    System.out.println("Event \"" + event.getName() + "\" could not be scheduled due to a time conflict.");
                }
            }

            // Arrange Attractions after events
            List<ScheduledEvent> optimalAttractionSchedule = findOptimalAttractionSchedule(attractions, availableTimeSlots, scheduledEvents);
            for (ScheduledEvent attractionEvent : optimalAttractionSchedule) {
                if (scheduledEvents.size() < 4) {
                    scheduledEvents.add(attractionEvent);
                } else {
                    break;
                }
            }

            // Sorting by start time
            scheduledEvents.sort(Comparator.comparing(scheduledEvent -> scheduledEvent.getTimeSlot().getStart()));
            scheduledEventsPerDay.put(day, scheduledEvents);
        }
        return scheduledEventsPerDay;
    }

    private static List<ScheduledEvent> findOptimalAttractionSchedule(
            List<Attraction> attractions,
            List<TimeSlot> availableTimeSlots,
            List<ScheduledEvent> scheduledEvents) {

        List<ScheduledEvent> optimalSchedule = new ArrayList<>();
        Set<Attraction> visited = new HashSet<>();
        ScheduledEvent lastEvent = scheduledEvents.isEmpty() ? null : scheduledEvents.get(scheduledEvents.size() - 1);

        while (visited.size() < attractions.size()) {
            Attraction nextAttraction = null;
            TimeSlot bestTimeSlot = null;
            double minCost = Double.MAX_VALUE;

            for (Attraction attraction : attractions) {
                if (visited.contains(attraction)) continue;

                for (TimeSlot timeSlot : availableTimeSlots) {
                    LocalTime start = timeSlot.getStart().isBefore(LocalTime.of(9, 0)) ? LocalTime.of(9, 0) : timeSlot.getStart();
                    LocalTime end = timeSlot.getEnd().isAfter(LocalTime.of(16, 0)) ? LocalTime.of(16, 0) : timeSlot.getEnd();

                    while (!start.plusHours(2).isAfter(end)) {
                        TimeSlot candidateSlot = new TimeSlot(start, start.plusHours(2));

                        if (isTimeSlotAvailableForAttraction(candidateSlot, scheduledEvents, attraction)) {
                            double cost = calculateTotalCost(lastEvent, attraction, candidateSlot);

                            if (cost < minCost) {
                                minCost = cost;
                                nextAttraction = attraction;
                                bestTimeSlot = candidateSlot;
                            }
                        }

                        start = start.plusMinutes(60);
                    }
                }
            }

            if (nextAttraction != null && bestTimeSlot != null) {
                visited.add(nextAttraction);
                optimalSchedule.add(new ScheduledEvent(nextAttraction, bestTimeSlot));
                adjustAvailableTimeSlots(availableTimeSlots, findOriginalTimeSlot(availableTimeSlots, bestTimeSlot), bestTimeSlot);
                lastEvent = optimalSchedule.get(optimalSchedule.size() - 1);
            } else {
                break;
            }
        }
        return optimalSchedule;
    }

    private static double calculateStandardizedDistance(Activity lastActivity, Attraction nextAttraction) {
        if (lastActivity == null) return 0;
        double lastLat = lastActivity.getLat();
        double lastLon = lastActivity.getLon();
        double newLat = nextAttraction.getLat();
        double newLon = nextAttraction.getLon();
        double distance = Math.sqrt(Math.pow(lastLat - newLat, 2) + Math.pow(lastLon - newLon, 2));
        double maxDistance = 20.0;
        double minDistance = 1.0;
        return (distance - minDistance) / (maxDistance - minDistance);
    }

    private static double calculateStandardizedBusyness(TimeSlot timeSlot, Attraction attraction) {
        int busyness = attraction.getBusyness(timeSlot.getStart().getHour());
        int maxBusyness = 10;
        int minBusyness = 0;
        return (double) (busyness - minBusyness) / (maxBusyness - minBusyness);
    }

    private static double calculateTotalCost(ScheduledEvent lastEvent, Attraction attraction, TimeSlot candidateSlot) {
        double standardizedDistance = calculateStandardizedDistance(lastEvent != null ? lastEvent.getActivity() : null, attraction);
        double standardizedBusyness = calculateStandardizedBusyness(candidateSlot, attraction);
        return standardizedDistance + standardizedBusyness;
    }

    private static boolean isTimeSlotAvailableForAttraction(TimeSlot timeSlot, List<ScheduledEvent> scheduledEvents, Attraction attraction) {
        for (ScheduledEvent scheduledEvent : scheduledEvents) {
            TimeSlot scheduledTimeSlot = scheduledEvent.getTimeSlot();
            if (!(timeSlot.getEnd().isBefore(scheduledTimeSlot.getStart()) || timeSlot.getStart().isAfter(scheduledTimeSlot.getEnd()))) {
                return false;
            }
        }
        return true;
    }

    private static void adjustAvailableTimeSlots(List<TimeSlot> availableTimeSlots, TimeSlot original, TimeSlot allocated) {
        availableTimeSlots.remove(original);
        if (allocated.getStart().isAfter(original.getStart())) {
            availableTimeSlots.add(new TimeSlot(original.getStart(), allocated.getStart()));
        }
        if (allocated.getEnd().isBefore(original.getEnd())) {
            availableTimeSlots.add(new TimeSlot(allocated.getEnd(), original.getEnd()));
        }
    }

    private static TimeSlot findOriginalTimeSlot(List<TimeSlot> availableTimeSlots, TimeSlot allocated) {
        for (TimeSlot timeSlot : availableTimeSlots) {
            if (!timeSlot.getStart().isAfter(allocated.getStart()) && !timeSlot.getEnd().isBefore(allocated.getEnd())) {
                return timeSlot;
            }
        }
        return null;
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

    private static boolean isTimeSlotAvailable(Event event, List<ScheduledEvent> scheduledEvents) {
        for (ScheduledEvent scheduledEvent : scheduledEvents) {
            TimeSlot scheduledTimeSlot = scheduledEvent.getTimeSlot();
            if (!(event.getEnd_time().isBefore(scheduledTimeSlot.getStart()) || event.getStart_time().isAfter(scheduledTimeSlot.getEnd()))) {
                return false;
            }
        }
        return true;
    }
}
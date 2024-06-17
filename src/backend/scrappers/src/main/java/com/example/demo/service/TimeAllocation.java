package com.example.demo.service;

import java.util.ArrayList;
import java.util.HashMap;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TimeAllocation {


    // Define classes for TimeSlot, Event, ScheduledEvent, and UserAvailability

    class TimeSlot {
        private LocalTime start;
        private LocalTime end;

        public TimeSlot(LocalTime start, LocalTime end) {
            this.start = start;
            this.end = end;
        }

        public LocalTime getStart() {
            return start;
        }

        public LocalTime getEnd() {
            return end;
        }

        public double getDuration() {
            return java.time.Duration.between(start, end).toMinutes() / 60.0;
        }

        @Override
        public String toString() {
            return "TimeSlot(" + start + ", " + end + ")";
        }
    }

    class Event {
        private String name;
        private double duration; // in hours
        private int crowdVolume;

        public Event(String name, double duration, int crowdVolume) {
            this.name = name;
            this.duration = duration;
            this.crowdVolume = crowdVolume;
        }

        public String getName() {
            return name;
        }

        public double getDuration() {
            return duration;
        }

        public int getCrowdVolume() {
            return crowdVolume;
        }

        @Override
        public String toString() {
            return "Event(" + name + ", Duration: " + duration + "h, Crowd: " + crowdVolume + ")";
        }
    }

    class ScheduledEvent {
        private Event event;
        private TimeSlot timeSlot;

        public ScheduledEvent(Event event, TimeSlot timeSlot) {
            this.event = event;
            this.timeSlot = timeSlot;
        }

        @Override
        public String toString() {
            return "ScheduledEvent(" + event.getName() + ", " + timeSlot + ")";
        }
    }

    class UserAvailability {
        private Map<Integer, List<TimeSlot>> availability; // day -> list of time slots

        public UserAvailability(Map<Integer, List<TimeSlot>> availability) {
            this.availability = availability;
        }

        public List<TimeSlot> getTimeSlotsForDay(int day) {
            return availability.getOrDefault(day, new ArrayList<>());
        }
    }

    public Map<Integer, List<ScheduledEvent>> timeSlotAllocationAlgorithm(Map<Integer, List<Event>> dayWiseEvents, Map<Event, Integer> crowdData, UserAvailability availability) {
        Map<Integer, List<ScheduledEvent>> scheduledEventsPerDay = new HashMap<>();

        // Iterate through each day's events
        for (Map.Entry<Integer, List<Event>> entry : dayWiseEvents.entrySet()) {
            int day = entry.getKey();
            List<Event> events = entry.getValue();
            List<ScheduledEvent> scheduledEvents = new ArrayList<>();

            // Sort events by crowd volume in ascending order (less crowded first)
            Collections.sort(events, (e1, e2) -> crowdData.get(e1) - crowdData.get(e2));

            // Get available time slots for the day
            List<TimeSlot> availableTimeSlots = availability.getTimeSlotsForDay(day);

            // Allocate time slots for each event
            for (Event event : events) {
                TimeSlot optimalTimeSlot = findOptimalTimeSlot(event, availableTimeSlots, crowdData.get(event));
                if (optimalTimeSlot != null) {
                    scheduledEvents.add(new ScheduledEvent(event, optimalTimeSlot));
                    // Remove the allocated time slot from availability
                    removeTimeSlot(availableTimeSlots, optimalTimeSlot);
                }
            }

            scheduledEventsPerDay.put(day, scheduledEvents);
        }

        return scheduledEventsPerDay;
    }

    private static TimeSlot findOptimalTimeSlot(Event event, List<TimeSlot> availableTimeSlots, int crowdVolume) {
        TimeSlot optimalTimeSlot = null;
        double bestScore = Double.NEGATIVE_INFINITY;

        for (TimeSlot timeSlot : availableTimeSlots) {
            if (timeSlot.getDuration() >= event.getDuration()) {
                double score = calculateTimeSlotScore(timeSlot, crowdVolume);
                if (score > bestScore) {
                    bestScore = score;
                    optimalTimeSlot = timeSlot;
                }
            }
        }

        return optimalTimeSlot;
    }

    private static double calculateTimeSlotScore(TimeSlot timeSlot, int crowdVolume) {
        // Less crowd volume means higher score
        return 100 - crowdVolume;
    }

    private static void removeTimeSlot(List<TimeSlot> availableTimeSlots, TimeSlot allocatedTimeSlot) {
        availableTimeSlots.remove(allocatedTimeSlot);
    }
}

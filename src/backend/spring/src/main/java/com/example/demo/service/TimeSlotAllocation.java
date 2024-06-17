package com.example.demo.service;

import com.example.demo.model.*;
import com.example.demo.model.test.*;
import com.example.demo.model.test.Event;
import com.example.demo.model.test.ScheduledEvent;

import java.util.*;

public class TimeSlotAllocation {

    public Map<Integer, List<ScheduledEvent>> timeSlotAllocationAlgorithm(Map<Integer, List<Event>> dayWiseEvents, Map<Event, Integer> crowdData, UserAvailability availability) {
        Map<Integer, List<ScheduledEvent>> scheduledEventsPerDay = new HashMap<>();

        for (Map.Entry<Integer, List<Event>> entry : dayWiseEvents.entrySet()) {
            int day = entry.getKey();
            List<Event> events = entry.getValue();
            List<ScheduledEvent> scheduledEvents = new ArrayList<>();

            Collections.sort(events, (e1, e2) -> crowdData.get(e1) - crowdData.get(e2));

            List<TimeSlot> availableTimeSlots = availability.getTimeSlotsForDay(day);

            for (Event event : events) {
                TimeSlot optimalTimeSlot = findOptimalTimeSlot(event, availableTimeSlots, crowdData.get(event));
                if (optimalTimeSlot != null) {
                    scheduledEvents.add(new ScheduledEvent(event, optimalTimeSlot));
                    removeTimeSlot(availableTimeSlots, optimalTimeSlot);
                }
            }

            scheduledEventsPerDay.put(day, scheduledEvents);
        }

        return scheduledEventsPerDay;
    }

    private TimeSlot findOptimalTimeSlot(Event event, List<TimeSlot> availableTimeSlots, int crowdVolume) {
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

    private double calculateTimeSlotScore(TimeSlot timeSlot, int crowdVolume) {
        return 100 - crowdVolume;
    }

    private void removeTimeSlot(List<TimeSlot> availableTimeSlots, TimeSlot allocatedTimeSlot) {
        availableTimeSlots.remove(allocatedTimeSlot);
    }
}
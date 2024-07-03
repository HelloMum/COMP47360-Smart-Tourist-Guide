package com.example.demo.service;

import com.example.demo.model.test.*;
import com.example.demo.model.test.Event;
import com.example.demo.model.test.ScheduledEvent;
import com.example.demo.model.test.TimeSlot;
import java.util.*;

public class TimeSlotAllocation {

    public Map<Integer, List<ScheduledEvent>> timeSlotAllocationAlgorithm(Map<Integer, List<Event>> dayWiseEvents, Map<Event, Integer> crowdData, UserAvailability availability) {
        Map<Integer, List<ScheduledEvent>> scheduledEventsPerDay = new HashMap<>();

        for (Map.Entry<Integer, List<Event>> entry : dayWiseEvents.entrySet()) {
            int day = entry.getKey();
            List<Event> events = new ArrayList<>(entry.getValue()); // Convert to mutable list
            List<ScheduledEvent> scheduledEvents = new ArrayList<>();

            events.sort(Comparator.comparingInt(crowdData::get));

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
                    optimalTimeSlot = new TimeSlot(timeSlot.getStart(), timeSlot.getStart().plusMinutes((long) (event.getDuration() * 60)));
                }
            }
        }

        return optimalTimeSlot;
    }

    private double calculateTimeSlotScore(TimeSlot timeSlot, int crowdVolume) {
        return 100 - crowdVolume;
    }

    private void removeTimeSlot(List<TimeSlot> availableTimeSlots, TimeSlot allocatedTimeSlot) {
        Iterator<TimeSlot> iterator = availableTimeSlots.iterator();
        while (iterator.hasNext()) {
            TimeSlot timeSlot = iterator.next();
            if (timeSlot.getStart().equals(allocatedTimeSlot.getStart()) && timeSlot.getEnd().equals(allocatedTimeSlot.getEnd())) {
                iterator.remove();
                break;
            } else if (timeSlot.getStart().equals(allocatedTimeSlot.getStart())) {
                timeSlot.setStart(allocatedTimeSlot.getEnd());
                break;
            } else if (timeSlot.getEnd().equals(allocatedTimeSlot.getEnd())) {
                timeSlot.setEnd(allocatedTimeSlot.getStart());
                break;
            } else if (timeSlot.getStart().isBefore(allocatedTimeSlot.getStart()) && timeSlot.getEnd().isAfter(allocatedTimeSlot.getEnd())) {
                availableTimeSlots.add(new TimeSlot(timeSlot.getStart(), allocatedTimeSlot.getStart()));
                timeSlot.setStart(allocatedTimeSlot.getEnd());
                break;
            }
        }
    }
}
package com.example.demo;

import java.util.*;

public class TimeSlotAllocation {
    public static Map<Integer, List<ScheduledEvent>> timeSlotAllocationAlgorithm(Map<Integer, List<Event>> dayWiseEvents, UserAvailability availability) {
        Map<Integer, List<ScheduledEvent>> scheduledEventsPerDay = new HashMap<>();

        // Iterate through each day's events
        for (Map.Entry<Integer, List<Event>> entry : dayWiseEvents.entrySet()) {
            int day = entry.getKey();
            List<Event> events = entry.getValue();
            List<ScheduledEvent> scheduledEvents = new ArrayList<>();

            // Get available time slots for the day
            List<TimeSlot> availableTimeSlots = new ArrayList<>(availability.getTimeSlotsForDay(day)); // Use ArrayList to ensure mutability

            // Allocate time slots for each event
            for (Event event : events) {
                if (isTimeSlotAvailable(event, scheduledEvents)) {
                    TimeSlot optimalTimeSlot = findAndAllocateTimeSlot(event, availableTimeSlots);
                    if (optimalTimeSlot != null) {
                        scheduledEvents.add(new ScheduledEvent(event, optimalTimeSlot));
                    }
                } else {
                    System.out.println("Event \"" + event.getName() + "\" could not be scheduled due to a time conflict.");
                }
            }

            // Sort scheduled events by start time
            scheduledEvents.sort(Comparator.comparing(scheduledEvent -> scheduledEvent.getTimeSlot().getStart()));

            scheduledEventsPerDay.put(day, scheduledEvents);
        }

        return scheduledEventsPerDay;
    }

    // Find and allocate the optimal time slot for an event
    private static TimeSlot findAndAllocateTimeSlot(Event event, List<TimeSlot> availableTimeSlots) {
        for (TimeSlot timeSlot : availableTimeSlots) {
            if (!timeSlot.getStart().isAfter(event.getStart_time()) && !timeSlot.getEnd().isBefore(event.getEnd_time())) {
                // Once a suitable time slot is found, split the time slot
                TimeSlot allocatedSlot = new TimeSlot(event.getStart_time(), event.getEnd_time());
                adjustAvailableTimeSlots(availableTimeSlots, timeSlot, allocatedSlot);
                return allocatedSlot;
            }
        }
        return null;
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

    // Check if the time slot for the new event is available using left-closed, right-open intervals
    private static boolean isTimeSlotAvailable(Event event, List<ScheduledEvent> scheduledEvents) {
        for (ScheduledEvent scheduledEvent : scheduledEvents) {
            TimeSlot scheduledTimeSlot = scheduledEvent.getTimeSlot();
            // Check for overlap using left-closed, right-open intervals
            if (!(event.getEnd_time().isBefore(scheduledTimeSlot.getStart()) || event.getStart_time().isAfter(scheduledTimeSlot.getEnd()))) {
                return false;
            }
        }
        return true;
    }
}
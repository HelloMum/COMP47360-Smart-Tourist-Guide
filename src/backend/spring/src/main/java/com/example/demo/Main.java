package com.example.demo;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        try {
            // Sample data
            Map<Integer, List<TimeSlot>> availabilityMap = new HashMap<>();
            // Setting the availability for the entire day (00:00 to 23:59)
            availabilityMap.put(1, new ArrayList<>(List.of(new TimeSlot(LocalTime.of(0, 0), LocalTime.of(23, 59)))));
            availabilityMap.put(2, new ArrayList<>(List.of(new TimeSlot(LocalTime.of(0, 0), LocalTime.of(23, 59)))));
            availabilityMap.put(3, new ArrayList<>(List.of(new TimeSlot(LocalTime.of(0, 0), LocalTime.of(23, 59)))));

            UserAvailability userAvailability = new UserAvailability(availabilityMap);

            List<Event> events = List.of(
                    new Event("Event 1", 1, LocalTime.of(21, 0), LocalTime.of(22, 30)),
                    new Event("Event 2", 1, LocalTime.of(11, 0), LocalTime.of(12, 0)),
                    new Event("Event 3", 1, LocalTime.of(11, 30), LocalTime.of(15, 0)),  // This event conflicts with Event 2
                    new Event("Event 4", 2, LocalTime.of(10, 0), LocalTime.of(12, 0)),
                    new Event("Event 5", 3, LocalTime.of(8, 30), LocalTime.of(10, 0))
            );

            // Day-wise event distribution
            Map<Integer, List<Event>> dayWiseEvents = new HashMap<>();
            dayWiseEvents.put(1, List.of(events.get(0), events.get(1), events.get(2))); // Event 1, 2, 3 on Day 1
            dayWiseEvents.put(2, List.of(events.get(3))); // Event 4 on Day 2
            dayWiseEvents.put(3, List.of(events.get(4))); // Event 5 on Day 3

            // Run the allocation algorithm
            Map<Integer, List<ScheduledEvent>> scheduledEventsPerDay = TimeSlotAllocation.timeSlotAllocationAlgorithm(dayWiseEvents, userAvailability);

            // Display scheduled events
            System.out.println("\nFinal Scheduled Events:");
            for (Map.Entry<Integer, List<ScheduledEvent>> entry : scheduledEventsPerDay.entrySet()) {
                int day = entry.getKey();
                List<ScheduledEvent> scheduledEvents = entry.getValue();
                System.out.println("Day " + day + ": " + scheduledEvents);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
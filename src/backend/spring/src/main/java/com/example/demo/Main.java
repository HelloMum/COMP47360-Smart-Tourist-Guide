package com.example.demo;

import java.time.LocalTime;
import java.util.*;

public class Main {
    private static final double[][] REGION_BOUNDARIES = {
            {0.0, 0.0, 5.0, 5.0},
            {5.0, 0.0, 10.0, 5.0},
            {0.0, 5.0, 5.0, 10.0},
            {5.0, 5.0, 10.0, 10.0}
    };

    private static final Map<Integer, Integer> BUSYNESS_REGION_1 = Map.of(
            9, 7,
            10, 8,
            11, 9,
            12, 10,
            13, 10,
            14, 9,
            15, 8,
            16, 7,
            17, 6
    );

    private static final Map<Integer, Integer> BUSYNESS_REGION_2 = Map.of(
            9, 5,
            10, 4,
            11, 3,
            12, 2,
            13, 2,
            14, 3,
            15, 4,
            16, 5,
            17, 6
    );

    private static final Map<Integer, Integer> BUSYNESS_REGION_3 = Map.of(
            9, 2,
            10, 3,
            11, 4,
            12, 5,
            13, 6,
            14, 7,
            15, 8,
            16, 9,
            17, 7
    );

    private static final Map<Integer, Integer> BUSYNESS_REGION_4 = Map.of(
            9, 4,
            10, 5,
            11, 6,
            12, 7,
            13, 7,
            14, 6,
            15, 5,
            16, 4,
            17, 4
    );

    private static Map<Integer, Integer> getRegionBusyness(double lat, double lon) {
        for (int i = 0; i < REGION_BOUNDARIES.length; i++) {
            double[] bounds = REGION_BOUNDARIES[i];
            if (lat >= bounds[0] && lat <= bounds[2] && lon >= bounds[1] && lon <= bounds[3]) {
                switch (i) {
                    case 0:
                        return BUSYNESS_REGION_1;
                    case 1:
                        return BUSYNESS_REGION_2;
                    case 2:
                        return BUSYNESS_REGION_3;
                    case 3:
                        return BUSYNESS_REGION_4;
                }
            }
        }
        return BUSYNESS_REGION_1;
    }

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
                    new Event("Event 1", 1, LocalTime.of(21, 0), LocalTime.of(22, 30), 1, 1),
                    new Event("Event 2", 1, LocalTime.of(11, 0), LocalTime.of(12, 0), 2, 5),
                    new Event("Event 3", 1, LocalTime.of(11, 30), LocalTime.of(15, 0), 5, 10),  // This event conflicts with Event 2
                    new Event("Event 4", 2, LocalTime.of(10, 0), LocalTime.of(12, 0), 7, 4),
                    new Event("Event 5", 3, LocalTime.of(8, 30), LocalTime.of(10, 0), 9, 2)
            );

            List<Attraction> attractions = List.of(
                    new Attraction("Attraction 1", 2.0, 6.0, "We-Su 12:00-17:00", getRegionBusyness(2.0, 6.0)),
                    new Attraction("Attraction 2", 4.0, 8.0, getRegionBusyness(4.0, 8.0)),
                    new Attraction("Attraction 3", 9.0, 1.0, "Mo-Fr 10:00-17:00", getRegionBusyness(9.0, 1.0)),
                    new Attraction("Attraction 4", 3.0, 2.0, "Mo-Fr 10:00-17:00", getRegionBusyness(3.0, 2.0)),
                    new Attraction("Attraction 5", 7.0, 6.0, "Mo-Fr 10:00-17:00", getRegionBusyness(7.0, 6.0)),
                    new Attraction("Attraction 6", 3.0, 9.0, "Mo-Th 12:00-19:00", getRegionBusyness(3.0, 9.0)),
                    new Attraction("Attraction 7", 6.0, 1.0, getRegionBusyness(6.0, 1.0))
            );

            // Day-wise event distribution
            Map<Integer, List<Event>> dayWiseEvents = new HashMap<>();
            dayWiseEvents.put(1, List.of(events.get(0), events.get(1), events.get(2))); // Event 1, 2, 3 on Day 1
            dayWiseEvents.put(2, List.of(events.get(3))); // Event 4 on Day 2
            dayWiseEvents.put(3, List.of(events.get(4))); // Event 5 on Day 3

            // Day-wise attraction distribution
            Map<Integer, List<Attraction>> dayWiseAttractions = new HashMap<>();
            dayWiseAttractions.put(1, List.of(attractions.get(0), attractions.get(1), attractions.get(2)));
            dayWiseAttractions.put(2, List.of(attractions.get(3), attractions.get(4)));
            dayWiseAttractions.put(3, List.of(attractions.get(5), attractions.get(6)));

            // Run the allocation algorithm
            Map<Integer, List<ScheduledEvent>> scheduledEventsPerDay = TimeSlotAllocation.timeSlotAllocationAlgorithm(dayWiseEvents, dayWiseAttractions, userAvailability);

            // Display scheduled events
            System.out.println("\nFinal Scheduled Events:");
            for (Map.Entry<Integer, List<ScheduledEvent>> entry : scheduledEventsPerDay.entrySet()) {
                int day = entry.getKey();
                List<ScheduledEvent> scheduledEvents = entry.getValue();
                System.out.println("Day " + day + ":");
                for (ScheduledEvent scheduledEvent : scheduledEvents) {
                    System.out.println(scheduledEvent);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void printAttractionsBusynessAt10(List<Attraction> attractions) {
        System.out.println("\nAttractions busyness at 10:00:");
        for (Attraction attraction : attractions) {
            int busynessAt10 = attraction.getBusyness(10);
            System.out.println(attraction.getName() + " at 10:00 has busyness level: " + busynessAt10);
        }
    }
}
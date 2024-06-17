package com.example.demo.service;

import com.example.demo.model.*;
import com.example.demo.model.test.*;
import com.example.demo.model.test.Event;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class TimeSlotAllocationTest {

    private TimeSlotAllocation timeSlotAllocationService;

    @BeforeEach
    public void setUp() {
        timeSlotAllocationService = new TimeSlotAllocation();
    }

    @Test
    public void testTimeSlotAllocationAlgorithm() {
        Map<Integer, List<TimeSlot>> availabilityMap = new HashMap<>();
        availabilityMap.put(1, List.of(new TimeSlot(LocalTime.of(9, 0), LocalTime.of(18, 0))));
        availabilityMap.put(2, List.of(new TimeSlot(LocalTime.of(10, 0), LocalTime.of(17, 0))));
        availabilityMap.put(3, List.of(new TimeSlot(LocalTime.of(8, 0), LocalTime.of(20, 0))));

        UserAvailability userAvailability = new UserAvailability(availabilityMap);

        List<Event> events = List.of(
            new Event("Event 1", 2, 30),
            new Event("Event 2", 1, 50),
            new Event("Event 3", 3, 20),
            new Event("Event 4", 2, 40),
            new Event("Event 5", 1.5, 25)
        );

        Map<Event, Integer> crowdData = new HashMap<>();
        for (Event event : events) {
            crowdData.put(event, event.getCrowdVolume());
        }

        Map<Integer, List<Event>> dayWiseEvents = new HashMap<>();
        dayWiseEvents.put(1, List.of(events.get(0), events.get(1), events.get(2)));
        dayWiseEvents.put(2, List.of(events.get(3)));
        dayWiseEvents.put(3, List.of(events.get(4)));

        Map<Integer, List<ScheduledEvent>> scheduledEventsPerDay = timeSlotAllocationService.timeSlotAllocationAlgorithm(dayWiseEvents, crowdData, userAvailability);

        for (Map.Entry<Integer, List<ScheduledEvent>> entry : scheduledEventsPerDay.entrySet()) {
            int day = entry.getKey();
            List<ScheduledEvent> scheduledEvents = entry.getValue();
            System.out.println("Day " + day + ": " + scheduledEvents);
        }

        // Add assertions to validate the results
        assertEquals(3, scheduledEventsPerDay.get(1).size());
        assertEquals(1, scheduledEventsPerDay.get(2).size());
        assertEquals(1, scheduledEventsPerDay.get(3).size());
    }
}
package com.example.demo.model.test;

import java.util.List;
import java.util.Map;

public class UserAvailability {
    private Map<Integer, List<TimeSlot>> availability; // day -> list of time slots

    public UserAvailability(Map<Integer, List<TimeSlot>> availability) {
        this.availability = availability;
    }

    public List<TimeSlot> getTimeSlotsForDay(int day) {
        return availability.getOrDefault(day, List.of());
    }
}
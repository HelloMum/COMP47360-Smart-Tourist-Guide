package com.example.demo;

import java.time.Duration;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
    private int date;
    private double duration; // in hours
    private LocalTime start_time;
    private LocalTime end_time;

    public Event(String name, int date, LocalTime start_time, LocalTime end_time) {
        this.name = name;
        this.date = date;
        this.start_time = start_time;
        this.end_time = end_time;
        this.duration = Duration.between(end_time, start_time).toMinutes() / 60.0;
    }

    public String getName() {
        return name;
    }

    public int getDate() {
        return date;
    }

    public double getDuration() {
        return duration;
    }


    public LocalTime getStart_time() {
        return start_time;
    }

    public LocalTime getEnd_time() {
        return end_time;
    }

    @Override
    public String toString() {
        return "Event(" + name + "Date: " + date + "time: " + start_time + "time: " + end_time + ", Duration: " + duration + "h)";
    }
}

class ScheduledEvent {
    private Event event;
    private TimeSlot timeSlot;

    public ScheduledEvent(Event event, TimeSlot timeSlot) {
        this.event = event;
        this.timeSlot = timeSlot;
    }

    public Event getEvent() {
        return event;
    }

    public TimeSlot getTimeSlot() {
        return timeSlot;
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
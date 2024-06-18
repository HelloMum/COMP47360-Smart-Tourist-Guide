package com.example.demo.model.test;

import com.example.demo.model.test.Event;

public class ScheduledEvent {
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
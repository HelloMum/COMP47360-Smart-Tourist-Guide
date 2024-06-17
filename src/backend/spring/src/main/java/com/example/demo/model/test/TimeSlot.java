package com.example.demo.model.test;

import java.time.LocalTime;

public class TimeSlot {
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
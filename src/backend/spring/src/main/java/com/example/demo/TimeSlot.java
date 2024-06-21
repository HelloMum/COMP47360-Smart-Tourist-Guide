package com.example.demo;

import java.time.Duration;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

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
        return Duration.between(start, end).toMinutes() / 60.0;
    }

    @Override
    public String toString() {
        return "TimeSlot(" + start + ", " + end + ")";
    }
}


abstract class Activity {
    private String name;
    private LocalTime start_time;
    private LocalTime end_time;
    private double lat;
    private double lon;

    public Activity(String name, double lat, double lon) {
        this.name = name;
        this.lat = lat;
        this.lon = lon;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalTime getStart_time() {
        return start_time;
    }

    public void setStart_time(LocalTime start_time) {
        this.start_time = start_time;
    }

    public LocalTime getEnd_time() {
        return end_time;
    }

    public void setEnd_time(LocalTime end_time) {
        this.end_time = end_time;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLon() {
        return lon;
    }

    public void setLon(double lon) {
        this.lon = lon;
    }
}

class Event extends Activity {
    private double duration;
    private int date;

    public Event(String name, int date, LocalTime start_time, LocalTime end_time, double lat, double lon) {
        super(name, lat, lon);
        this.date = date;
        setStart_time(start_time);
        setEnd_time(end_time);
        this.duration = Duration.between(start_time, end_time).toMinutes() / 60.0;
    }

    public int getDate() {
        return date;
    }

    public void setDate(int date) {
        this.date = date;
    }

    public double getDuration() {
        return duration;
    }

    public void setDuration(double duration) {
        this.duration = duration;
    }
}


class Attraction extends Activity {
    private String openingHours;
    private Map<Integer, Integer> hourlyBusyness;

    public Attraction(String name, Double lat, Double lon, String openingHours, Map<Integer, Integer> hourlyBusyness) {
        super(name, lat, lon);
        this.openingHours = openingHours;
        this.hourlyBusyness = hourlyBusyness;
    }

    public Attraction(String name, Double lat, Double lon, Map<Integer, Integer> hourlyBusyness) {
        super(name, lat, lon);
        this.openingHours = null;
        this.hourlyBusyness = hourlyBusyness;
    }

    public int getBusyness(int hour) {
        return hourlyBusyness.getOrDefault(hour, 0);
    }

    public String getOpeningHours() {
        return openingHours;
    }

    public void setOpeningHours(String openingHours) {
        this.openingHours = openingHours;
    }
}
class ScheduledEvent {
    private Activity activity;
    private TimeSlot timeSlot;

    public ScheduledEvent(Activity activity, TimeSlot timeSlot) {
        this.activity = activity;
        this.timeSlot = timeSlot;
    }

    public Activity getActivity() {
        return activity;
    }

    public TimeSlot getTimeSlot() {
        return timeSlot;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("ScheduledEvent(").append(activity.getName()).append(", ").append(timeSlot);
        if (activity instanceof Attraction) {
            Attraction attraction = (Attraction) activity;
            int busynessStart = attraction.getBusyness(timeSlot.getStart().getHour());
            sb.append(", Busyness at start: ").append(busynessStart);
        }
        sb.append(")");
        return sb.toString();
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

    public Set<Integer> getDays() {
        return availability.keySet();
    }
}
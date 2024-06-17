package com.example.demo.model.test;

public class Event {
    private String name;
    private double duration; // in hours
    private int crowdVolume;

    public Event(String name, double duration, int crowdVolume) {
        this.name = name;
        this.duration = duration;
        this.crowdVolume = crowdVolume;
    }

    public String getName() {
        return name;
    }

    public double getDuration() {
        return duration;
    }

    public int getCrowdVolume() {
        return crowdVolume;
    }

    @Override
    public String toString() {
        return "Event(" + name + ", Duration: " + duration + "h, Crowd: " + crowdVolume + ")";
    }
}
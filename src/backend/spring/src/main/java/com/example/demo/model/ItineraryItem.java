package com.example.demo.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class ItineraryItem {
    private Object id;
    private String name;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private double latitude;
    private double longitude;
    private boolean isEvent;

    public ItineraryItem() {}

    public ItineraryItem(UUID id, String name, LocalDateTime startTime, LocalDateTime endTime, double latitude, double longitude, boolean isEvent) {
        this.id = id;
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
        this.latitude = latitude;
        this.longitude = longitude;
        this.isEvent = isEvent;
    }

    public ItineraryItem(int id, String name, LocalDateTime startTime, LocalDateTime endTime, double latitude, double longitude, boolean isEvent) {
        this.id = id;
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
        this.latitude = latitude;
        this.longitude = longitude;
        this.isEvent = isEvent;
    }

    public Object getId() {
        return id;
    }

    public void setId(Object id) {
        this.id = id;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public boolean isEvent() {
        return isEvent;
    }

    public void setEvent(boolean event) {
        isEvent = event;
    }
}
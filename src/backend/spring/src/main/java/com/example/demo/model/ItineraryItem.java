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
    private double busyness;
    private boolean isFree;
    private String category;
    private String address;
    private String website;
    private String description;
    private double rating;
    private int user_ratings_total;
    private String attraction_phone_number;
    private String international_phone_number;
    private String event_image;

    public ItineraryItem() {}

    public ItineraryItem(UUID id, String name, LocalDateTime startTime, LocalDateTime endTime, double latitude, double longitude, boolean isEvent, boolean isFree, String category, String address, String website, String description, String event_image) {
        this.id = id;
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
        this.latitude = latitude;
        this.longitude = longitude;
        this.isEvent = isEvent;
        this.isFree = isFree;
        this.category = category;
        this.address = address;
        this.website = website;
        this.description = description;
        this.event_image = event_image;
    }

    public ItineraryItem(int id, String name, LocalDateTime startTime, LocalDateTime endTime, double latitude, double longitude, boolean isEvent, boolean isFree, String category, String address, String website, String description, double rating, int userRatings_total, String attraction_phone_number, String international_phone_number) {
        this.id = id;
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
        this.latitude = latitude;
        this.longitude = longitude;
        this.isEvent = isEvent;
        this.isFree = isFree;
        this.category = category;
        this.address = address;
        this.website = website;
        this.description = description;
        this.rating = rating;
        this.user_ratings_total = userRatings_total;
        this.attraction_phone_number = attraction_phone_number;
        this.international_phone_number = international_phone_number;
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

    public double getBusyness() {
        return busyness;
    }

    public void setBusyness(double busyness) {
        this.busyness = busyness;
    }

    public boolean isFree() { return isFree; }

    public void setFree(boolean free) { isFree = free; }

    public String getCategory() { return category; }

    public void setCategory(String category) { this.category = category; }

    public String getWebsite() { return website; }

    public void setWebsite(String website) { this.website = website; }

    public String getAddress() { return address; }

    public void setAddress(String address) { this.address = address; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public double getRating() { return rating; }

    public void setRating(double rating) { this.rating = rating; }

    public int getUserRatings_total() { return user_ratings_total; }

    public String getAttraction_phone_number() { return attraction_phone_number; }

    public String getInternational_phone_number() { return international_phone_number; }

    public String getEvent_image() { return event_image; }
}
package com.example.demo.model;

import jakarta.persistence.Entity;

import java.util.List;

public class Attraction {
    private int taxi_zone;
    private String zone_name;
    private String attraction_place_id;
    private int index;
    private String attraction_name;
    private String category;
    private double price;
    private boolean isFree;
    private String description;
    private double attraction_latitude;
    private double attraction_longitude;
    private String attraction_vicinity;
    private double attraction_rating;
    private int user_ratings_total;
    private String attraction_phone_number;
    private String attractionWebsite;
    private String opening_hours;
    private int price_level;
    private List<String> types;
    private String international_phone_number;
    private String url;
    private String icon;
    private String formatted_hours;
    private String popular_times;
    private List<String> time_spent;
    private double current_popularity;

    public int getTaxi_zone() {
        return taxi_zone;
    }

    public void setTaxi_zone(int taxi_zone) {
        this.taxi_zone = taxi_zone;
    }

    public String getZone_name() {
        return zone_name;
    }

    public void setZone_name(String zone_name) {
        this.zone_name = zone_name;
    }

    public String getAttraction_place_id() {
        return attraction_place_id;
    }

    public void setAttraction_place_id(String attraction_place_id) {
        this.attraction_place_id = attraction_place_id;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public String getAttraction_name() {
        return attraction_name;
    }

    public void setAttraction_name(String attraction_name) {
        this.attraction_name = attraction_name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public boolean isFree() {
        return isFree;
    }

    public void setFree(boolean free) {
        isFree = free;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getAttraction_latitude() {
        return attraction_latitude;
    }

    public void setAttraction_latitude(double attraction_latitude) {
        this.attraction_latitude = attraction_latitude;
    }

    public double getAttraction_longitude() {
        return attraction_longitude;
    }

    public void setAttraction_longitude(double attraction_longitude) {
        this.attraction_longitude = attraction_longitude;
    }

    public String getAttraction_vicinity() {
        return attraction_vicinity;
    }

    public void setAttraction_vicinity(String attraction_vicinity) {
        this.attraction_vicinity = attraction_vicinity;
    }

    public double getAttraction_rating() {
        return attraction_rating;
    }

    public void setAttraction_rating(double attraction_rating) {
        this.attraction_rating = attraction_rating;
    }

    public int getUser_ratings_total() {
        return user_ratings_total;
    }

    public void setUser_ratings_total(int user_ratings_total) {
        this.user_ratings_total = user_ratings_total;
    }

    public String getAttraction_phone_number() {
        return attraction_phone_number;
    }

    public void setAttraction_phone_number(String attraction_phone_number) {
        this.attraction_phone_number = attraction_phone_number;
    }

    public String getAttractionWebsite() {
        return attractionWebsite;
    }

    public void setAttractionWebsite(String attractionWebsite) {
        this.attractionWebsite = attractionWebsite;
    }

    public String getOpening_hours() {
        return opening_hours;
    }

    public void setOpening_hours(String opening_hours) {
        this.opening_hours = opening_hours;
    }

    public int getPrice_level() {
        return price_level;
    }

    public void setPrice_level(int price_level) {
        this.price_level = price_level;
    }

    public List<String> getTypes() {
        return types;
    }

    public void setTypes(List<String> types) {
        this.types = types;
    }

    public String getInternational_phone_number() {
        return international_phone_number;
    }

    public void setInternational_phone_number(String international_phone_number) {
        this.international_phone_number = international_phone_number;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getFormatted_hours() {
        return formatted_hours;
    }

    public void setFormatted_hours(String formatted_hours) {
        this.formatted_hours = formatted_hours;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getPopular_times() {
        return popular_times;
    }

    public void setPopular_times(String popular_times) {
        this.popular_times = popular_times;
    }

    public List<String> getTime_spent() {
        return time_spent;
    }

    public void setTime_spent(List<String> time_spent) {
        this.time_spent = time_spent;
    }

    public double getCurrent_popularity() {
        return current_popularity;
    }

    public void setCurrent_popularity(double current_popularity) {
        this.current_popularity = current_popularity;
    }
}
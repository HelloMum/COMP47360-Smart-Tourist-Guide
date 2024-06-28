package com.example.demo.model;

import jakarta.persistence.Entity;

import java.util.List;

public class Attraction {
    private int index;
    private int taxiZone;
    private String zoneName;
    private String attractionPlaceId;
    private String attractionName;
    private double attractionLatitude;
    private double attractionLongitude;
    private String attractionVicinity;
    private double attractionRating;
    private double userRatingsTotal;
    private String attractionPhoneNumber;
    private String attractionWebsite;
    private List<String> openingHours;
    private int priceLevel;
    private List<String> types;
    private String internationalPhoneNumber;
    private String url;
    private String icon;
    private String formattedHours;
    private String category;
    private String description;
    private double price;
    private boolean isFree;
    private String popularTimes;
    private String timeSpent;
    private double currentPopularity;

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public int getTaxiZone() {
        return taxiZone;
    }

    public void setTaxiZone(int taxiZone) {
        this.taxiZone = taxiZone;
    }

    public String getZoneName() {
        return zoneName;
    }

    public void setZoneName(String zoneName) {
        this.zoneName = zoneName;
    }

    public String getAttractionPlaceId() {
        return attractionPlaceId;
    }

    public void setAttractionPlaceId(String attractionPlaceId) {
        this.attractionPlaceId = attractionPlaceId;
    }

    public String getAttractionName() {
        return attractionName;
    }

    public void setAttractionName(String attractionName) {
        this.attractionName = attractionName;
    }

    public double getAttractionLongitude() {
        return attractionLongitude;
    }

    public void setAttractionLongitude(double attractionLongitude) {
        this.attractionLongitude = attractionLongitude;
    }

    public double getAttractionLatitude() {
        return attractionLatitude;
    }

    public void setAttractionLatitude(double attractionLatitude) {
        this.attractionLatitude = attractionLatitude;
    }

    public String getAttractionVicinity() {
        return attractionVicinity;
    }

    public void setAttractionVicinity(String attractionVicinity) {
        this.attractionVicinity = attractionVicinity;
    }

    public double getAttractionRating() {
        return attractionRating;
    }

    public void setAttractionRating(double attractionRating) {
        this.attractionRating = attractionRating;
    }

    public double getUserRatingsTotal() {
        return userRatingsTotal;
    }

    public void setUserRatingsTotal(double userRatingsTotal) {
        this.userRatingsTotal = userRatingsTotal;
    }

    public String getAttractionPhoneNumber() {
        return attractionPhoneNumber;
    }

    public void setAttractionPhoneNumber(String attractionPhoneNumber) {
        this.attractionPhoneNumber = attractionPhoneNumber;
    }

    public String getAttractionWebsite() {
        return attractionWebsite;
    }

    public void setAttractionWebsite(String attractionWebsite) {
        this.attractionWebsite = attractionWebsite;
    }

    public List<String> getOpeningHours() {
        return openingHours;
    }

    public void setOpeningHours(List<String> openingHours) {
        this.openingHours = openingHours;
    }

    public int getPriceLevel() {
        return priceLevel;
    }

    public void setPriceLevel(int priceLevel) {
        this.priceLevel = priceLevel;
    }

    public List<String> getTypes() {
        return types;
    }

    public void setTypes(List<String> types) {
        this.types = types;
    }

    public String getInternationalPhoneNumber() {
        return internationalPhoneNumber;
    }

    public void setInternationalPhoneNumber(String internationalPhoneNumber) {
        this.internationalPhoneNumber = internationalPhoneNumber;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getFormattedHours() {
        return formattedHours;
    }

    public void setFormattedHours(String formattedHours) {
        this.formattedHours = formattedHours;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public String getPopularTimes() {
        return popularTimes;
    }

    public void setPopularTimes(String popularTimes) {
        this.popularTimes = popularTimes;
    }

    public double getCurrentPopularity() {
        return currentPopularity;
    }

    public void setCurrentPopularity(double currentPopularity) {
        this.currentPopularity = currentPopularity;
    }

    public String getTimeSpent() {
        return timeSpent;
    }

    public void setTimeSpent(String timeSpent) {
        this.timeSpent = timeSpent;
    }
}
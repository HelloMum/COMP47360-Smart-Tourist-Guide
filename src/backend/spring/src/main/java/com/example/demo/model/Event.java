package com.example.demo.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "events")
public class Event {
    @Id
    private UUID id;

    @Column(name = "name", length = 512)
    private String name;

    private Double latitude;

    private Double longitude;

    private String category;

    private String combined_category;

    @Column(name = "description", length = 2000)
    private String description;

    @Column(name = "event_site_url", length = 1000)
    private String event_site_url;

    @Column(name = "image_url", length = 1000)
    private String image_url;

    private Boolean is_free;

    private String time_start;

    private String time_end;

    private Integer attending_count;

    private Integer interested_count;

    private Boolean is_canceled;

    private Boolean is_official;

    private LocalDateTime fetchTime;

    private String address;

    private String city;

    private String state;

    private String zip_code;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCombined_category() { return combined_category; }

    public void setCombined_category(String combined_category) { this.combined_category = combined_category; }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEvent_site_url() {
        return event_site_url;
    }

    public void setEvent_site_url(String event_site_url) {
        this.event_site_url = event_site_url;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public Boolean getIs_free() {
        return is_free;
    }

    public void setIs_free(Boolean is_free) {
        this.is_free = is_free;
    }

    public String getTime_start() {
        return time_start;
    }

    public void setTime_start(String time_start) {
        this.time_start = time_start;
    }

    public String getTime_end() {
        return time_end;
    }

    public void setTime_end(String time_end) {
        this.time_end = time_end;
    }

    public Integer getInterested_count() {
        return interested_count;
    }

    public void setInterested_count(Integer interested_count) {
        this.interested_count = interested_count;
    }

    public Integer getAttending_count() {
        return attending_count;
    }

    public void setAttending_count(Integer attending_count) {
        this.attending_count = attending_count;
    }

    public Boolean getIs_canceled() {
        return is_canceled;
    }

    public void setIs_canceled(Boolean is_canceled) {
        this.is_canceled = is_canceled;
    }

    public LocalDateTime getFetchTime() {
        return fetchTime;
    }

    public void setFetchTime(LocalDateTime fetchTime) {
        this.fetchTime = fetchTime;
    }

    public Boolean getIs_official() {
        return is_official;
    }

    public void setIs_official(Boolean is_official) {
        this.is_official = is_official;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZip_code() {
        return zip_code;
    }

    public void setZip_code(String zip_code) {
        this.zip_code = zip_code;
    }
}

package com.example.demo.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventData {

    @Version
    private Long version;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @JsonIgnore
    private UUID id;

    @Column(name = "name", length = 512)
    private String name;

    @Embedded
    private Location location;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "category")
    private String category;

    @Column(name = "description", length = 2000)
    private String description;

    @Column(name = "event_site_url", length = 1000)
    private String event_site_url;

    @Column(name = "image_url", length = 1000)
    private String image_url;

    @Column(name = "is_free")
    private Boolean is_free;

    @Column(name = "time_start")
    private String time_start;

    @Column(name = "time_end")
    private String time_end;

    @Column(name = "attending_count")
    private Integer attending_count;

    @Column(name = "interested_count")
    private Integer interested_count;

    @Column(name = "is_canceled")
    private Boolean is_canceled;

    @Column(name = "is_official")
    private Boolean is_official;

    @Column(name = "fetch_time")
    private LocalDateTime fetchTime;

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Location {
        @JsonProperty("address1")
        @Column(name = "address")
        private String address;

        @JsonProperty("city")
        @Column(name = "city")
        private String city;

        @JsonProperty("state")
        @Column(name = "state")
        private String state;

        @JsonProperty("zip_code")
        @Column(name = "zip_code")
        private String zipCode;
    }
}

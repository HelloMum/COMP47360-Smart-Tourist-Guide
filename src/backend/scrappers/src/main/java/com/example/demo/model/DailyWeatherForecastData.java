package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "daily_forecast_data")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DailyWeatherForecastData {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonIgnore
    private UUID id;

    @Column(name = "fetch_time")
    private LocalDateTime fetchTime;

    @Column(name = "dt")
    private long dt;

    @Column(name = "sunrise")
    private long sunrise;

    @Column(name = "sunset")
    private long sunset;

    @Column(name = "pressure")
    private double pressure;

    @Column(name = "humidity")
    private double humidity;

    @Column(name = "clouds")
    private double clouds;

    @Column(name = "rain")
    private double rain;

    @Column(name = "snow")
    private double snow;

    @JsonProperty("speed")
    @Column(name = "speed")
    private double windSpeed;

    @JsonProperty("deg")
    @Column(name = "deg")
    private double windDeg;

    @Embedded
    private Temp temp;

    @Embedded
    private Feels_like feels_like;

    @Embedded
    private Weather weather;

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Temp {
        @JsonProperty("day")
        @Column(name = "temp_day")
        private double day;

        @JsonProperty("min")
        @Column(name = "temp_min")
        private double min;

        @JsonProperty("max")
        @Column(name = "temp_max")
        private double max;

        @JsonProperty("night")
        @Column(name = "temp_night")
        private double night;

        @JsonProperty("eve")
        @Column(name = "temp_eve")
        private double eve;

        @JsonProperty("morn")
        @Column(name = "temp_morn")
        private double morn;
    }

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Feels_like {
        @JsonProperty("day")
        @Column(name = "feel_day")
        private double day;

        @JsonProperty("night")
        @Column(name = "feel_night")
        private double night;

        @JsonProperty("eve")
        @Column(name = "feel_eve")
        private double eve;

        @JsonProperty("morn")
        @Column(name = "feel_morn")
        private double morn;
    }

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Weather {
        @JsonProperty("id")
        @Column(name = "weather_id")
        private int id;

        @JsonProperty("main")
        @Column(name = "weather_main")
        private String main;

        @JsonProperty("description")
        @Column(name = "weather_description")
        private String description;

        @JsonProperty("icon")
        @Column(name = "weather_icon")
        private String icon;
    }
}
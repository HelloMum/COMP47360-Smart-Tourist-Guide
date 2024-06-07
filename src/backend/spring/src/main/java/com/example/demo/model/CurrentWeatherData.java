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
@Table(name = "weather_data")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CurrentWeatherData {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @JsonIgnore
    private UUID id;

    @Embedded
    private Weather weather;

    @Embedded
    private Main main;

    @Column(name = "visibility")
    private int visibility;

    @Embedded
    private Wind wind;

    @Embedded
    private Clouds clouds;

    @Embedded
    private Rain rain;

    @Embedded
    private Snow snow;

    @Column(name = "dt")
    private long dt;

    @Embedded
    private Sys sys;

    @Column(name = "timezone")
    private int timezone;

    @Column(name = "cod")
    private int cod;

    @Column(name = "fetch_time")
    private LocalDateTime fetchTime;

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Weather {
        @Column(name = "weather_id")
        private int id;

        @Column(name = "weather_main")
        private String main;

        @Column(name = "weather_description")
        private String description;

        @Column(name = "weather_icon")
        private String icon;
    }

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Main {
        @Column(name = "temperature")
        private double temp;

        @Column(name = "feels_like")
        private double feels_like;

        @Column(name = "temp_min")
        private double temp_min;

        @Column(name = "temp_max")
        private double temp_max;

        @Column(name = "pressure")
        private double pressure;

        @Column(name = "humidity")
        private double humidity;
    }

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Wind {
        @Column(name = "wind_speed")
        private double speed;

        @Column(name = "wind_deg")
        private double deg;

        @Column(name = "wind_gust")
        private double gust;
    }

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Clouds {
        @Column(name = "all_clouds")
        private int all;
    }

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Rain {
        @JsonProperty("1h")
        @Column(name = "rain_1h")
        private double rain_1h;

        @JsonProperty("3h")
        @Column(name = "rain_3h")
        private double rain_3h;
    }

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Snow {
        @JsonProperty("1h")
        @Column(name = "snow_1h")
        private double snow_1h;

        @JsonProperty("3h")
        @Column(name = "snow_3h")
        private double snow_3h;
    }

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Sys {
        @Column(name = "sunrise")
        private long sunrise;

        @Column(name = "sunset")
        private long sunset;

    }
}

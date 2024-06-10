package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "hourly_weather_data_4_day")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HourlyWeatherForecastData {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @JsonIgnore
    private UUID id;

    @Column(name = "fetch_time")
    private LocalDateTime fetchTime;

    @Column(name = "cod")
    private int cod;

    @Column(name = "message")
    private int message;

    @Column(name = "cnt")
    private int cnt;

    @Embedded
    private City city;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "hourlyWeatherForecastData")
    private List<HourlyForecastData> list;

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class City {
        @Column(name = "timezone")
        private int timezone;

        @Column(name = "sunrise")
        private long sunrise;

        @Column(name = "sunset")
        private long sunset;
    }

    @Entity
    @Table(name = "hourly_forecast_data")
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class HourlyForecastData {
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
        @JsonIgnore
        private UUID id;

        @Column(name = "dt")
        private long dt;

        @Column(name = "visibility")
        private int visibility;

        @Column(name = "pop")
        private double pop;

        @Column(name = "dt_txt")
        private String dt_txt;

        @Embedded
        private Main main;

        @Embedded
        private Clouds clouds;

        @Embedded
        private Wind wind;

        @Embedded
        private Rain rain;

        @Embedded
        private Snow snow;

        @Embedded
        private Sys sys;

        @Embedded
        private Weather weather;

        @ManyToOne
        @JoinColumn
        @ToString.Exclude
        private HourlyWeatherForecastData hourlyWeatherForecastData;
    }

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Main {
        @JsonProperty("temp")
        @Column(name = "temp")
        private double temp;

        @JsonProperty("feels_like")
        @Column(name = "feels_like")
        private double feels_like;

        @JsonProperty("temp_min")
        @Column(name = "temp_min")
        private double temp_min;

        @JsonProperty("temp_max")
        @Column(name = "temp_max")
        private double temp_max;

        @JsonProperty("pressure")
        @Column(name = "pressure")
        private double pressure;

        @JsonProperty("sea_level")
        @Column(name = "sea_level")
        private double sea_level;

        @JsonProperty("grnd_level")
        @Column(name = "grnd_level")
        private double grnd_level;

        @JsonProperty("humidity")
        @Column(name = "humidity")
        private double humidity;

        @JsonProperty("temp_kf")
        @Column(name = "temp_kf")
        private double temp_kf;
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

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Clouds {
        @JsonProperty("all")
        @Column(name = "clouds_all")
        private int all;
    }

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Wind {
        @JsonProperty("speed")
        @Column(name = "wind_speed")
        private double speed;

        @JsonProperty("deg")
        @Column(name = "wind_deg")
        private double deg;

        @JsonProperty("gust")
        @Column(name = "wind_gust")
        private double gust;
    }

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Rain {
        @JsonProperty("1h")
        @Column(name = "rain_1h")
        private double rain_1h;
    }

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Snow {
        @JsonProperty("1h")
        @Column(name = "snow_1h")
        private double snow_1h;
    }

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Sys {
        @JsonProperty("pod")
        @Column(name = "sys_pod")
        private String pod;
    }

}

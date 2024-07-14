package com.example.demo.model;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.UUID;

@Entity
@Table(name = "daily_forecast_data")
public class DailyForecastData {
    @Id
    private UUID id;
    private Timestamp fetch_time;
    private long dt;
    @Column(name = "temp_day")
    private double tempDay;
    private double rain;
    private double snow;
    private double speed;
    private double humidity;
    private double pressure;
    private String weather_description;
    private String weather_icon;
    private String weather_main;
    @Transient
    private LocalDate date;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Timestamp getFetch_time() {
        return fetch_time;
    }

    public void setFetch_time(Timestamp fetch_time) {
        this.fetch_time = fetch_time;
    }

    public long getDt() {
        return dt;
    }

    public void setDt(long dt) {
        this.dt = dt;
    }

    public double getTempDay() {
        return tempDay;
    }

    public void setTempDay(double tempDay) {
        this.tempDay = tempDay;
    }

    public double getSnow() {
        return snow;
    }

    public void setSnow(double snow) {
        this.snow = snow;
    }

    public double getRain() {
        return rain;
    }

    public void setRain(double rain) {
        this.rain = rain;
    }

    public double getSpeed() {
        return speed;
    }

    public void setSpeed(double speed) {
        this.speed = speed;
    }

    public double getHumidity() { return humidity; }

    public void setHumidity(double humidity) { this.humidity = humidity; }

    public double getPressure() { return pressure; }

    public void setPressure(double pressure) { this.pressure = pressure; }

    public String getWeather_description() { return weather_description; }

    public void setWeather_description(String weather_description) { this.weather_description = weather_description; }

    public String getWeather_icon() { return weather_icon; }

    public void setWeather_icon(String weather_icon) { this.weather_icon = weather_icon; }

    public String getWeather_main() { return weather_main; }

    public void setWeather_main(String weather_main) { this.weather_main = weather_main; }

    public LocalDate getDate() { return date; }

    public void setDate(LocalDate date) { this.date = date; }

    // Convert dt to LocalDate and set it
    public void convertDtToDate() {
        this.date = Instant.ofEpochSecond(this.dt)
                .atZone(ZoneId.of("America/New_York"))
                .toLocalDate();
    }
}
package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

import java.sql.Timestamp;
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
}
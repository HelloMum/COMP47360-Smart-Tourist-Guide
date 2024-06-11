package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.UUID;

@Entity
@Table(name = "daily_forecast_data")
public class DailyForecastData {
    @Id
    private UUID id;
    private double clouds;
    private int dt;
    private double rain;
    private String weather_icon;
    private int weather_id;
    private String weather_main;
    private UUID daily_weather_forecast_data_id;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public double getClouds() {
        return clouds;
    }

    public void setClouds(double clouds) {
        this.clouds = clouds;
    }

    public int getDt() {
        return dt;
    }

    public void setDt(int dt) {
        this.dt = dt;
    }

    public double getRain() {
        return rain;
    }

    public void setRain(double rain) {
        this.rain = rain;
    }

    public String getWeather_icon() {
        return weather_icon;
    }

    public void setWeather_icon(String weather_icon) {
        this.weather_icon = weather_icon;
    }

    public int getWeather_id() {
        return weather_id;
    }

    public void setWeather_id(int weather_id) {
        this.weather_id = weather_id;
    }

    public String getWeather_main() {
        return weather_main;
    }

    public void setWeather_main(String weather_main) {
        this.weather_main = weather_main;
    }

    public UUID getDaily_weather_forecast_data_id() {
        return daily_weather_forecast_data_id;
    }

    public void setDaily_weather_forecast_data_id(UUID daily_weather_forecast_data_id) {
        this.daily_weather_forecast_data_id = daily_weather_forecast_data_id;
    }
}

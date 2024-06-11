package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "daily_weather_data_30_day")
public class DailyWeatherData {

    @Id
    private UUID id;
    private int timezone;
    private int cnt;
    private String code;
    private Timestamp fetch_time;
    private double message;

}


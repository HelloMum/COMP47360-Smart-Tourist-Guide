package com.example.demo.repository;

import com.example.demo.model.DailyWeatherForecastData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DailyWeatherForecastRepository extends JpaRepository<DailyWeatherForecastData, UUID> {
}
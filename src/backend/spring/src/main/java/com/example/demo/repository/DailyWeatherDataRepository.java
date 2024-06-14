package com.example.demo.repository;

import com.example.demo.model.DailyForecastData;
import com.example.demo.model.DailyWeatherData;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DailyWeatherDataRepository extends JpaRepository<DailyWeatherData, String> {

    @Query("SELECT d.id FROM DailyWeatherData d ORDER BY d.fetch_time DESC")
    List<UUID> findLatestId(Pageable pageable);

    @Query("SELECT f FROM DailyForecastData f WHERE f.daily_weather_forecast_data_id = :weatherDataId")
    List<DailyForecastData> findForecastByWeatherDataId(@Param("weatherDataId") UUID weatherDataId);

    @Query("SELECT f FROM DailyForecastData f WHERE f.dt = :dt")
    List<DailyForecastData> findForecastByDt(@Param("dt") long dt);
}


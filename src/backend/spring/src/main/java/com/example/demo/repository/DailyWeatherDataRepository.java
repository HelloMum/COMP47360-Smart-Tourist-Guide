package com.example.demo.repository;

import com.example.demo.model.DailyForecastData;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DailyWeatherDataRepository extends JpaRepository<DailyForecastData, UUID> {

    @Query("SELECT f FROM DailyForecastData f WHERE f.dt = :dt")
    List<DailyForecastData> findForecastByDt(@Param("dt") long dt);

    @Query("SELECT f FROM DailyForecastData f ORDER BY f.dt ASC")
    List<DailyForecastData> findLatestForecast(Pageable pageable);

    @Query("SELECT d FROM DailyForecastData d WHERE d.dt BETWEEN ?1 AND ?2 ORDER BY d.dt ASC")
    List<DailyForecastData> findForecastsByDateRange(long startDt, long endDt);
}
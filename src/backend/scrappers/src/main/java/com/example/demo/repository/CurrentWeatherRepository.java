package com.example.demo.repository;

import com.example.demo.model.CurrentWeatherData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

// Responsible for interacting with the database
@Repository
public interface CurrentWeatherRepository extends JpaRepository<CurrentWeatherData, UUID> {
}
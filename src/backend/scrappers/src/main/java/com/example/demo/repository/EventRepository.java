package com.example.demo.repository;

import com.example.demo.model.EventData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EventRepository extends JpaRepository<EventData, UUID> {
    boolean existsByNameAndLatitudeAndLongitude(String name, double latitude, double longitude);
}

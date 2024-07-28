package com.example.demo.repository;

import com.example.demo.model.ItinerarySaved;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItinerarySavedRepository extends JpaRepository<ItinerarySaved, Long> {
    List<ItinerarySaved> findByUserId(Long id);
}
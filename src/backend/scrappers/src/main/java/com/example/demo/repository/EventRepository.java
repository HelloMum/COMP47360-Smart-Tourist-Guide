package com.example.demo.repository;

import com.example.demo.model.EventData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface EventRepository extends JpaRepository<EventData, UUID> {

    @Query("SELECT COUNT(e) > 0 FROM EventData e WHERE " +
            "e.name = :name AND " +
            "e.category = :category AND " +
            "e.description = :description ")
    boolean existsEvent(@Param("name") String name,
                        @Param("category") String category,
                        @Param("description") String description);
}
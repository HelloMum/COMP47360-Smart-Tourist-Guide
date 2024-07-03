package com.example.demo.repository;

import com.example.demo.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EventRepository extends JpaRepository<Event, UUID> {
    List<Event> findAll();

    @Query("SELECT e FROM Event e WHERE " +
            "(:name IS NULL OR CAST(e.name AS string) ILIKE '%' || CAST(:name AS string) || '%') AND " +
            "(:isFree IS NULL OR e.is_free = :isFree) AND " +
            "(:combined_categories IS NULL OR e.combined_category IN :combined_categories) AND " +
            "((e.time_start >= :startDate AND e.time_start <= :endDate) OR " +
            "(e.time_start < :startDate AND e.time_end >= :startDate) OR " +
            "(e.time_start <= :endDate AND e.time_end > :endDate)) " +
            "ORDER BY e.time_start ASC")
    List<Event> findFilteredEventsWithinDateRange(@Param("startDate") String startDate,
                                                  @Param("endDate") String endDate,
                                                  @Param("isFree") Boolean isFree,
                                                  @Param("combined_categories") List<String> combined_categories,
                                                  @Param("name") String name);

    @Query("SELECT e FROM Event e WHERE " +
            "(:name IS NULL OR CAST(e.name AS string) ILIKE '%' || CAST(:name AS string) || '%') AND " +
            "(:isFree IS NULL OR e.is_free = :isFree) AND " +
            "(:combined_categories IS NULL OR e.combined_category IN :combined_categories) " +
            "ORDER BY e.time_start ASC")
    List<Event> findFilteredEventsWithoutDateRange(@Param("isFree") Boolean isFree,
                                                   @Param("combined_categories") List<String> combined_categories,
                                                   @Param("name") String name);

    Optional<Event> findById(UUID id);
}
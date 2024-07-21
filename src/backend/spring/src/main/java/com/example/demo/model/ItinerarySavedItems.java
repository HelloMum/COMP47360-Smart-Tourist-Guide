package com.example.demo.model;

import lombok.*;
import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Represents an item within a saved itinerary.
 * This class is part of the model layer and maps to the "itinerary_saved_items" table in the database.
 */
@Entity
@Table(name = "itinerary_saved_items") // Ensure the table name matches the database table name.
@Data // Lombok annotation to generate getters, setters, toString, equals, and hashCode methods.
@NoArgsConstructor // Lombok annotation to generate a no-argument constructor.
@AllArgsConstructor // Lombok annotation to generate an all-argument constructor.
@Getter
@Setter
public class ItinerarySavedItems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unique identifier for each itinerary saved item.

    @ManyToOne
    @JoinColumn(name = "itinerary_id", nullable = false)
    private ItinerarySaved itinerary; // The itinerary this item belongs to.

    @Column(nullable = false)
    private int itemId; // The ID of the event or attraction this item represents.

    @Column(nullable = false)
    private boolean isEvent; // Flag to indicate if this item is an event.

    @Column(nullable = false)
    private LocalDateTime startTime; // Start time of the event or attraction.

    @Column(nullable = false)
    private LocalDateTime endTime; // End time of the event or attraction.

    /**
     * Sets the event status of this itinerary item.
     *
     * @param isEventPassed The event status to set.
     */
    public void setIsEvent(boolean isEventPassed) {
        isEvent = isEventPassed;
    }

    /**
     * Gets the event status of this itinerary item.
     * @return The event status.
     */
    public boolean getIsEvent() {
        return isEvent;
    }
}
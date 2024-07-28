package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * Represents a User entity in the application.
 * This class is annotated with JPA (Java Persistence API) annotations to define the mapping between the User class and the database.
 * Lombok's annotations are used to reduce boilerplate code for model/data objects.
 */
@Entity
@Table(name = "users") // Ensure the table name matches the database table name.
@Data // Lombok annotation to generate getters, setters, toString, equals, and hashCode methods.
@NoArgsConstructor // Lombok annotation to generate a no-argument constructor.
@AllArgsConstructor // Lombok annotation to generate an all-argument constructor.
@Getter // Lombok annotation to generate getters for all fields.
@Setter // Lombok annotation to generate setters for all fields.
public class User {

    @Id // Marks this field as the primary key.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Configures the way of increment of the specified column(field).
    private Long id;

    @Column(unique = true, nullable = false) // Marks this field as a column in the table with unique and not null constraints.
    private String email;

    @Column(nullable = false) // Marks this field as a column in the table with a not null constraint.
    private String password;

    @Column(nullable = false) // Marks this field as a column in the table with a not null constraint.
    private String salt;

    @Column(name = "created_at", nullable = false, updatable = false) // Marks this field as a column in the table with a specific name, not null, and not updatable after creation.
    private LocalDateTime createdAt = LocalDateTime.now(); // Initializes the createdAt field with the current date and time.
}
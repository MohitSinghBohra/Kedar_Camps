package com.kedar.camps.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String code;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String phone;

    private String email;

    @Column(name = "camp_id", nullable = false)
    private String campId;

    @Column(name = "check_in", nullable = false)
    private LocalDate checkIn;

    @Column(name = "check_out", nullable = false)
    private LocalDate checkOut;

    @Column(nullable = false)
    private Integer persons;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Builder.Default
    private String status = "confirmed"; // confirmed | cancelled

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // Automatically set createdAt before saving to DB
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}
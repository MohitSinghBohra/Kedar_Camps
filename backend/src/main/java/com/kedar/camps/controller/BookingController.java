package com.kedar.camps.controller;

import com.kedar.camps.dto.*;
import com.kedar.camps.entity.Booking;
import com.kedar.camps.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService service;
    private static final String ADMIN_KEY = "Raghav@123";

    // ── Public: Get availability for a date range ──────────────────────────
    @GetMapping("/availability")
    public ResponseEntity<List<AvailabilityDto>> getAvailability(
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkIn,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOut
    ) {
        return ResponseEntity.ok(service.getAvailability(checkIn, checkOut));
    }

    // ── Public: Create a booking ────────────────────────────────────────────
    @PostMapping("/bookings")
    public ResponseEntity<?> createBooking(@Valid @RequestBody BookingRequest req) {
        try {
            Booking booking = service.createBooking(req);
            return ResponseEntity.status(HttpStatus.CREATED).body(booking);
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ── Public: Verify a booking by code ────────────────────────────────────
    @GetMapping("/bookings/verify/{code}")
    public ResponseEntity<?> verifyBooking(@PathVariable String code) {
        try {
            return ResponseEntity.ok(service.getByCode(code));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", "Booking not found"));
        }
    }

    // ── Admin: Get all bookings ─────────────────────────────────────────────
    @GetMapping("/admin/bookings")
    public ResponseEntity<?> getAllBookings(
        @RequestHeader(value = "X-Admin-Key", required = false) String adminKey
    ) {
        if (!ADMIN_KEY.equals(adminKey)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Unauthorized"));
        }
        return ResponseEntity.ok(service.getAllBookings());
    }

    // ── Admin: Update a booking ─────────────────────────────────────────────
    @PutMapping("/admin/bookings/{id}")
    public ResponseEntity<?> updateBooking(
        @PathVariable Long id,
        @RequestBody BookingUpdateRequest req,
        @RequestHeader(value = "X-Admin-Key", required = false) String adminKey
    ) {
        if (!ADMIN_KEY.equals(adminKey)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Unauthorized"));
        }
        try {
            return ResponseEntity.ok(service.updateBooking(id, req));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", e.getMessage()));
        }
    }

    // ── Health check ────────────────────────────────────────────────────────
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "UP", "service", "Kedar Camps API"));
    }
}

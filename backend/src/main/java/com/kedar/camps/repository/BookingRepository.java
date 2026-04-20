package com.kedar.camps.repository;

import com.kedar.camps.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    Optional<Booking> findByCode(String code);

    List<Booking> findAllByOrderByCreatedAtDesc();

    // Count bookings that overlap with the given date range for a specific camp type
    @Query("""
        SELECT COUNT(b) FROM Booking b
        WHERE b.campId = :campId
          AND b.status != 'cancelled'
          AND b.checkIn < :checkOut
          AND b.checkOut > :checkIn
    """)
    long countOverlapping(
        @Param("campId") String campId,
        @Param("checkIn") LocalDate checkIn,
        @Param("checkOut") LocalDate checkOut
    );
}

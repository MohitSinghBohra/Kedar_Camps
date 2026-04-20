package com.kedar.camps.service;

import com.kedar.camps.dto.*;
import com.kedar.camps.entity.Booking;
import com.kedar.camps.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository repo;

    // Camp configuration
    private static final Map<String, int[]> CAMP_CONFIG = new LinkedHashMap<>();
    private static final Map<String, String> CAMP_NAMES = new LinkedHashMap<>();
    private static final Map<String, Integer> CAMP_PRICE = new LinkedHashMap<>();

    static {
        CAMP_CONFIG.put("c2",  new int[]{2,  4});
        CAMP_CONFIG.put("c3",  new int[]{3,  4});
        CAMP_CONFIG.put("c5",  new int[]{5,  6});
        CAMP_CONFIG.put("c6",  new int[]{6,  4});
        CAMP_CONFIG.put("c10", new int[]{10, 2});
        CAMP_CONFIG.put("c20", new int[]{20, 2});

        CAMP_NAMES.put("c2",  "Duo Tent");
        CAMP_NAMES.put("c3",  "Trio Tent");
        CAMP_NAMES.put("c5",  "Explorer Camp");
        CAMP_NAMES.put("c6",  "Family Camp");
        CAMP_NAMES.put("c10", "Group Camp");
        CAMP_NAMES.put("c20", "Mega Camp");

        CAMP_PRICE.put("c2",  1800);
        CAMP_PRICE.put("c3",  2400);
        CAMP_PRICE.put("c5",  3500);
        CAMP_PRICE.put("c6",  4200);
        CAMP_PRICE.put("c10", 7000);
        CAMP_PRICE.put("c20", 12000);
    }

    public List<AvailabilityDto> getAvailability(LocalDate checkIn, LocalDate checkOut) {
        List<AvailabilityDto> list = new ArrayList<>();

        for (Map.Entry<String, int[]> entry : CAMP_CONFIG.entrySet()) {
            String campId = entry.getKey();
            int[] cfg = entry.getValue();

            long booked = repo.countOverlapping(campId, checkIn, checkOut);

            list.add(AvailabilityDto.builder()
                    .campId(campId)
                    .campName(CAMP_NAMES.get(campId))
                    .capacity(cfg[0])
                    .totalUnits(cfg[1])
                    .bookedUnits(booked)
                    .availableUnits(Math.max(0, cfg[1] - booked))
                    .pricePerNight(CAMP_PRICE.get(campId))
                    .build());
        }

        return list;
    }

    public Booking createBooking(BookingRequest req) {

        // Validate dates
        if (!req.getCheckOut().isAfter(req.getCheckIn())) {
            throw new IllegalArgumentException("Check-out must be after check-in");
        }

        // Validate camp type
        int[] cfg = CAMP_CONFIG.get(req.getCampId());
        if (cfg == null) {
            throw new IllegalArgumentException("Invalid camp type: " + req.getCampId());
        }

        // Check availability
        long booked = repo.countOverlapping(req.getCampId(), req.getCheckIn(), req.getCheckOut());

        if (booked >= cfg[1]) {
            throw new IllegalStateException("Camp is fully booked for selected dates");
        }

        // Validate capacity
        if (req.getPersons() > cfg[0]) {
            throw new IllegalArgumentException(
                    "Max capacity for this camp is " + cfg[0] + " persons"
            );
        }

        Booking booking = Booking.builder()
                .code(generateCode(req.getCheckIn()))
                .name(req.getName())
                .phone(req.getPhone())
                .email(req.getEmail())
                .campId(req.getCampId())
                .checkIn(req.getCheckIn())
                .checkOut(req.getCheckOut())
                .persons(req.getPersons())
                .notes(req.getNotes())
                .status("confirmed")
                .build();

        return repo.save(booking);
    }

    public List<Booking> getAllBookings() {
        return repo.findAllByOrderByCreatedAtDesc();
    }

    public Booking getByCode(String code) {
        return repo.findByCode(code)
                .orElseThrow(() -> new NoSuchElementException("Booking not found: " + code));
    }

    public Booking updateBooking(Long id, BookingUpdateRequest req) {

        Booking b = repo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Booking not found: " + id));

        if (req.getName() != null) b.setName(req.getName());
        if (req.getPhone() != null) b.setPhone(req.getPhone());
        if (req.getEmail() != null) b.setEmail(req.getEmail());
        if (req.getCheckIn() != null) b.setCheckIn(req.getCheckIn());
        if (req.getCheckOut() != null) b.setCheckOut(req.getCheckOut());
        if (req.getPersons() != null) b.setPersons(req.getPersons());
        if (req.getNotes() != null) b.setNotes(req.getNotes());
        if (req.getStatus() != null) b.setStatus(req.getStatus());

        return repo.save(b);
    }

    private String generateCode(LocalDate checkIn) {
        String date = checkIn.toString().replace("-", "");
        String rand = UUID.randomUUID()
                .toString()
                .replace("-", "")
                .substring(0, 4)
                .toUpperCase();

        return "KC-" + date + "-" + rand;
    }
}
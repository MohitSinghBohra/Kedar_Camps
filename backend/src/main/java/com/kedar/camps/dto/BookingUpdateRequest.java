package com.kedar.camps.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class BookingUpdateRequest {
    private String name;
    private String phone;
    private String email;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private Integer persons;
    private String notes;
    private String status; // confirmed | cancelled
}

package com.kedar.camps.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AvailabilityDto {
    private String campId;
    private String campName;
    private int capacity;
    private int totalUnits;
    private long bookedUnits;
    private long availableUnits;
    private int pricePerNight;
}

package me.vmachohan.time_ledger.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public record ShiftRequest(
        String jobId,
        LocalDate date,
        LocalTime startTime,
        LocalTime endTime,
        Double hours,
        String type,    // "day" | "night" | "custom"
        String notes
) {}

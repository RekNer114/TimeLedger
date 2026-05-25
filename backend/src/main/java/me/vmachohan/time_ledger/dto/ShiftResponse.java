package me.vmachohan.time_ledger.dto;

import me.vmachohan.time_ledger.entity.shift.Shift;

import java.time.LocalDate;
import java.time.LocalTime;

public record ShiftResponse(
        String id,
        String jobId,
        LocalDate date,
        LocalTime startTime,
        LocalTime endTime,
        Double hours,
        String type,
        String notes
) {
    public static ShiftResponse from(Shift shift) {
        return new ShiftResponse(
                shift.getId(),
                shift.getJob().getId(),
                shift.getDate(),
                shift.getStartTime(),
                shift.getEndTime(),
                shift.getNumberOfHours(),
                shift.getShiftType() != null ? shift.getShiftType().name().toLowerCase() : null,
                shift.getNote()
        );
    }
}

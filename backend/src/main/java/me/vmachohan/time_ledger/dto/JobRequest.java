package me.vmachohan.time_ledger.dto;

public record JobRequest(
        String name,
        String type,         // "hourly" | "monthly"
        Double hourlyRate,
        Double monthlySalary,
        Double taxRate,
        String color
) {}

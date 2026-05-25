package me.vmachohan.time_ledger.dto;

import me.vmachohan.time_ledger.entity.job.Job;

public record JobResponse(
        String id,
        String name,
        String type,
        Double hourlyRate,
        Double monthlySalary,
        Double taxRate,
        String color
) {
    public static JobResponse from(Job job) {
        return new JobResponse(
                job.getId(),
                job.getName(),
                job.getJobType() != null ? job.getJobType().name().toLowerCase() : null,
                job.getHourlyRate(),
                job.getMonthlySalary(),
                job.getTaxRate(),
                job.getColor()
        );
    }
}

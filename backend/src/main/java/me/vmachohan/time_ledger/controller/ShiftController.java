package me.vmachohan.time_ledger.controller;

import lombok.RequiredArgsConstructor;
import me.vmachohan.time_ledger.dto.ShiftRequest;
import me.vmachohan.time_ledger.dto.ShiftResponse;
import me.vmachohan.time_ledger.entity.job.Job;
import me.vmachohan.time_ledger.entity.user.User;
import me.vmachohan.time_ledger.repository.JobRepository;
import me.vmachohan.time_ledger.service.ShiftService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/shifts")
@RequiredArgsConstructor
public class ShiftController {

    private final ShiftService shiftService;
    private final JobRepository jobRepository;

    @GetMapping
    public List<ShiftResponse> getShifts(
            @RequestParam(required = false) String month,
            @RequestParam(required = false) String jobId
    ) {
        return shiftService.getAll(getCurrentUser().getId(), month, jobId);
    }

    @PostMapping
    public ShiftResponse addShift(@RequestBody ShiftRequest req) {
        Job job = jobRepository.findById(req.jobId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job not found"));
        return shiftService.create(req, job, getCurrentUser());
    }

    @PutMapping("/{id}")
    public ShiftResponse updateShift(@PathVariable String id, @RequestBody ShiftRequest req) {
        Job job = jobRepository.findById(req.jobId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job not found"));
        return shiftService.update(id, req, job, getCurrentUser());
    }

    @DeleteMapping("/{id}")
    public void deleteShift(@PathVariable String id) {
        shiftService.delete(id, getCurrentUser().getId());
    }

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null && auth.getPrincipal() instanceof User user) {
            return user;
        }

        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
    }
}

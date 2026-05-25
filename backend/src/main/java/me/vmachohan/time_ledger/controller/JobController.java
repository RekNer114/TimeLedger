package me.vmachohan.time_ledger.controller;

import lombok.RequiredArgsConstructor;
import me.vmachohan.time_ledger.dto.JobRequest;
import me.vmachohan.time_ledger.dto.JobResponse;
import me.vmachohan.time_ledger.entity.user.User;
import me.vmachohan.time_ledger.service.JobService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {
    private final JobService jobService;

    @PostMapping
    public JobResponse addJob(@RequestBody JobRequest req) {
        return jobService.createJob(req, getCurrentUser());
    }

    @PutMapping("/{id}")
    public JobResponse updateJob(@PathVariable String id, @RequestBody JobRequest req) {
        return jobService.update(id, req, getCurrentUser());
    }

    @GetMapping
    public List<JobResponse> getJobs() {
        return jobService.getAll(getCurrentUser().getId());
    }

    @DeleteMapping("/{id}")
    public void deleteJob(@PathVariable String id) {
        jobService.delete(id, getCurrentUser().getId());
    }

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null && auth.getPrincipal() instanceof User user) {
            return user;
        }

        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
    }
}

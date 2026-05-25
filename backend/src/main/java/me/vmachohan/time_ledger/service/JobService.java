package me.vmachohan.time_ledger.service;

import lombok.RequiredArgsConstructor;
import me.vmachohan.time_ledger.dto.JobRequest;
import me.vmachohan.time_ledger.dto.JobResponse;
import me.vmachohan.time_ledger.entity.job.Job;
import me.vmachohan.time_ledger.entity.job.JobByPaymentType;
import me.vmachohan.time_ledger.entity.user.User;
import me.vmachohan.time_ledger.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;

    public List<JobResponse> getAll(String userId) {
        return jobRepository.findAllByUser_Id(userId)
                .stream().map(JobResponse::from).toList();
    }

    public JobResponse createJob(JobRequest req, User user) {
        Job job = Job.builder()
                .name(req.name())
                .jobType(parseJobType(req.type()))
                .hourlyRate(req.hourlyRate())
                .monthlySalary(req.monthlySalary())
                .taxRate(req.taxRate())
                .color(req.color())
                .user(user)
                .build();
        return JobResponse.from(jobRepository.save(job));
    }

    public JobResponse update(String id, JobRequest req, User user) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Job not found"));

        if (!job.getUser().getId().equals(user.getId())) {
            throw new SecurityException("Not your job");
        }

        job.setName(req.name());
        job.setJobType(parseJobType(req.type()));
        job.setHourlyRate(req.hourlyRate());
        job.setMonthlySalary(req.monthlySalary());
        job.setTaxRate(req.taxRate());
        job.setColor(req.color());

        return JobResponse.from(jobRepository.save(job));
    }

    public void delete(String id, String userId) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Job not found"));

        if (!job.getUser().getId().equals(userId)) {
            throw new SecurityException("Not your job");
        }

        jobRepository.delete(job);
    }

    private JobByPaymentType parseJobType(String type) {
        if (type == null) return null;
        return JobByPaymentType.valueOf(type.toUpperCase());
    }
}

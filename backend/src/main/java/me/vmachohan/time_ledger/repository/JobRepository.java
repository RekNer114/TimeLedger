package me.vmachohan.time_ledger.repository;

import me.vmachohan.time_ledger.entity.job.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, String> {
    List<Job> findAllByUser_Id(String userId);
}

package me.vmachohan.time_ledger.repository;

import me.vmachohan.time_ledger.entity.shift.Shift;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ShiftRepository extends JpaRepository<Shift, String> {
    List<Shift> findAllByUserIdAndDateBetween(String userId, LocalDate start, LocalDate end);
    List<Shift> findAllByUserId(String userId);
}

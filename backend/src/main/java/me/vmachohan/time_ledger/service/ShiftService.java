package me.vmachohan.time_ledger.service;

import lombok.RequiredArgsConstructor;
import me.vmachohan.time_ledger.dto.ShiftRequest;
import me.vmachohan.time_ledger.dto.ShiftResponse;
import me.vmachohan.time_ledger.entity.job.Job;
import me.vmachohan.time_ledger.entity.shift.Shift;
import me.vmachohan.time_ledger.entity.shift.ShiftType;
import me.vmachohan.time_ledger.entity.user.User;
import me.vmachohan.time_ledger.repository.ShiftRepository;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ShiftService {
    private final ShiftRepository shiftRepository;

    public List<ShiftResponse> getAll(String userId, String month, String jobId) {
        List<Shift> shifts;

        if (month != null && !month.isBlank()) {
            YearMonth ym = YearMonth.parse(month);
            shifts = shiftRepository.findAllByUserIdAndDateBetween(
                    userId, ym.atDay(1), ym.atEndOfMonth()
            );
        } else {
            shifts = shiftRepository.findAllByUserId(userId);
        }

        if (jobId != null && !jobId.isBlank()) {
            shifts = shifts.stream()
                    .filter(s -> s.getJob().getId().equals(jobId))
                    .toList();
        }

        return shifts.stream().map(ShiftResponse::from).toList();
    }

    public ShiftResponse create(ShiftRequest req, Job job, User user) {
        Shift shift = Shift.builder()
                .job(job)
                .user(user)
                .date(req.date())
                .startTime(req.startTime())
                .endTime(req.endTime())
                .numberOfHours(req.hours())
                .shiftType(parseShiftType(req.type()))
                .note(req.notes())
                .build();
        return ShiftResponse.from(shiftRepository.save(shift));
    }

    public ShiftResponse update(String id, ShiftRequest req, Job job, User user) {
        Shift shift = shiftRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Shift not found"));

        if (!shift.getUser().getId().equals(user.getId())) {
            throw new SecurityException("Not your shift");
        }

        shift.setJob(job);
        shift.setDate(req.date());
        shift.setStartTime(req.startTime());
        shift.setEndTime(req.endTime());
        shift.setNumberOfHours(req.hours());
        shift.setShiftType(parseShiftType(req.type()));
        shift.setNote(req.notes());

        return ShiftResponse.from(shiftRepository.save(shift));
    }

    public void delete(String id, String userId) {
        Shift shift = shiftRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Shift not found"));

        if (!shift.getUser().getId().equals(userId)) {
            throw new SecurityException("Not your shift");
        }

        shiftRepository.delete(shift);
    }

    private ShiftType parseShiftType(String type) {
        if (type == null) return null;
        return ShiftType.valueOf(type.toUpperCase());
    }
}

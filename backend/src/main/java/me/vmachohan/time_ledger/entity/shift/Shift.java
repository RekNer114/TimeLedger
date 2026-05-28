package me.vmachohan.time_ledger.entity.shift;

import jakarta.persistence.*;
import lombok.*;
import me.vmachohan.time_ledger.entity.job.Job;
import me.vmachohan.time_ledger.entity.user.User;

import java.time.LocalDate;
import java.time.LocalTime;

/*
* export type Shift = {
  id: string;
  jobId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  hours: number;
  type: ShiftType;
  notes?: string;
};*/
@Entity
@Table(name = "shifts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Shift {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @Column
    private LocalDate date;
    @Column
    private LocalTime endTime;
    @Column
    private LocalTime startTime;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column
    private Double numberOfHours;

    @Enumerated(EnumType.STRING)
    @Column
    private ShiftType shiftType;
    @Column
    private String note;


}

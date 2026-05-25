package me.vmachohan.time_ledger.entity.job;

import jakarta.persistence.*;
import lombok.*;
import me.vmachohan.time_ledger.entity.user.User;

@Entity
@Table( name = "jobs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private Double taxRate;
    @Enumerated(EnumType.STRING)
    private JobByPaymentType jobType;
    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User user;

    @Column
    private Double hourlyRate;
    @Column
    private Double monthlySalary;
    @Column
    private String color;
}

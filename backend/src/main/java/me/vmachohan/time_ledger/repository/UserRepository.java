package me.vmachohan.time_ledger.repository;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import me.vmachohan.time_ledger.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByEmail(@Email @NotBlank String email);

    Optional<User> findByEmail(@NotBlank @Email String email);
}

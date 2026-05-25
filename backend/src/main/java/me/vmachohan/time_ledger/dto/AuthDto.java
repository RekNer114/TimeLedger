package me.vmachohan.time_ledger.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthDto{

    public record LoginRequest(
            @NotBlank @Email String email,
            @NotBlank String password
    ) {}

    public record RegisterRequest(
            @NotBlank @Email String email,
            @NotBlank @Size(min = 6) String password,
            @NotBlank String name
    ) {}

    public record UserDto(
            String id,
            String email,
            String name
    ) {}

    public record AuthResponse(
            String token,
            UserDto user
    ) {}
}
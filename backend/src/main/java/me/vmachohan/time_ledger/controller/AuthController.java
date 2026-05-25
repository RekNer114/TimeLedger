package me.vmachohan.time_ledger.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import me.vmachohan.time_ledger.dto.AuthDto;
import me.vmachohan.time_ledger.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthDto.AuthResponse register(@Valid @RequestBody AuthDto.RegisterRequest req) {
        return authService.register(req);
    }

    @PostMapping("/login")
    public AuthDto.AuthResponse login(@Valid @RequestBody AuthDto.LoginRequest req) {
        return authService.login(req);
    }
}
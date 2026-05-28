package me.vmachohan.time_ledger.service;

import lombok.RequiredArgsConstructor;
import me.vmachohan.time_ledger.dto.AuthDto;
import me.vmachohan.time_ledger.entity.user.User;
import me.vmachohan.time_ledger.repository.UserRepository;
import me.vmachohan.time_ledger.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthDto.AuthResponse register(AuthDto.RegisterRequest req) {
        if (userRepository.existsByEmail(req.email())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already in use");
        }

        User user = User.builder()
                .email(req.email())
                .password(passwordEncoder.encode(req.password()))
                .name(req.name())
                .build();

        userRepository.save(user);
        return buildAuthResponse(user);
    }

    public AuthDto.AuthResponse login(AuthDto.LoginRequest req) {
        User user = userRepository.findByEmail(req.email())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

        if (!passwordEncoder.matches(req.password(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }

        return buildAuthResponse(user);
    }

    private AuthDto.AuthResponse buildAuthResponse(User user) {
        String token = jwtUtil.generateToken(user.getId());
        AuthDto.UserDto userDto = new AuthDto.UserDto(user.getId(), user.getEmail(), user.getName());
        return new AuthDto.AuthResponse(token, userDto);
    }
}
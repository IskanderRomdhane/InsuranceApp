package com.backend.Insurance.Authnetification.Keycloak;

import com.backend.Insurance.Authnetification.DTOs.LoginRequest;
import com.backend.Insurance.Authnetification.DTOs.LoginResponse;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseEntity<Map<String, String>>> login(@RequestBody LoginRequest loginDto) {
        return ResponseEntity.ok(authService.login(loginDto));
    }
}
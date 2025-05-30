package com.backend.Insurance.Authnetification.Keycloak.Controller;

import com.backend.Insurance.Authnetification.DTOs.LoginRequest;
import com.backend.Insurance.Authnetification.DTOs.PasswordUpdateRequest;
import com.backend.Insurance.Authnetification.Keycloak.Service.AuthService;
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
    public ResponseEntity<String> login(@RequestBody LoginRequest loginDto) {
        return authService.login(loginDto);
    }
    @PostMapping("/refresh")
    public ResponseEntity<String> refresh(@RequestBody Map<String , String> refreshToken) {
        return authService.refresh(refreshToken);
    }
    @PostMapping("/update-password")
    public ResponseEntity<String> updatePassword(@RequestBody PasswordUpdateRequest request) {
        return  authService.updatePassword(request);
    }

    @PutMapping("/toggle-status/{username}")
    public ResponseEntity<String> toggleUserStatus(@PathVariable String username, @RequestParam boolean enable) {
        return authService.toggleUserStatus(username, enable);
    }

}
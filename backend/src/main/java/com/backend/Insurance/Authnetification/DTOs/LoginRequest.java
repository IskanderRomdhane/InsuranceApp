package com.backend.Insurance.Authnetification.DTOs;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}

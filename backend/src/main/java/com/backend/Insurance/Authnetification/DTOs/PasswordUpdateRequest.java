package com.backend.Insurance.Authnetification.DTOs;

import lombok.Data;

@Data
public class PasswordUpdateRequest {
    private String username;
    private String newPassword;
}

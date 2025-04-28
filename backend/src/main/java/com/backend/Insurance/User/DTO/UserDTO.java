package com.backend.Insurance.User.DTO;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String CIN;
    private String username;
    private String email;
    private String firstname;
    private String lastname;
    private String adresse;
    private String profilePictureUrl;
}

package com.backend.Insurance.Reclamation.DTOS;

import lombok.Data;

@Data
public class ReclamationDTO {
    private String userEmail;
    private String typeReclamation;
    private String description;
}

package com.backend.Insurance.Sinistre.DTOS;

import lombok.Data;

@Data
public class SinistreDTO {
    private Long userId;
    private String objectSinistre;
    private String descriptionSinistre;
    private String typeSinistre;
    private String etat;
    private String categorie;
}

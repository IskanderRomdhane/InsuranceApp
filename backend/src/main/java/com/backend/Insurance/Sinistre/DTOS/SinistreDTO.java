package com.backend.Insurance.Sinistre.DTOS;

import com.backend.Insurance.Sinistre.Enums.Etat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SinistreDTO {
    private Long Id;
    private String userId;
    private String objectSinistre;
    private String descriptionSinistre;
    private String categorie;
    private Float amount;
    private Etat etat;
    private LocalDateTime date;
}

package com.backend.Insurance.Sinistre.Habilitation.DTOS;

import lombok.Data;

@Data
public class HabilitationDTO {
    private String userId;
    private String objectSinistre;
    private String descriptionSinistre;
    private Float amount;
    private String propertyAddress;
    private String damageType;
}

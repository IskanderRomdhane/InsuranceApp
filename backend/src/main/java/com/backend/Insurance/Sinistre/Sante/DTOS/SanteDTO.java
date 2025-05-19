package com.backend.Insurance.Sinistre.Sante.DTOS;

import lombok.Data;

@Data
public class SanteDTO {
    private String userId;
    private String objectSinistre;
    private String descriptionSinistre;
    private Float amount;
    private String hospitalName;
    private Boolean isCashless;
    private String diagnosis;
}

package com.backend.Insurance.Sinistre.AutoMobile.DTOS;

import lombok.Data;

@Data

public class AutoMobileDTO {
    private Long userId;
    private String objectSinistre;
    private String descriptionSinistre;
    private Float amount;
    private String Matricule;
    private String Location;
    private String model;
}

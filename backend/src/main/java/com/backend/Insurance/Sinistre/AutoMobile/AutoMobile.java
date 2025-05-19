package com.backend.Insurance.Sinistre.AutoMobile;

import com.backend.Insurance.Sinistre.Entity.Sinistre;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@DiscriminatorValue("AutoMobile")
public class AutoMobile extends Sinistre {
    private String matricule;
    private String location;
    private String model;
}

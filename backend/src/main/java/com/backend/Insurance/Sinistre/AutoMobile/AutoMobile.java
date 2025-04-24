package com.backend.Insurance.Sinistre.AutoMobile;

import com.backend.Insurance.Sinistre.Sinistre;
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
    private String Matricule;
    private String Location;
}

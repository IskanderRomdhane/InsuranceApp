package com.backend.Insurance.Sinistre.Habilitation;

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
@DiscriminatorValue("Habilitation")
public class Habilitation extends Sinistre {
    private String propertyAddress;
    private String damageType;
}

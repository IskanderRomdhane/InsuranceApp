package com.backend.Insurance.Sinistre.Sante;

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
@DiscriminatorValue("Sante")
public class Sante extends Sinistre {
    private String hospitalName;
    private boolean isCashless;
    private String diagnosis;
}

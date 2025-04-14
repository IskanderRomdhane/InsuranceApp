package com.backend.Insurance.Sinistre;

import com.backend.Insurance.Image.Image;
import com.backend.Insurance.Sinistre.Enums.Categorie;
import com.backend.Insurance.Sinistre.Enums.Etat;
import com.backend.Insurance.User.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.context.annotation.Lazy;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Sinistre {
    @Id
    @GeneratedValue
    private Long id;
    private LocalDateTime date;
    private Etat etat;
    private Categorie categorie;
    private String description;
    private String object;
    @OneToMany
    @JsonManagedReference
    @Lazy
    private List<Image> images;

    @ManyToOne
    @JsonBackReference
    private User user;
}

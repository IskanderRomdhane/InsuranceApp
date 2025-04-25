package com.backend.Insurance.Sinistre;

import com.backend.Insurance.Document.Document;
import com.backend.Insurance.Image.Image;
import com.backend.Insurance.Sinistre.Enums.Etat;
import com.backend.Insurance.User.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "sinistre_type" , discriminatorType = DiscriminatorType.STRING)
public class Sinistre {
    @Id
    @GeneratedValue
    private Long id;
    private LocalDateTime date;
    private Etat etat;
    private String description;
    private String object;
    private Float amount;
    @OneToMany
    @JsonManagedReference("sinistre-images")
    private List<Image> images;


    @ManyToOne
    @JsonBackReference("user-sinistres")
    private User user;

    @OneToMany
    @JsonManagedReference("sinistre-documents")
    private List<Document> document;

}

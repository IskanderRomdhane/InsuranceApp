package com.backend.Insurance.Image.Entity;

import com.backend.Insurance.Reclamation.Entity.Reclamation;
import com.backend.Insurance.Sinistre.Entity.Sinistre;
import com.backend.Insurance.User.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Image {
    @GeneratedValue
    @Id
    private Long id;
    private String name;
    private String imageUrl;

    @ManyToOne
    @JsonBackReference("reclamation-images")
    private Reclamation reclamation;

    @ManyToOne
    @JsonBackReference("sinistre-images")
    private Sinistre sinistre;

    @OneToOne
    private User user;
}

package com.backend.Insurance.User;

import com.backend.Insurance.Image.Entity.Image;
import com.backend.Insurance.Reclamation.Entity.Reclamation;
import com.backend.Insurance.Sinistre.Entity.Sinistre;
import com.backend.Insurance.notification.Entity.Notification;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {
    @Id
    private String id;
    @Column(unique = true)
    private String CIN;
    private String username;
    @Column(unique = true)
    private String email;
    private String firstname;
    private String lastname;
    private String role;
    @Column(nullable = false)
    private boolean active = true;
    private String adresse;
    @OneToMany(mappedBy = "user")
    @JsonManagedReference("user-reclamations")
    private List<Reclamation> reclamation;
    @OneToMany(mappedBy = "user")
    @JsonManagedReference("user-sinistres")
    private List<Sinistre> sinistres;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    @JsonIgnore
    private List<Notification> notifications;

    @OneToOne
    private Image profilePicture;

    @Override
    public String toString() {
        return "username='" + username + '\'' +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", email='" + email + '\'';
    }

    public String getFullName() {
        return firstname + " " + lastname;
    }

}

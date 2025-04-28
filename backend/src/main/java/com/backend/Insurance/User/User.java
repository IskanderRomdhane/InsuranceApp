package com.backend.Insurance.User;

import com.backend.Insurance.Image.Image;
import com.backend.Insurance.Reclamation.Reclamation;
import com.backend.Insurance.Sinistre.Sinistre;
import com.backend.Insurance.notification.Notification;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
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
    @GeneratedValue
    private Long id;
    @Column(unique = true)
    private String CIN;
    private String username;
    @Column(unique = true)
    private String email;
    private String firstname;
    private String lastname;
    private String role;
    @Column(nullable = false)
    private boolean active = false;
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

package com.backend.Insurance.User;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue()
    private Long id;
    @Column(unique = true)
    private String CIN;
    private String username;
    @Column(unique = true)
    private String email;
    private String firstname;
    private String lastname;

    @Override
    public String toString() {
        return
                "username='" + username + '\'' +
                        ", firstname='" + firstname + '\'' +
                        ", lastname='" + lastname + '\'' +
                        ", email='" + email + '\''
                ;
    }

    public String getFullName() {
        return firstname + " " + lastname;
    }

}

package com.backend.Insurance.notification;

import com.backend.Insurance.User.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Entity
public class Notification {

    //    private NotificationStatus status;
//    private String message;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //    @Enumerated(EnumType.STRING)
    private NotificationStatus status;

    private String message;

    private Boolean read = false;

    //     optionally you can link the notification to a user (example)
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    @JsonIgnore
    private User user;
}

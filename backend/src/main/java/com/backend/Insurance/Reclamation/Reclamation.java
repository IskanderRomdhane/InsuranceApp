package com.backend.Insurance.Reclamation;

import com.backend.Insurance.Message.Message;
import com.backend.Insurance.Reclamation.ENUMS.Status;
import com.backend.Insurance.Reclamation.ENUMS.TypeReclamation;
import com.backend.Insurance.User.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Reclamation {
    @Id
    @GeneratedValue
    private long id;
    @Enumerated(EnumType.STRING)
    private TypeReclamation typeReclamation;
    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDateTime date;
    @OneToMany
    private List<Message> message;

    @ManyToOne
    private User user;
}

package com.backend.Insurance.Message;

import com.backend.Insurance.Reclamation.Reclamation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String content;

    private LocalDateTime dateDenvoi;

    private String expediteur;
    private String expediteurEmail;

    @ManyToOne
    private Reclamation associatedReclamation;
}

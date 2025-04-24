package com.backend.Insurance.Document;

import com.backend.Insurance.Sinistre.Sinistre;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Document {
    @GeneratedValue
    @Id
    private Long id;
    private String documentUrl;
    private String documentName;
    @ManyToOne
    @JsonBackReference("sinistre-documents")
    private Sinistre sinistre;

}

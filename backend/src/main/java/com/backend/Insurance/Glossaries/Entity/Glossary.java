package com.backend.Insurance.Glossaries.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "glossary")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Glossary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String term;
    private String definition;
    private String category;
}

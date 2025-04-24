package com.backend.Insurance.Glossaries;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GlossaryRepository extends JpaRepository<Glossary, Long> {

    List<Glossary> findByCategory(String category);
    List<Glossary> findByTermContainingIgnoreCaseOrDefinitionContainingIgnoreCase(String term, String definition);

}

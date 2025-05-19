package com.backend.Insurance.Glossaries.Repository;

import com.backend.Insurance.Glossaries.Entity.Glossary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GlossaryRepository extends JpaRepository<Glossary, Long> {

    List<Glossary> findByCategory(String category);
    List<Glossary> findByTermContainingIgnoreCaseOrDefinitionContainingIgnoreCase(String term, String definition);

}

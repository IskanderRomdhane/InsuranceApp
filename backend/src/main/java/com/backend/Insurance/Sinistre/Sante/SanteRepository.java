package com.backend.Insurance.Sinistre.Sante;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SanteRepository extends JpaRepository<Sante, Long> {
    List<Sante> findByUserId(String id);
}

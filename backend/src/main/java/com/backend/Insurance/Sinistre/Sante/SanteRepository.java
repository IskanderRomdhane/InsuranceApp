package com.backend.Insurance.Sinistre.Sante;

import com.backend.Insurance.Sinistre.AutoMobile.AutoMobile;
import com.backend.Insurance.Sinistre.Sinistre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SanteRepository extends JpaRepository<Sante, Long> {
    List<Sante> findByUserId(String id);
}

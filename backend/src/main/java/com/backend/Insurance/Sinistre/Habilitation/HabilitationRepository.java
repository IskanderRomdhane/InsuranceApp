package com.backend.Insurance.Sinistre.Habilitation;

import com.backend.Insurance.Sinistre.AutoMobile.AutoMobile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HabilitationRepository extends JpaRepository<Habilitation,Long> {
    List<Habilitation> findByUserId(Long id);
}

package com.backend.Insurance.Reclamation.Repository;

import com.backend.Insurance.Reclamation.ENUMS.Status;
import com.backend.Insurance.Reclamation.ENUMS.TypeReclamation;
import com.backend.Insurance.Reclamation.Entity.Reclamation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReclamationRepository extends JpaRepository<Reclamation, Long> {
    List<Reclamation> findByUserId(String id);
    List<Reclamation> findByStatus(Status status);
    List<Reclamation> findBytypeReclamation(TypeReclamation typeReclamation);
}

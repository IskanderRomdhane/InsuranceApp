package com.backend.Insurance.Reclamation;

import com.backend.Insurance.Reclamation.ENUMS.Status;
import com.backend.Insurance.Reclamation.ENUMS.TypeReclamation;
import com.backend.Insurance.User.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReclamationRepository extends JpaRepository<Reclamation , Long> {
    List<Reclamation> findByUserId(String id);
    List<Reclamation> findByStatus(Status status);
    List<Reclamation> findBytypeReclamation(TypeReclamation typeReclamation);
}

package com.backend.Insurance.Sinistre;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SinistreRepository extends JpaRepository<Sinistre , Long> {
    @Query("SELECT s FROM Sinistre s WHERE TYPE(s) = :type")
    List<Sinistre> findBySubclass(@Param("type") Class<? extends Sinistre> type);

}

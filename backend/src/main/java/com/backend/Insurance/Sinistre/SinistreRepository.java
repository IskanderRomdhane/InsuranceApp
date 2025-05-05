package com.backend.Insurance.Sinistre;

import com.backend.Insurance.Sinistre.Enums.Etat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SinistreRepository extends JpaRepository<Sinistre , Long> {
    @Query("SELECT s FROM Sinistre s WHERE TYPE(s) = :type")
    List<Sinistre> findBySubclass(@Param("type") Class<? extends Sinistre> type);

    List<Sinistre> findByEtat(Etat etat);

    @Query(value = "SELECT EXTRACT(YEAR FROM s.date) AS year, EXTRACT(MONTH FROM s.date) AS month, COUNT(*) AS count " +
            "FROM sinistre s " +
            "GROUP BY EXTRACT(YEAR FROM s.date), EXTRACT(MONTH FROM s.date) " +
            "ORDER BY year, month", nativeQuery = true)
    List<Object[]> countSinistresPerMonth();
    Long countByEtat(Etat etat);
}

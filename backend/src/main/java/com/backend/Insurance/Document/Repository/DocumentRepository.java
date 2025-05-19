package com.backend.Insurance.Document.Repository;

import com.backend.Insurance.Document.Entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document, Long> {
}

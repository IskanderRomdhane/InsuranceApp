package com.backend.Insurance.Documents;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface DocumentService {
    Document saveDocument(String title, String description, MultipartFile file) throws IOException;
    Document getDocument(Long id);
    List<Document> getAllDocuments();
}

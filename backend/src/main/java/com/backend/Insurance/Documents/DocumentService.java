package com.backend.Insurance.Documents;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface DocumentService {
    Documents saveDocument(String title, String description, MultipartFile file) throws IOException;
    Documents getDocument(Long id);
    List<Documents> getAllDocuments();
}

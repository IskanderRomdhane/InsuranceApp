package com.backend.Insurance.Documents;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
public class DocumentServiceImpl implements DocumentService{

    @Autowired
    private DocumentsRepository documentRepository;

    @Override
    public Documents saveDocument(String title, String description, MultipartFile file) throws IOException {
        Documents doc = new Documents();
        doc.setTitle(title);
        doc.setDescription(description);
        doc.setFileName(file.getOriginalFilename());
        doc.setFileType(file.getContentType());
        doc.setFileSize(file.getSize() / 1024 + " KB");
        doc.setUpdatedAt(LocalDate.now().toString());
        doc.setData(file.getBytes());
        doc.setFileDownloadUri("/api/documents/" + doc.getId() + "/download"); // to be finalized after saving

        Documents saved = documentRepository.save(doc);
        saved.setFileDownloadUri("/api/documents/" + saved.getId() + "/download"); // update with real id
        return documentRepository.save(saved); // re-save to store the URI
    }

    @Override
    public Documents getDocument(Long id) {
        return documentRepository.findById(id).orElseThrow(() -> new RuntimeException("Document not found"));
    }

    @Override
    public List<Documents> getAllDocuments() {
        return documentRepository.findAll();
    }
}

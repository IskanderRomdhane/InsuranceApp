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
    private DocumentRepository documentRepository;

    @Override
    public Document saveDocument(String title, String description, MultipartFile file) throws IOException {
        Document doc = new Document();
        doc.setTitle(title);
        doc.setDescription(description);
        doc.setFileName(file.getOriginalFilename());
        doc.setFileType(file.getContentType());
        doc.setFileSize(file.getSize() / 1024 + " KB");
        doc.setUpdatedAt(LocalDate.now().toString());
        doc.setData(file.getBytes());
        doc.setFileDownloadUri("/api/documents/" + doc.getId() + "/download"); // to be finalized after saving

        Document saved = documentRepository.save(doc);
        saved.setFileDownloadUri("/api/documents/" + saved.getId() + "/download"); // update with real id
        return documentRepository.save(saved); // re-save to store the URI
    }

    @Override
    public Document getDocument(Long id) {
        return documentRepository.findById(id).orElseThrow(() -> new RuntimeException("Document not found"));
    }

    @Override
    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }
}

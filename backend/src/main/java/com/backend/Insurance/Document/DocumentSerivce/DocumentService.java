package com.backend.Insurance.Document.DocumentSerivce;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
@Service
public class DocumentService {
    private final Cloudinary cloudinary;

    public DocumentService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String uploadDocument(MultipartFile file) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        return uploadResult.get("url").toString();
    }
}

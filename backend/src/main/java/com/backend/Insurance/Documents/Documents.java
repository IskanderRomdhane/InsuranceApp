package com.backend.Insurance.Documents;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "documents")
public class Documents {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private String fileType;

    private String fileSize;

    private String updatedAt;

    private String fileName;

    private String fileDownloadUri;

    @Lob
    private byte[] data;
}


package com.example.FireDepartment.Entity;

import jakarta.persistence.Entity;

        import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "certificates")
public class Certificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nocNumber;
    private String adharno;
    private String uploaderName;
    private String buildingName;
    private String buildingAddress;
    private String documentType;
    private String buildingType;
    private String issueDate;
    private String expiryDate;

    @Lob
    private String conditions; // Comma-separated

    @Lob
    private byte[] pdfFile; // Store PDF as blob

    private String email;
}

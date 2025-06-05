package com.example.FireDepartment.Controller;

import com.example.FireDepartment.Entity.Certificate;
import com.example.FireDepartment.Repository.CertificateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certificates")
public class CertificateController {
    @Autowired
    private CertificateRepository certificateRepository;

    // Get all certificates
    @GetMapping
    public List<Certificate> getAllCertificates() {
        return certificateRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Certificate> getCertificateById(@PathVariable Long id) {
        return certificateRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/by-email")
    public List<Certificate> getCertificatesByEmail(@RequestParam String email) {
        return certificateRepository.findByEmail(email);
    }
}

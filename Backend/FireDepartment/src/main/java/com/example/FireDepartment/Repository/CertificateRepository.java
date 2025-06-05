package com.example.FireDepartment.Repository;

import com.example.FireDepartment.Entity.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CertificateRepository extends JpaRepository<Certificate,Long> {
    List<Certificate> findByEmail(String email);
}

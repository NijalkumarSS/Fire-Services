package com.example.FireDepartment.Repository;

import com.example.FireDepartment.Entity.Signup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ForgotpPassRepo extends JpaRepository<Signup,Long> {
    Optional<Signup> findByEmail(String email);
}

package com.example.FireDepartment.Repository;

import com.example.FireDepartment.Entity.Signup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailRepository extends JpaRepository<Signup,Long> {
//    public boolean existsByEmail(String email);
}

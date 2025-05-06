package com.example.FireDepartment.Repository;

import com.example.FireDepartment.Entity.Signup;
import com.example.FireDepartment.Entity.adminlogin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface adminRepository extends JpaRepository<adminlogin,Long> {
    public boolean existsByEmail(String email);

    adminlogin findByEmail(String email);


}

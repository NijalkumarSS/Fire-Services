package com.example.FireDepartment.Repository;

import com.example.FireDepartment.Entity.Signup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SignpRepository extends JpaRepository<Signup,Long> {

    Signup findByUsername(String username);
    Signup findByEmail(String email);


    public boolean existsByEmail(String email);
    Optional<Signup> findByUsernameAndPassword(String username, String password);


}

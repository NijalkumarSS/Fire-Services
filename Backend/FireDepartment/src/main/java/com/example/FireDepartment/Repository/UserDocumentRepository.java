package com.example.FireDepartment.Repository;

import com.example.FireDepartment.Entity.UserDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDocumentRepository extends JpaRepository<UserDocument,Long> {

}

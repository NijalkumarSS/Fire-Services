package com.example.FireDepartment.Repository;

import com.example.FireDepartment.Entity.UserDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDocumentRepository extends JpaRepository<UserDocument,Long> {


    @Query(nativeQuery = true,value = "select count(*) from user_document te")
    int datacount();

    @Query(nativeQuery = true,value = "select count(*) from user_document a where a.completed = false")
    int falsecount();
}

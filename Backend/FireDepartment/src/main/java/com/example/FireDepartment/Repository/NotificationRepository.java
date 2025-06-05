package com.example.FireDepartment.Repository;

import com.example.FireDepartment.Entity.notification;
import org.springframework.data.convert.ReadingConverter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<notification,Long> {
}

package com.example.FireDepartment.Service;

import com.example.FireDepartment.Entity.UserDocument;
import com.example.FireDepartment.Repository.UserDocumentRepository;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class DocumentService {

    @Autowired
    private UserDocumentRepository repository;

    @Autowired
    private JavaMailSender emailService;
    @Autowired
    private EntityManager entityManager;

    public void sendOtpEmail(String email, String otp) {
        String subject = "Your OTP for Document Upload";
        String body = "Dear User,\n\nYour OTP for document upload is: " + otp + "\n\n" +
                "Please enter this OTP to verify your request.\n\nThanks,\nYour Team";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject(subject);
        message.setText(body);
        emailService.send(message);
    }

    public UserDocument createUserDocument(
            String uploaderName,
            Integer age,
            String dob,
            String gender,
            Long adharNo,
            String panCardNo,
            Long mobileNumber,
            String email,
            String address,
            String building,
            String documentType,
            String designation,
            String location,
            Long pinCode,
            MultipartFile file,
            String notes
    ) throws IOException {

        UserDocument document = new UserDocument();
        document.setUploadername(uploaderName);
        document.setAge(age);
        document.setDob(dob);
        document.setGender(gender);
        document.setAdharno(adharNo);
        document.setPancardno(panCardNo);
        document.setMobilenumber(mobileNumber);
        document.setEmail(email);
        document.setAddress(address);
        document.setBuildingType(building);
        document.setDocumentType(documentType);
        document.setDesignation(designation);
        document.setLocation(location);
        document.setPincode(pinCode);

        document.setFileName(file.getOriginalFilename());
        document.setSubmitteddate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        document.setNotes(notes);

        return repository.save(document);
    }

    public void uploadmail(String email, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject(subject);
        message.setText(body);
        emailService.send(message);
    }

}


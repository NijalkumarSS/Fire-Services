package com.example.FireDepartment.Controller;

import com.example.FireDepartment.Entity.Signup;
import com.example.FireDepartment.Entity.User;
import com.example.FireDepartment.Entity.UserDocument;
import com.example.FireDepartment.Repository.EmailRepository;
import com.example.FireDepartment.Repository.SignpRepository;
import com.example.FireDepartment.Service.UserService;
import com.example.FireDepartment.dto.EmailRequest;
import com.example.FireDepartment.dto.SignupRequest;
import com.example.FireDepartment.dto.userrequest;
import jakarta.validation.Valid;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin
@RequestMapping("/project")
public class Usercontroller {

    @Autowired
    private UserService service;

    @Autowired
    private SignpRepository signpRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostMapping("/Signup")
    public ResponseEntity<?> SignupController(@RequestBody @Valid SignupRequest sr) {

        if (signpRepository.existsByEmail(sr.getEmail())) {
            return ResponseEntity.ok("Email exists");
        } else {
            sr.setPassword(passwordEncoder.encode(sr.getPassword()));
            service.SignupService(sr);
            JSONObject js = new JSONObject();
            js.put("Status", sr);
            return new ResponseEntity<>(js, HttpStatus.ACCEPTED);
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<UserDocument> uploadUserDocument(
            @RequestParam String building,
            @RequestParam String documentType,
            @RequestParam String designation,
            @RequestParam String location,
            @RequestParam Long pincode,
            @RequestParam("file") MultipartFile file,
            @RequestParam String notes) {

        UserDocument savedDocument = service.createUserDocument(
                building, documentType, designation, location, pincode, file, notes
        );

        return ResponseEntity.ok(savedDocument);
    }
    }


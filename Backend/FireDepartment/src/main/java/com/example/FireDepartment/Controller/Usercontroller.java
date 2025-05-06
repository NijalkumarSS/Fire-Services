package com.example.FireDepartment.Controller;

import com.example.FireDepartment.Entity.Signup;
import com.example.FireDepartment.Entity.User;
import com.example.FireDepartment.Entity.UserDocument;
import com.example.FireDepartment.Entity.adminlogin;
import com.example.FireDepartment.Repository.EmailRepository;
import com.example.FireDepartment.Repository.SignpRepository;
import com.example.FireDepartment.Repository.adminRepository;
import com.example.FireDepartment.Service.UserService;
import com.example.FireDepartment.Service.mail;
import com.example.FireDepartment.dto.EmailRequest;
import com.example.FireDepartment.dto.SignupRequest;
import com.example.FireDepartment.dto.adminrequest;
import com.example.FireDepartment.dto.userrequest;
import jakarta.validation.Valid;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    @Autowired
    private mail mailService;
    @Autowired
    private adminRepository adminRepo;


    @PostMapping("/Signup")
    public ResponseEntity<?> SignupController(@RequestBody @Valid SignupRequest sr) {

        try {

            if (signpRepository.existsByEmail(sr.getEmail())) {
                return ResponseEntity.ok("Email exists");
            } else {
                mailService.send(sr.getEmail(), "Registered Successfully", "Your account has be Registered Succesfully");
                sr.setPassword(passwordEncoder.encode(sr.getPassword()));
                service.SignupService(sr);
                JSONObject js = new JSONObject();
                js.put("details", sr);
                js.put("status","Ragistered Successfully");
                return new ResponseEntity<>(js, HttpStatus.ACCEPTED);
            }
        }
        catch (Exception e){
            return ResponseEntity.ok("Register Failed");
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<UserDocument> uploadUserDocument(
            @RequestParam String uploadername,
            @RequestParam Integer age,
            @RequestParam String dob,
            @RequestParam String gender,
            @RequestParam String designation,
            @RequestParam Integer adharno,
            @RequestParam Integer pancardno,
            @RequestParam String address,
            @RequestParam String building,
            @RequestParam String documentType,
            @RequestParam String location,
            @RequestParam Long pincode,
            @RequestParam("file") MultipartFile file,
            @RequestParam String notes) {

        UserDocument savedDocument = service.createUserDocument(
               uploadername,age,dob,gender,adharno,pancardno,address, building, documentType, designation, location, pincode, file, notes
        );

        return ResponseEntity.ok(savedDocument);
    }

@PostMapping("/adminsignup")
public ResponseEntity<?> adminsignup(@RequestBody @Valid adminrequest admin) {

    if (adminRepo.existsByEmail(admin.getEmail())) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
    }

    admin.setPassword(passwordEncoder.encode(admin.getPassword()));
    service.adminlogin(admin); // Rename for clarity
    return ResponseEntity.ok("Admin added successfully");
}
    @Value("${server.base.url:http://localhost:8080}")
    private String baseUrl;

    @GetMapping("/getuploads")
    public List<Map<String, Object>> getAllProducts() {
        List<UserDocument> products = service.getAllProducts();

        return products.stream().map(product -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", product.getId());
            map.put("uploadername", product.getUploadername());
            map.put("building", product.getBuildingType());
            map.put("documentType", product.getDocumentType());
            map.put("pdfUrl", baseUrl + "/uploads/" + product.getFileName());
            map.put("address",product.getAddress());
            map.put("pincode", product.getPincode());
            return map;
        }).collect(Collectors.toList());


    }
}


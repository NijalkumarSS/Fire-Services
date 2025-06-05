package com.example.FireDepartment.Controller;

import com.example.FireDepartment.Entity.UserDocument;
import com.example.FireDepartment.Repository.SignpRepository;
import com.example.FireDepartment.Repository.UserDocumentRepository;
import com.example.FireDepartment.Repository.adminRepository;
import com.example.FireDepartment.Service.UserService;
import com.example.FireDepartment.Service.mail;
import com.example.FireDepartment.cache.OtpVerificationCache;
import com.example.FireDepartment.cache.TempFileStorage;
import com.example.FireDepartment.dto.SignupRequest;
import com.example.FireDepartment.dto.TemporaryUpload;
import com.example.FireDepartment.dto.adminrequest;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@Slf4j
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

    @Autowired
    private UserDocumentRepository userDocumentRepository;

    @PostMapping("/Signup")
    public ResponseEntity<?> SignupController(@RequestBody @Valid SignupRequest sr) {

        try {

            if (signpRepository.existsByEmail(sr.getEmail())) {
                return ResponseEntity.ok("Email exists");
            } else {
                String subject = "Resgistration status : Successfull";
                String body = "Dear User,\n\n"
                        + "Your account has been registered successfully.\n\n"
                        + "Details:\n"
                        + "-------------------------\n"
                        + "Status      : Success\n"
                        + "Timestamp   : " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) + "\n"
                        + "Uploaded by : " + sr.getEmail() + "\n"
                        + "-------------------------\n\n"
                        + "Thank you for using our service.\n"
                        + "Best regards,\n"
                        + "@FireGuard Services";
                mailService.send(sr.getEmail(),subject,body);
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


    @Autowired
    private OtpVerificationCache otpVerificationCache;

//    @PostMapping("/upload")
//    public ResponseEntity<?> uploadUserDocument(
//            @RequestParam String uploadername,
//            @RequestParam Integer age,
//            @RequestParam String dob,
//            @RequestParam String gender,
//            @RequestParam String designation,
//            @RequestParam Long adharno,
//            @RequestParam String pancardno,
//            @RequestParam Long mobilenumber,
//            @RequestParam String email,
//            @RequestParam String address,
//            @RequestParam String building,
//            @RequestParam String documentType,
//            @RequestParam String location,
//            @RequestParam Long pincode,
//            @RequestParam("file") MultipartFile file,
//            @RequestParam String notes) {
//
//        if (!otpVerificationCache.isVerified(email)) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                    .body("OTP not verified for this email.");
//        }
//
//        try{
//
//            String subject = "Uploading Status : Success";
//            String body = "Dear User,\n\n"
//                    + "Your file has been successfully uploaded.\n\n"
//                    + "Details:\n"
//                    + "-------------------------\n"
//                    + "Status      : \"Your upload for " +documentType+ " is completed\n"
//                    + "Timestamp   : " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) + "\n"
//                    + "Uploaded by : " + email + "\n"
//                    + "-------------------------\n\n"
//                    + "Thank you for using our service.\n"
//                    + "Best regards,\n"
//                    + "Your Application Team";
//            service.uploadmail(email,subject,body);
//
//            UserDocument savedDocument = service.createUserDocument(
//                    uploadername,age,dob,gender,adharno,pancardno,mobilenumber,email, address, building,
//                    documentType, designation, location, pincode, file, notes
//            );
//            otpVerificationCache.remove(email);
//            return ResponseEntity.ok(savedDocument);
//        }catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed: " + e.getMessage());
//
//        }
//
//    }
    @Autowired
    private TemporaryUpload temporaryUpload;

    @Autowired
    private TempFileStorage tempFileStorage;

@PostMapping("/documents/initiate-upload")
public ResponseEntity<?> initiateUpload(
        @RequestParam String uploadername,
        @RequestParam Integer age,
        @RequestParam String dob,
        @RequestParam String gender,
        @RequestParam String designation,
        @RequestParam Long adharno,
        @RequestParam String pancardno,
        @RequestParam Long mobilenumber,
        @RequestParam String email,
        @RequestParam String address,
        @RequestParam String building,
        @RequestParam String documentType,
        @RequestParam String location,
        @RequestParam Long pincode,
        @RequestParam("file") MultipartFile file,
        @RequestParam String notes) throws IOException {

    if (!file.isEmpty()) {
        String tempFilename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path tempFile = Files.createTempFile("upload_", tempFilename);
        file.transferTo(tempFile.toFile());

        tempFileStorage.saveMetadata(email, new TemporaryUpload(
                uploadername, age, dob, gender, adharno, pancardno, mobilenumber, email,
                address, building, documentType, designation, location, pincode, notes, tempFile.toString()
        ));

        return ResponseEntity.ok("Temp file saved. Please verify OTP.");
    }

    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File is empty");
}
    @PostMapping("/documents/finalize-upload")
    public ResponseEntity<?> finalizeUpload(@RequestParam String email) {
        if (!otpVerificationCache.isVerified(email)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("OTP not verified for this email.");
        }

        TemporaryUpload tempData = tempFileStorage.getMetadata(email);
        if (tempData == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No temporary data found");
        }

        try (InputStream fileStream = new FileInputStream(tempData.getFilePath())) {
            MultipartFile multipartFile = new MockMultipartFile("file", fileStream);

            UserDocument saved = service.createUserDocument(
                    tempData.getUploadername(), tempData.getAge(), tempData.getDob(), tempData.getGender(),
                    tempData.getAdharno(), tempData.getPancardno(), tempData.getMobilenumber(),
                    tempData.getEmail(), tempData.getAddress(), tempData.getBuilding(),
                    tempData.getDocumentType(), tempData.getDesignation(), tempData.getLocation(),
                    tempData.getPincode(), multipartFile, tempData.getNotes()
            );

            Files.deleteIfExists(Paths.get(tempData.getFilePath()));
            tempFileStorage.removeMetadata(email);
            otpVerificationCache.remove(email);

            return ResponseEntity.ok(saved);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed");
        }
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
            map.put("completed",product.getCompleted());
            map.put("email",product.getEmail());
            map.put("designation",product.getDesignation());
            map.put("submitteddate",product.getSubmitteddate());

            return map;
        }).collect(Collectors.toList());
    }

    @DeleteMapping("/buildingdelete/{id}")
    public String buildingdelete(@PathVariable Long id){
        service.deletebuilding(id);
        return "Deleted Successfully";
    }
    @PutMapping("/checktrue/{id}/{status}")
    public ResponseEntity<?> updateCompletedStatus(@PathVariable Long id, @PathVariable Boolean status) {
        Optional<UserDocument> optionalBuilding = userDocumentRepository.findById(id);
        if (!optionalBuilding.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        UserDocument building = optionalBuilding.get();
        building.setCompleted(status); // true or false based on checkbox
        userDocumentRepository.save(building);
        return ResponseEntity.ok("Status updated");
    }

    @GetMapping("/count")
    public ResponseEntity<?> count(){
        JSONObject js=new JSONObject();
        js.put("count",service.sendvalue());
        js.put("falsecount",service.falsevalue());
        return new ResponseEntity<>(js,HttpStatus.OK);
    }

}


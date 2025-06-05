package com.example.FireDepartment.Controller;

import com.example.FireDepartment.Entity.*;
import com.example.FireDepartment.Repository.*;
import com.example.FireDepartment.Service.UserService;
import com.example.FireDepartment.Service.mail;
import com.example.FireDepartment.dto.ResetPasswordRequest;
import com.example.FireDepartment.dto.SignupRequest;
import com.example.FireDepartment.dto.adminrequest;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.properties.TextAlignment;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
//import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
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

@PostMapping("/upload")
public ResponseEntity<?> uploadUserDocument(
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
        @RequestParam("image") MultipartFile image,   // <-- Added image field
        @RequestParam String notes) {

    try {
        // Email Notification
        String subject = "Uploading Status : Success";
        String body = "Dear User,\n\n"
                + "Your file has been successfully uploaded.\n\n"
                + "Details:\n"
                + "-------------------------\n"
                + "Status      : \"Your upload for " + documentType + " is completed\n"
                + "Timestamp   : " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) + "\n"
                + "Uploaded by : " + email + "\n"
                + "-------------------------\n\n"
                + "Thank you for using our service.\n"
                + "Best regards,\n"
                + "Your Application Team";

        service.uploadmail(email, subject, body);

        // Create and save document with image
        UserDocument savedDocument = service.createUserDocument(
                uploadername, age, dob, gender, adharno, pancardno, mobilenumber,
                email, address, building, documentType, designation,
                location, pincode, file, image, notes  // <-- image passed here
        );

        return ResponseEntity.ok(savedDocument);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed: " + e.getMessage());
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
            map.put("number",product.getMobilenumber());
            map.put("email",product.getEmail());
            map.put("adharno",product.getAdharno());
            map.put("pancardno",product.getPancardno());
            map.put("designation",product.getDesignation());
            map.put("submitteddate",product.getSubmitteddate());
            map.put("imageUrl", baseUrl + "/image/" + product.getId());

            return map;
        }).collect(Collectors.toList());
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        Optional<UserDocument> optionalDoc = service.getById(id);

        if (optionalDoc.isPresent() && optionalDoc.get().getImageData() != null) {
            byte[] imageBytes = optionalDoc.get().getImageData();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);

            return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
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

    @PostMapping("notificationtemplate")
    public ResponseEntity<?> notificationtemplate(@RequestParam String Toemail,
                                                  @RequestParam String subject,
                                                  @RequestParam String body,
                                                  @RequestParam String applicantid){

        service.notificationetemplate(Toemail,subject,body,applicantid);

        return ResponseEntity.status(HttpStatus.OK).body("Mail sent");
    }

    @GetMapping("/building/{id}")
    public Optional<UserDocument> getBuildingById(@PathVariable Long id) {
        return service .getBuildingById(id);
    }

    @PostMapping("/check-email")
    public ResponseEntity<Map<String, Boolean>> checkEmail(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        boolean exists = signpRepository.existsByEmail(email);
        return ResponseEntity.ok(Collections.singletonMap("exists", exists));
    }

    @Autowired
    private ForgotpPassRepo forgotpPassRepo;

    @PutMapping("/reset-password")
    public String resetPassword(@RequestBody ResetPasswordRequest request) {
        Optional<Signup> userOptional = forgotpPassRepo.findByEmail(request.getEmail());

        if (userOptional.isPresent()) {
            Signup user = userOptional.get();


            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String hashedPassword = passwordEncoder.encode(request.getNewPassword());

            user.setPassword(hashedPassword);
            user.setConfirmpassword(hashedPassword);
            signpRepository.save(user);
            return "Password reset successful";
        } else {
            return "Email not found";
        }
    }
    @Autowired
    private CertificateRepository certificateRepository;

    @PostMapping("/api/certificates")
    public ResponseEntity<?> issueCertificate(@RequestBody Certificate cert) {
        try {
            Certificate saved = service.saveCertificate(cert);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to issue certificate.");
        }
    }

//    @GetMapping("/all")
//    public ResponseEntity<List<Map<String, Object>>> getAllCertificates() {
//        List<Certificate> certificates = /* fetch from DB or service */;
//        List<Map<String, Object>> result = service.convertCertificatesToMap(certificates);
//        return ResponseEntity.ok(result);
//    }

}


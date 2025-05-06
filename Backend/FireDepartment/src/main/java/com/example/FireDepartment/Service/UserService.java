package com.example.FireDepartment.Service;

import com.example.FireDepartment.Entity.Signup;
import com.example.FireDepartment.Entity.User;
import com.example.FireDepartment.Entity.UserDocument;
import com.example.FireDepartment.Entity.adminlogin;
import com.example.FireDepartment.Repository.SignpRepository;
import com.example.FireDepartment.Repository.UserDocumentRepository;
import com.example.FireDepartment.Repository.UserRepository;
import com.example.FireDepartment.Repository.adminRepository;
import com.example.FireDepartment.dto.SignupRequest;
import com.example.FireDepartment.dto.adminrequest;
import com.example.FireDepartment.dto.userrequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userrepo;
    @Autowired
    private SignpRepository SignRepo;


    public User insertuser(userrequest ur) {
        User us= new User();
        us.setName(ur.getName() );
        us.setTitle(ur.getTitle());
        return userrepo.save(us);
    }

    public Signup SignupService (SignupRequest sr) {
        Signup sp = new Signup();
        sp.setUsername(sr.getUsername());
        sp.setEmail(sr.getEmail());
        sp.setPassword(sr.getPassword());
        sp.setConfirmpassword(sr.getConfirmpassword());
        return SignRepo.save(sp);
    }

    @Autowired
    private UserDocumentRepository userDocumentRepository;

public UserDocument createUserDocument(String uploadername,Integer age,String dob, String gender, Integer adharno,
                                       Integer pancardno, String address,
                                       String building, String documentType, String designation, String location,
                                       Long pincode, MultipartFile file, String notes) {

    try {
        if (file.isEmpty()) {
            throw new RuntimeException("Uploaded file is empty");
        }

        if (!file.getContentType().equals("application/pdf")) {
            throw new RuntimeException("Only PDF files are allowed");
        }

        // Create uploads directory if not exists
        String uploadDir = System.getProperty("user.dir") + "/uploads/";
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // Generate a unique filename
        String originalFileName = file.getOriginalFilename();
        String fileName = System.currentTimeMillis() + "_" + originalFileName;

        // Save the file in uploads folder
        Path filePath = Paths.get(uploadDir + fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Now create UserDocument entity
        UserDocument ud = new UserDocument();
        ud.setUploadername(uploadername);
        ud.setAge(age);
        ud.setAdharno(adharno);
        ud.setAddress(address);
        ud.setGender(gender);
        ud.setPancardno(pancardno);
        ud.setBuildingType(building);
        ud.setDocumentType(documentType);
        ud.setDesignation(designation);
        ud.setLocation(location);
        ud.setPincode(pincode);
        ud.setFileName(fileName); 
        ud.setNotes(notes);

        return userDocumentRepository.save(ud);

    } catch (IOException e) {
        throw new RuntimeException("Failed to upload and save file", e);
    }
}

@Autowired
private adminRepository adminrepository;
public adminlogin adminlogin(adminrequest admin){
    adminlogin ad=new adminlogin();

    ad.setAdminname(admin.getAdminname());
    ad.setEmail(admin.getEmail());
    ad.setPhonenumber(admin.getPhonenumber());
    ad.setPassword(admin.getPassword());
    return adminrepository.save(ad);
}

    public List<UserDocument> getAllProducts() {
        return userDocumentRepository.findAll();
    }

}

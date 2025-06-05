package com.example.FireDepartment.Service;

import com.example.FireDepartment.Entity.*;
import com.example.FireDepartment.Repository.*;
import com.example.FireDepartment.dto.CertificateRequest;
import com.example.FireDepartment.dto.SignupRequest;
import com.example.FireDepartment.dto.adminrequest;
import com.example.FireDepartment.dto.userrequest;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.properties.HorizontalAlignment;
import com.itextpdf.layout.properties.TextAlignment;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.util.ByteArrayDataSource;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.scheduling.annotation.Scheduled;

import javax.swing.text.html.parser.Entity;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private EntityManager entityManager;

    @Value("${spring.mail.username}")
    private String frommail;

    @Autowired
    private UserRepository userrepo;
    @Autowired
    private SignpRepository SignRepo;

    @Autowired
    private NotificationRepository notificationRepository;


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

public UserDocument createUserDocument(String uploadername,Integer age,String dob, String gender, Long adharno,
                                       String pancardno, Long mobilenumber,String email, String address,
                                       String building, String documentType, String designation, String location,
                                       Long pincode, MultipartFile file,MultipartFile image, String notes) {



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

        UserDocument ud = new UserDocument();
        ud.setUploadername(uploadername);
        ud.setAge(age);
        ud.setDob(dob);
        ud.setEmail(email);
        ud.setAdharno(adharno);
        ud.setAddress(address);
        ud.setGender(gender);
        ud.setPancardno(pancardno);
        ud.setBuildingType(building);
        ud.setDocumentType(documentType);
        ud.setMobilenumber(mobilenumber);
        ud.setDesignation(designation);
        ud.setLocation(location);
        ud.setPincode(pincode);
        ud.setFileName(fileName); 
        ud.setNotes(notes);
        ud.setCompleted(false);
        ud.setSubmitteddate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

        if (image != null && !image.isEmpty()) {
            ud.setImgname(image.getOriginalFilename());
            ud.setImageData(image.getBytes());
        }

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
    public Optional<UserDocument> getById(Long id) {
        return userDocumentRepository.findById(id);
    }

    public String deletebuilding(Long id){
    userDocumentRepository.deleteById(id);
    return "Deleted";
    }

    public int sendvalue(){
        return (userDocumentRepository.datacount());
    }
    public int falsevalue(){
        return (userDocumentRepository.falsecount());
    }

    public String uploadmail(String Toemail,String subject, String body){

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(frommail);
        message.setTo(Toemail);
        message.setSubject(subject);
        message.setText(body);

        javaMailSender.send(message);
        return "success";
    }

    public notification notificationetemplate(String Toemail, String subject, String body,String applicantid){

    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(Toemail);
    message.setSubject(subject);
    message.setText(body);
    javaMailSender.send(message);
    notification user = new notification();
    user.setToemail(Toemail);
    user.setSubject(subject);
    user.setBody(body);
    user.setApplicantid(applicantid);
    return notificationRepository.save(user);
    }

    public Optional<UserDocument> getBuildingById(Long id) {
        return userDocumentRepository.findById(id);
    }


    @Autowired
    private CertificateRepository certificateRepository;


    public Certificate saveCertificate(Certificate cert) throws Exception {
        byte[] pdf = generatePDF(cert);
        cert.setPdfFile(pdf);

        Certificate savedCert = certificateRepository.save(cert);
        sendCertificateByEmail(savedCert.getEmail(), pdf, cert.getNocNumber());
        return savedCert;
    }

    private byte[] generatePDF(Certificate cert) throws Exception {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(out);
        PdfDocument pdf = new PdfDocument(writer);
        Document doc = new Document(pdf);

        // Logo
        ImageData imageData = ImageDataFactory.create("src/main/resources/static/TN_logo.png");
        Image logo = new Image(imageData).scaleAbsolute(100, 50).setHorizontalAlignment(HorizontalAlignment.CENTER);
        doc.add(logo);

        doc.add(new Paragraph("GOVERNMENT OF TAMIL NADU").setBold().setTextAlignment(TextAlignment.CENTER).setFontSize(14));
        doc.add(new Paragraph("FIRE SAFETY DEPARTMENT").setTextAlignment(TextAlignment.CENTER));
        doc.add(new Paragraph("NO OBJECTION CERTIFICATE").setBold().setTextAlignment(TextAlignment.CENTER));

        doc.add(new Paragraph("This is to certify that the building described below complies with the fire safety regulations..."));
        doc.add(new Paragraph("Applicant Number: " + cert.getAdharno()));
        doc.add(new Paragraph("Applicant Name: " + cert.getUploaderName()));
        doc.add(new Paragraph("Building Name: " + cert.getBuildingName()));
        doc.add(new Paragraph("Building Address: " + cert.getBuildingAddress()));
        doc.add(new Paragraph("Document Type: " + cert.getDocumentType()));
        doc.add(new Paragraph("Building Type: " + cert.getBuildingType()));
        doc.add(new Paragraph("Issue Date: " + cert.getIssueDate()));
        doc.add(new Paragraph("Expiry Date: " + cert.getExpiryDate()));

        doc.add(new Paragraph("Conditions:").setBold());
        String[] conditions = cert.getConditions().split(",");
        for (String cond : conditions) {
            doc.add(new Paragraph("• " + cond.trim()));
        }

        doc.add(new Paragraph("\n\n"));
        ImageData signData = ImageDataFactory.create("src/main/resources/static/signature1.png");
        Image sign = new Image(signData).scaleAbsolute(100, 40).setHorizontalAlignment(HorizontalAlignment.RIGHT);
        doc.add(sign);

        doc.add(new Paragraph("Authorized Signatory").setBold().setTextAlignment(TextAlignment.RIGHT));
        doc.add(new Paragraph("Fire Safety Department").setTextAlignment(TextAlignment.RIGHT));

        doc.add(new Paragraph("\nThis certificate is issued by the Fire Safety Department, Government of India.")
                .setFontSize(9).setTextAlignment(TextAlignment.CENTER));
        doc.add(new Paragraph("Verify this certificate at: https://firesafety.gov.in/verify")
                .setFontSize(9).setTextAlignment(TextAlignment.CENTER));

        doc.close();
        return out.toByteArray();
    }

    private void sendCertificateByEmail(String toEmail, byte[] pdfData, String nocNumber) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(toEmail);
        helper.setSubject("Your Fire Safety NOC Certificate");
        helper.setText("Dear Applicant,\n\nPlease find attached your NOC certificate.\n\nRegards,\nFire Safety Dept");

        helper.addAttachment("NOC_" + nocNumber + ".pdf", new ByteArrayDataSource(pdfData, "application/pdf"));

        javaMailSender.send(message);
    }


//    public List<Map<String, Object>> convertCertificatesToMap(List<Certificate> certificates) {
//        return certificates.stream()
//                .map(certificate -> {
//                    String encodedPdf = "";
//                    if (certificate.getPdfFile() != null) {
//                        encodedPdf = Base64.getEncoder().encodeToString(certificate.getPdfFile());
//                    }
//
//                    return Map.of(
//                            "nocNumber", certificate.getNocNumber(),
//                            "adharno", certificate.getAdharno(),
//                            "uploaderName", certificate.getUploaderName(),
//                            "buildingName", certificate.getBuildingName(),
//                            "buildingAddress", certificate.getBuildingAddress(),
//                            "documentType", certificate.getDocumentType(),
//                            "buildingType", certificate.getBuildingType(),
//                            "issueDate", certificate.getIssueDate(),
//                            "expiryDate", certificate.getExpiryDate(),
//                            "conditions", certificate.getConditions(),
//                            "pdfFile", encodedPdf
//                    );
//                })
//            .collect(Collectors.toList());
//    }

}

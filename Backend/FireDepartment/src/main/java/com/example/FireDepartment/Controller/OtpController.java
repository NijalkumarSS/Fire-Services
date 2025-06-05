package com.example.FireDepartment.Controller;

import com.example.FireDepartment.Service.DocumentService;
import com.example.FireDepartment.Service.OtpService;
import com.example.FireDepartment.Service.UserService;
import com.example.FireDepartment.cache.OtpVerificationCache;
import com.example.FireDepartment.dto.OtpRequest;
import com.example.FireDepartment.dto.OtpVerificationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("otp")
@CrossOrigin
public class OtpController {

    @Autowired
    private OtpService otpService;

    @Autowired
    private DocumentService documentService;

    @Autowired
    private OtpVerificationCache otpVerificationCache;

    @Autowired
    private UserService service;

    @PostMapping("/send")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);

        otpVerificationCache.store(email, otp);

        String subject = "Document Upload OTP Verification";

        String body = "Dear User,\n\n"
                + "Thank you for initiating a document upload on our platform.\n\n"
                + "To proceed, please use the One-Time Password (OTP) below:\n\n"
                + "🔐 *Your OTP is: " + otp + "*\n\n"
                + "This OTP is valid for the next 5 minutes. Please do not share this code with anyone.\n\n"
                + "If you did not request this, please ignore this email or contact our support team.\n\n"
                + "Regards,\n"
                + "The Document Management Team - Fire Service";

        service.uploadmail(email, subject, body);

        return ResponseEntity.ok("OTP sent to email.");
    }
    @PostMapping("/sendforgotpasswor")
    public ResponseEntity<?> sendOtpp(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);

        otpVerificationCache.store(email, otp);

        String subject = "Forgot Password";

        String body = "Dear User,\n\n"

                + "To proceed, please use the One-Time Password (OTP) below:\n\n"
                + "🔐 *Your OTP is: " + otp + "*\n\n"
                + "This OTP is valid for the next 5 minutes. Please do not share this code with anyone.\n\n"
                + "If you did not request this, please ignore this email or contact our support team.\n\n"
                + "Regards,\n"
                + "The Support Team - Fire Service";

        service.uploadmail(email, subject, body);

        return ResponseEntity.ok("OTP sent to email.");
    }
    @PostMapping("/sendsignup")
    public ResponseEntity<?> sendOtpsignup(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);

        otpVerificationCache.store(email, otp);

        String subject = "Account Signup OTP Verification";

        String body = "Dear User,\n\n"
                + "Thank you for signing up on our platform.\n\n"
                + "To complete your registration, please use the One-Time Password (OTP) below:\n\n"
                + "🔐 *Your OTP is: " + otp + "*\n\n"
                + "This OTP is valid for the next 5 minutes. For your security, do not share this code with anyone.\n\n"
                + "If you did not attempt to register, please ignore this email or contact our support team immediately.\n\n"
                + "Best regards,\n"
                + "The Support Team - Fire Service";

        service.uploadmail(email, subject, body);

        return ResponseEntity.ok("OTP sent to email.");
    }

    @PostMapping("/otp/verify-upload")
    public ResponseEntity<String> verifyOtp(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String userOtp = payload.get("otp");

        if (otpVerificationCache.isValid(email, userOtp)) {
            otpVerificationCache.markVerified(email);
            return ResponseEntity.ok("OTP verified");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid OTP");
    }




}


package com.example.FireDepartment.Service;

import com.example.FireDepartment.cache.OtpVerificationCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    private final Map<String, String> otpStorage = new ConcurrentHashMap<>();
    private final Map<String, LocalDateTime> otpExpiry = new ConcurrentHashMap<>();
    private static final int OTP_VALID_DURATION = 5; // in minutes

    @Autowired
    private OtpVerificationCache otpVerificationCache;

    @Autowired
    private UserService service; // Replace with your actual mail service class

    public void generateOtp(String email) {
        String otp = String.valueOf(100000 + new Random().nextInt(900000));
        otpStorage.put(email, otp);
        otpExpiry.put(email, LocalDateTime.now().plusMinutes(OTP_VALID_DURATION));

        String subject = "Your OTP Code";
        String body = "Your OTP is: " + otp + "\nValid for " + OTP_VALID_DURATION + " minutes.";

        // Send email
        service.uploadmail(email, subject, body);
    }

    public boolean verifyOtp(String email, String otp) {
        if (!otpStorage.containsKey(email)) return false;

        String storedOtp = otpStorage.get(email);
        LocalDateTime expiryTime = otpExpiry.get(email);

        if (LocalDateTime.now().isAfter(expiryTime)) {
            otpStorage.remove(email);
            otpExpiry.remove(email);
            return false;
        }

        boolean isMatch = storedOtp.equals(otp);

        if (isMatch) {
            otpStorage.remove(email);
            otpExpiry.remove(email);

            // ✅ Mark email as verified
            otpVerificationCache.markVerified(email);
        }

        return isMatch;
    }
}

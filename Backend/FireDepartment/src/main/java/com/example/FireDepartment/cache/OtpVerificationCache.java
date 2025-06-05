package com.example.FireDepartment.cache;

import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class OtpVerificationCache {
    private final Map<String, String> otpStore = new ConcurrentHashMap<>();


    private final Map<String, Boolean> verifiedEmails = new ConcurrentHashMap<>();


    public void store(String email, String otp) {
        otpStore.put(email, otp);
        verifiedEmails.put(email, false);
    }


    public boolean isValid(String email, String enteredOtp) {
        String storedOtp = otpStore.get(email);
        return storedOtp != null && storedOtp.equals(enteredOtp);
    }


    public void markVerified(String email) {
        verifiedEmails.put(email, true);
    }


    public boolean isVerified(String email) {
        return verifiedEmails.getOrDefault(email, false);
    }


    public void remove(String email) {
        otpStore.remove(email);
        verifiedEmails.remove(email);
    }
}





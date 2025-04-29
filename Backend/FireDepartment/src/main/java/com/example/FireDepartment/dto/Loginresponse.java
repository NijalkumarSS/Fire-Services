package com.example.FireDepartment.dto;

public class Loginresponse {
    private String username;
    private String email;

    public Loginresponse(String username, String email) {
        this.username = username;
        this.email = email;
    }

    // Getters
    public String getUsername() { return username; }
    public String getEmail() { return email; }
}

package com.example.FireDepartment.Security;

import com.example.FireDepartment.Entity.Signup;
import com.example.FireDepartment.Entity.adminlogin;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class CustomAdminDetailsImpl implements UserDetails {

    private final adminlogin admin;

    public CustomAdminDetailsImpl(adminlogin admin){
        this.admin =admin;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(() -> "ROLE_");  // Customize role if needed
    }

    @Override
    public String getPassword() {
        return admin.getPassword();
    }

    @Override
    public String getUsername() {
        return admin.getEmail(); // Here you return email as username
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public String getActualUsername() {
        return admin.getAdminname();
    }

//    public String getRole() {
//        return signup.getRole();
//    }

    public String getEmail() {
        return admin.getEmail();
    }

    public adminlogin getSignupEntity() {
        return admin;
    }
}

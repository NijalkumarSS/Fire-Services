package com.example.FireDepartment.Service;

import com.example.FireDepartment.Entity.adminlogin;
import com.example.FireDepartment.Repository.adminRepository;
import com.example.FireDepartment.Security.CustomAdminDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class CustomAdminDetails implements UserDetailsService {

    @Autowired
    private adminRepository adrepo;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        adminlogin admin = adrepo.findByEmail(email);
//                .orElseThrow(() -> new UsernameNotFoundException("User not found") );
        return new CustomAdminDetailsImpl(admin);    }
}

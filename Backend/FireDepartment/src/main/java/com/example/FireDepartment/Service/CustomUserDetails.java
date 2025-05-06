package com.example.FireDepartment.Service;

import com.example.FireDepartment.Entity.Signup;
import com.example.FireDepartment.Entity.adminlogin;
import com.example.FireDepartment.Repository.SignpRepository;
import com.example.FireDepartment.Repository.adminRepository;
import com.example.FireDepartment.Security.CustomAdminDetailsImpl;
import com.example.FireDepartment.Security.CustomUserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class CustomUserDetails implements UserDetailsService {

    @Autowired
    private SignpRepository signpRepository;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Signup signup = signpRepository.findByEmail(email);
//                .orElseThrow(() -> new UsernameNotFoundException("User not found") );
        return new CustomUserDetailsImpl(signup);    }


}

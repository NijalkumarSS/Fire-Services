package com.example.FireDepartment.Service;

import com.example.FireDepartment.Entity.Signup;
import com.example.FireDepartment.Repository.SignpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class CustomUserDetails implements UserDetailsService {

    @Autowired
    private SignpRepository signpRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Signup signup = signpRepository.findByUsername(username);
//                .orElseThrow(() -> new UsernameNotFoundException("User not found") );
        return new User(signup.getUsername(),signup.getPassword(), Collections.singleton(new SimpleGrantedAuthority("User_Role")));
    }
}

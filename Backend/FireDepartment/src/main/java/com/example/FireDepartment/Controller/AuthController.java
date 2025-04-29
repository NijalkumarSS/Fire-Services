//package com.example.FireDepartment.Controller;
//
//import com.example.FireDepartment.Entity.Signup;
//import com.example.FireDepartment.Repository.SignpRepository;
//import com.example.FireDepartment.Security.jwtUtils;
//import com.example.FireDepartment.dto.Loginresponse;
//import org.json.simple.JSONObject;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Map;
//
//@RestController
//@CrossOrigin
//@RequestMapping("/auth")
//public class AuthController {
//
//    @Autowired
//    private AuthenticationManager authManager;
//
//    @Autowired
//    private SignpRepository signpRepository;
//
//    @Autowired
//    private jwtUtils jwtUtil;
//
//    @PostMapping("/login")
//    public ResponseEntity<Map<String, String>> login(@RequestBody Signup user){
//
//        try {
//
//            Authentication authentication = authManager
//                    .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername().trim(),user.getPassword()));
//
//            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
//            String token = jwtUtil.generateToken(userDetails);
//            JSONObject js= new JSONObject();
//            js.put("token",token);
//
//            return signpRepository.findByUsernameAndPassword(user.getUsername(),user.getPassword())
//                    .map(userlogin -> ResponseEntity.ok(new Loginresponse(user.getUsername(), user.getEmail())));
//
////            return ResponseEntity.ok(Map.of("token", token));
//        }
//        catch (Exception e ){
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("Error","Invalid username or pasword"));
//        }
//    }
//
//
//}
package com.example.FireDepartment.Controller;

import com.example.FireDepartment.Entity.Signup;
import com.example.FireDepartment.Repository.SignpRepository;
import com.example.FireDepartment.Security.jwtUtils;
import com.example.FireDepartment.dto.Loginresponse;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private SignpRepository signpRepository;

    @Autowired
    private jwtUtils jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Signup user){

        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername().trim(), user.getPassword())
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            String token = jwtUtil.generateToken(userDetails);

            Signup fullUser = signpRepository.findByUsername(user.getUsername());

            if (fullUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "User not found"));
            }

            JSONObject response = new JSONObject();
            response.put("username", fullUser.getUsername());
            response.put("email", fullUser.getEmail());
            response.put("token", token);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid username or password"));
        }
    }
}

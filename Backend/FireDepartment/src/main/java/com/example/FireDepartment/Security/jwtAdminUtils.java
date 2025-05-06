package com.example.FireDepartment.Security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class jwtAdminUtils {
    private static final String SECRET_KEY_STRING = "XhfdgeNBO2krWcoliUXMl5ZtUhnOb84a";

    private final SecretKey SECRET_KEY = Keys.hmacShaKeyFor(SECRET_KEY_STRING.getBytes());

    public String generateToken(CustomAdminDetailsImpl userDetails){
        return Jwts.builder()
                .subject(userDetails.getEmail())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000 *60 *60))
                .signWith(SECRET_KEY, Jwts.SIG.HS256)
                .compact()
                ;
    }

    public boolean validatetoken(String token, UserDetails userDetails){
        return extractUsername(token).equals(userDetails.getUsername());
    }
    public String extractUsername(String token){
        return Jwts.parser()
                .verifyWith(SECRET_KEY)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
}

//ここでt－クンの発行と検証
package com.example.myspringapp.entity;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import com.example.myspringapp.entity.Users;

@Component
public class JwtUtil {
private final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256); 

public String generateToken(Users user) {
    return Jwts.builder()
    .setSubject(String.valueOf(user.getId()))
        .claim("username", user.getUsername())
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1時間の有効期限
        .signWith(SECRET_KEY)
        .compact();
}

// public String extractUsername(String token) {
//     return Jwts.parserBuilder() 
//         .setSigningKey(SECRET_KEY)
//         .build()
//         .parseClaimsJws(token)
//         .getBody()
//         .getSubject();
// }
public String extractUserId(String token) {
    return Jwts.parserBuilder()
        .setSigningKey(SECRET_KEY)
        .build()
        .parseClaimsJws(token)
        .getBody()
        .getSubject(); // userIdがsubに入ってる前提
}

public boolean validateToken(String token) {
    try {
        Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
        return true;
    } catch (Exception e) {
        return false;
    }
}
}
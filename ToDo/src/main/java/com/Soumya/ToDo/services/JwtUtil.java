package com.Soumya.ToDo.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Objects;

@Component
public class JwtUtil {
    private static final String SECRET_KEY_STRING = "soumyatodo@333#njnfjsfffhjdjsdnkn";
    private static final Key SECRET_KEY = Keys.hmacShaKeyFor(SECRET_KEY_STRING.getBytes());

    public String generateToken(String name, int userId){
        HashMap<String, Object> claims = new HashMap<>();
        claims.put("userId",userId);
        String token = Jwts.builder()
                .setClaims(claims)
                .setSubject(name)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 ))
                .signWith(SECRET_KEY)
                .compact();
        return token;
    }
    public int extractUserId(String token){
        Claims claims = getClaimsFromToken(token);
        return (int) claims.get("userId");
    }

    private Claims getClaimsFromToken(String token){
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean validateToken(String token){
        try {
            Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token);
            return true;
        }
        catch (JwtException e){
            System.out.println(e.getMessage());
            return false;
        }
    }
}

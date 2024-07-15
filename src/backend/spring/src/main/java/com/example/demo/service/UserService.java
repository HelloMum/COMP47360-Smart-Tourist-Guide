package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;

/**
 * Service class for user-related operations.
 */
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private SecureRandom secureRandom = new SecureRandom();

    /**
     * Registers a new user with the given email and password.
     *
     * @param email The email of the new user.
     * @param password The password of the new user.
     * @return true if registration is successful, false if the email is already in use.
     */
    public boolean registerUser(String email, String password) {
        if (userRepository.findByEmail(email) != null) {
            return false;
        }
        User user = new User();
        user.setEmail(email);

        String salt = generateSalt();
        user.setSalt(salt);

        String saltedPassword = salt + password;
        user.setPassword(passwordEncoder.encode(saltedPassword));

        userRepository.save(user);
        return true;
    }

    /**
     * Authenticates a user with the given email and password.
     *
     * @param email The email of the user attempting to authenticate.
     * @param password The password of the user attempting to authenticate.
     * @return true if authentication is successful, false otherwise.
     */
    public boolean authenticateUser(String email, String password) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password));
            return authentication.isAuthenticated();
        } catch (AuthenticationException e) {
            return false;
        }
    }

    /**
     * Generates a JWT token for the user with the given email.
     *
     * @param email The email of the user for whom to generate the token.
     * @return A JWT token string.
     */
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setExpiration(new Date(System.currentTimeMillis() + 864_000_000)) // 10 days
                .signWith(SignatureAlgorithm.HS512, "SecretKeyToGenJWTs")
                .compact();
    }

    /**
     * Generates a random salt for use in password hashing.
     *
     * @return A base64 encoded salt string.
     */
    private String generateSalt() {
        byte[] salt = new byte[16];
        secureRandom.nextBytes(salt);
        return Base64.getEncoder().encodeToString(salt);
    }
}
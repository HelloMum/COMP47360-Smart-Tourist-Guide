package com.example.demo.service;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
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

    private SecureRandom secureRandom = new SecureRandom();
    private static final String SECRET_KEY = "SecretKeyToGenJWTs";

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
        user.setPassword(hashPassword(saltedPassword));

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
        User user = userRepository.findByEmail(email);
        if (user != null) {
            String saltedPassword = user.getSalt() + password;
            return hashPassword(saltedPassword).equals(user.getPassword());
        }
        return false;
    }

    /**
     * Generates a JWT token for the user with the given email.
     *
     * @param email The email of the user for whom to generate the token.
     * @return A JWT token string.
     */
    public String generateToken(String email) {
        return JWT.create()
                .withSubject(email)
                .withExpiresAt(new Date(System.currentTimeMillis() + 864_000_000)) // 10 days
                .sign(Algorithm.HMAC512(SECRET_KEY));
    }

    public boolean verifyToken(String token) {
        try {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC512(SECRET_KEY)).build();
            DecodedJWT jwt = verifier.verify(token.replace("Bearer ", ""));
            return true;
        } catch (JWTVerificationException exception) {
            return false;
        }
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

    /**
     * Hashes the given password using SHA-256.
     *
     * @param password The password to hash.
     * @return The hashed password.
     */
    private String hashPassword(String password) {
        return DigestUtils.sha256Hex(password);
    }
}
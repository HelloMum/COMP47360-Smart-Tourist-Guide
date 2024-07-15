package com.example.demo.controller;

import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller class for user-related operations.
 */
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Endpoint for user registration.
     * Accepts a POST request containing a JSON object with "email" and "password" fields.
     * Returns a JSON object with a "message" field indicating the result of the registration attempt.
     *
     * @param request A map containing the "email" and "password" of the user to register.
     * @return ResponseEntity containing a map with a "message" key. The message is either
     * "Registration successful!" if the registration was successful, or "Email already registered."
     * if the email is already in use. Returns a 500 status code with an error message in case of exceptions.
     */
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        Map<String, String> response = new HashMap<>();
        try {
            boolean isRegistered = userService.registerUser(email, password);
            String message = isRegistered ? "Registration successful!" : "Email already registered.";
            response.put("message", message);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Registration failed: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    /**
     * Endpoint for user login.
     * Accepts a POST request containing a JSON object with "email" and "password" fields.
     * Returns a JSON object with either a "token" field containing the JWT token if authentication is successful,
     * or a "message" field indicating the reason for authentication failure.
     *
     * @param request A map containing the "email" and "password" of the user attempting to log in.
     * @return ResponseEntity containing either a map with a "token" key if authentication is successful,
     * or a map with a "message" key indicating the reason for failure ("Invalid email or password.").
     * Returns a 401 status code for authentication failures, or a 500 status code with an error message in case of exceptions.
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        Map<String, String> response = new HashMap<>();
        try {
            boolean isAuthenticated = userService.authenticateUser(email, password);
            if (isAuthenticated) {
                String token = userService.generateToken(email);
                response.put("token", token);
                return ResponseEntity.ok(response);
            } else {
                response.put("message", "Invalid email or password.");
                return ResponseEntity.status(401).body(response);
            }
        } catch (Exception e) {
            response.put("message", "Login failed: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}
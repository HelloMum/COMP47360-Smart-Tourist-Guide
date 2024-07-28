package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/email")
    public ResponseEntity<Map<String, String>> getEmail(@RequestBody Map<String, String> request) {
        Map<String, String> response = new HashMap<>();

        String token = request.get("token");
        String email = userService.getEmailFromToken(token);
        response.put("email", email);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/changePassword")
    public ResponseEntity<Map<String, String>> changePassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");

        Map<String, String> response = new HashMap<>();
        if (userService.verifyToken(token)) {
            try {
                String email = userService.getEmailFromToken(token);
                String oldPassword = request.get("oldPassword");
                String newPassword = request.get("newPassword");

                boolean isChanged = userService.changePassword(email, oldPassword, newPassword);
                String message = isChanged ? "Password changed successfully!" : "Invalid email or password.";
                response.put("message", message);
                return ResponseEntity.ok(response);
            } catch (Exception e) {
                response.put("message", "Access to protected resource granted but Password change failed: " + e.getMessage());
                return ResponseEntity.status(500).body(response);
            }
        } else {
            response.put("message", "Invalid or expired token.");
            return ResponseEntity.status(401).body(response);
        }
    }

    /**
     * Handles GET requests to the "/protected" endpoint.
     * This endpoint is designed to demonstrate access control to a protected resource using JWT tokens.
     * <p>
     * The method checks the validity of the JWT token provided in the "Authorization" header of the request.
     * If the token is valid, it grants access to the protected resource by returning a success message.
     * If the token is invalid or expired, it denies access and returns an error message along with a 401 status code.
     *
     * @param token The JWT token provided in the "Authorization" header of the request.
     * @return ResponseEntity containing either a success message and a 200 status code if the token is valid,
     *         or an error message and a 401 status code if the token is invalid or expired.
     */
    @GetMapping("/protected")
    public ResponseEntity<Map<String, String>> protectedEndpoint(@RequestHeader("Authorization") String token) {
        Map<String, String> response = new HashMap<>();
        if (userService.verifyToken(token)) {
            response.put("message", "Access to protected resource granted.");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Invalid or expired token.");
            return ResponseEntity.status(401).body(response);
        }
    }
}
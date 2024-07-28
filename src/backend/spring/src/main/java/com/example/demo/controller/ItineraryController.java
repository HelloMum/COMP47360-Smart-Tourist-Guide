package com.example.demo.controller;

import com.example.demo.model.ItineraryItem;
import com.example.demo.model.ItinerarySaved;
import com.example.demo.model.User;
import com.example.demo.model.UserSelection;
import com.example.demo.service.ItineraryService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/itinerary")
@CrossOrigin(origins = "http://localhost:3000")
public class ItineraryController {

    @Autowired
    private ItineraryService itineraryService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public Map<LocalDate, List<ItineraryItem>> createItinerary(@RequestBody UserSelection selection, @RequestParam String startDate, @RequestParam String endDate) {
        System.out.println("Received user selection: " + selection);
        System.out.println("Start date: " + startDate);
        System.out.println("End date: " + endDate);

        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        return itineraryService.createItineraryFromSelection(selection.getIds(), start, end);
    }

    @PostMapping("/save")
    public ResponseEntity<Map<String, String>> saveItinerary(@RequestBody Map<String, Object> requestData) {
        Map<String, String> response = new HashMap<>();

        try {
            // Validate and extract the token
            String token = (String) requestData.get("token");
            if (token == null || !userService.verifyToken(token)) {
                response.put("message", "Invalid or expired token.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            // Parse dates
            LocalDate startDate = LocalDate.parse((String) requestData.get("startDate"));
            LocalDate endDate = LocalDate.parse((String) requestData.get("endDate"));

            // Safely handle planData
            Map<String, List<Map<String, Object>>> planData;
            try {
                planData = (Map<String, List<Map<String, Object>>>) requestData.get("planData");
                // Convert UUID strings to UUID objects if necessary
                planData = convertUUIDStringsToUUID(planData);
            } catch (ClassCastException e) {
                response.put("message", "Invalid format for plan data.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            // Save itinerary
            boolean isSaved = itineraryService.saveItinerary(token, planData, startDate, endDate);
            if (isSaved) {
                response.put("message", "Itinerary saved successfully.");
                return ResponseEntity.ok(response);
            } else {
                response.put("message", "Failed to save itinerary.");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
            }

        } catch (DateTimeParseException e) {
            response.put("message", "Invalid date format.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (Exception e) {
            response.put("message", "An unexpected error occurred: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    private Map<String, List<Map<String, Object>>> convertUUIDStringsToUUID(Map<String, List<Map<String, Object>>> planData) {
        // Traverse and convert UUID strings to UUID objects
        for (Map.Entry<String, List<Map<String, Object>>> entry : planData.entrySet()) {
            List<Map<String, Object>> list = entry.getValue();
            for (Map<String, Object> map : list) {
                for (Map.Entry<String, Object> subEntry : map.entrySet()) {
                    Object value = subEntry.getValue();
                    if (value instanceof String) {
                        try {
                            UUID uuid = UUID.fromString((String) value);
                            subEntry.setValue(uuid);
                        } catch (IllegalArgumentException e) {
                            // Handle or log invalid UUID strings if needed
                        }
                    }
                }
            }
        }
        return planData;
    }

    @PostMapping("/deleteSaved")
    public ResponseEntity<Map<String, String>> deleteSavedItinerary(@RequestBody Map<String, Object> requestData) {
        Map<String, String> response = new HashMap<>();
        String token = requestData.get("token").toString();

        if (userService.verifyToken(token)) {
            Long itineraryId = Long.parseLong(requestData.get("itineraryId").toString());
            Boolean isDeleted = itineraryService.deleteSavedItinerary(token, itineraryId);
            if (isDeleted) {
                response.put("message", "Itinerary deleted successfully.");
                return ResponseEntity.ok(response);
            } else {
                response.put("message", "Access to 'delete saved schedule' feature is granted. Failed to delete itinerary.");
                return ResponseEntity.status(500).body(response);
            }
        } else {
            response.put("message", "Invalid or expired token.");
            return ResponseEntity.status(401).body(response);
        }
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserItineraries(@RequestParam String token) {
        if (userService.verifyToken(token)) {
            Map<Long, Map<String, Object>> itineraries = itineraryService.getUserItineraries(token);
            return ResponseEntity.ok(itineraries);
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Invalid or expired token.");
            return ResponseEntity.status(401).body(response);
        }
    }

    @GetMapping("/statistics")
    public ResponseEntity<?> getItineraryStatistics(@RequestParam String token) {
        if (userService.verifyToken(token)) {
            Map<String, Object> statistics = itineraryService.getItineraryStatistics(token);
            return ResponseEntity.ok(statistics);
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Invalid or expired token.");
            return ResponseEntity.status(401).body(response);
        }
    }
}
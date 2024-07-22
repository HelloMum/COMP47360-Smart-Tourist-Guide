package com.example.demo.controller;

import com.example.demo.model.ItineraryItem;
import com.example.demo.model.ItinerarySaved;
import com.example.demo.model.User;
import com.example.demo.model.UserSelection;
import com.example.demo.service.ItineraryService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        String token = requestData.get("token").toString();

        if (userService.verifyToken(token)) {
            LocalDate startDate = LocalDate.parse(requestData.get("startDate").toString());
            LocalDate endDate = LocalDate.parse(requestData.get("endDate").toString());

            Map<String, List<Map<String, Object>>> planData = (Map<String, List<Map<String, Object>>>) requestData.get("planData");

            Boolean isSaved = itineraryService.saveItinerary(token, planData, startDate, endDate);
            if (isSaved) {
                response.put("message", "Itinerary saved successfully.");
                return ResponseEntity.ok(response);
            } else {
                response.put("message", "Access to 'save schedule' feature is granted. Failed to save itinerary.");
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
            Map<Integer, Map<String, Object>> itineraries = itineraryService.getUserItineraries(token);
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
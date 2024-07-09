//package com.example.demo.controller;
//
//import com.example.demo.model.ItineraryItem;
//import com.example.demo.model.UserSelection;
//import com.example.demo.service.ItineraryService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.time.LocalDate;
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/itinerary")
//@CrossOrigin(origins = "http://localhost:3000")
//public class ItineraryController {
//
//    @Autowired
//    private ItineraryService itineraryService;
//
//    @PostMapping("/create")
//    public Map<LocalDate, List<ItineraryItem>> createItinerary(@RequestBody UserSelection selection, @RequestParam String startDate, @RequestParam String endDate) {
//        System.out.println("Received user selection: " + selection);
//        System.out.println("Start date: " + startDate);
//        System.out.println("End date: " + endDate);
//
//        LocalDate start = LocalDate.parse(startDate);
//        LocalDate end = LocalDate.parse(endDate);
//        return itineraryService.createItineraryFromSelection(selection.getIds(), start, end);
//    }
//}
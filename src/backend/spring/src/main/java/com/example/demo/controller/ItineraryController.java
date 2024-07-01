package com.example.demo.controller;

import com.example.demo.model.ItineraryItem;
import com.example.demo.service.ItineraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/itinerary")
public class ItineraryController {

    @Autowired
    private ItineraryService itineraryService;

    @GetMapping("/create")
    public List<ItineraryItem> createItinerary(@RequestParam("startDate") String startDateStr,
                                               @RequestParam("endDate") String endDateStr) {
        LocalDate startDate = LocalDate.parse(startDateStr);
        LocalDate endDate = LocalDate.parse(endDateStr);
        return itineraryService.createItinerary(startDate, endDate);
    }
}
package com.example.demo.controller;

import com.example.demo.model.Attraction;
import com.example.demo.service.AttractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/attractions")
public class AttractionController {

    @Autowired
    private AttractionService attractionService;

    // Return an attraction by the index
    @GetMapping("/index/{index}")
    public Attraction getAttractionByIndex(@PathVariable int index) {
        return attractionService.getAttractionByIndex(index);
    }

    // Filter logic (isFree, category)
    // Sort by rating DESC (default), price ASC
    @GetMapping("/filter")
    public List<Attraction> filterAttractions(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Boolean isFree,
            @RequestParam(required = false) String category,
            @RequestParam(required = false, defaultValue = "rating") String sortBy,
            @RequestParam(required = false) String order) {


        if (order == null) {
            if ("price".equalsIgnoreCase(sortBy)) {
                order = "asc";
            } else {
                order = "desc";
            }
        }
        return attractionService.filterAndSortAttractions(name, isFree, category, sortBy, order);
    }

    // Filter logic (isFree, category)
    // Sort by rating DESC (default), price ASC
    @GetMapping("/filterWithDate")
    public List<Attraction> filterAttractions(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Boolean isFree,
            @RequestParam(required = false) String category,
            @RequestParam(required = false, defaultValue = "rating") String sortBy,
            @RequestParam(required = false) String order) {


        if (order == null) {
            if ("price".equalsIgnoreCase(sortBy)) {
                order = "asc";
            } else {
                order = "desc";
            }
        }

        return attractionService.filterAndSortAttractionsWithDate(name, isFree, category, sortBy, order, startDate, endDate);
    }
}

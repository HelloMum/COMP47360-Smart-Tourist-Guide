package com.example.demo.controller;

import com.example.demo.model.Attraction;
import com.example.demo.service.AttractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/attractions")
public class AttractionController {

    @Autowired
    private AttractionService attractionService;

    // Return all the attractions
    @GetMapping("/all")
    public List<Attraction> getAllAttractions() {
        return attractionService.getAttractions();
    }

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
            @RequestParam(required = false) List<String> category,
            @RequestParam(required = false, defaultValue = "rating") String sortBy,
            @RequestParam(required = false) String order) {

        if (category == null || category.isEmpty()) {

        }

        if (order == null) {
            if ("price".equalsIgnoreCase(sortBy)) {
                order = "asc";
            } else {
                order = "desc";
            }
        }
        return attractionService.filterAndSortAttractions(name, isFree, category, sortBy, order);
    }

}

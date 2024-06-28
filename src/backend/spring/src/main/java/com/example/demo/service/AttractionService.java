package com.example.demo.service;

import com.example.demo.model.Attraction;
import com.opencsv.CSVReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AttractionService {

    private List<Attraction> attractions = new ArrayList<>();

    public AttractionService() {
        loadAttractions();
    }

    private void loadAttractions() {
        try {
            // ClassPathResource to load file
            Resource resource = new ClassPathResource("attractions_df.csv");
            InputStream inputStream = resource.getInputStream();
            CSVReader reader = new CSVReader(new InputStreamReader(inputStream));

            reader.readNext();

            String[] line;
            while ((line = reader.readNext()) != null) {
                Attraction attraction = new Attraction();
                attraction.setIndex(parseInt(line[0]));
                attraction.setTaxiZone(parseInt(line[1]));
                attraction.setZoneName(parseString(line[2]));
                attraction.setAttractionPlaceId(parseString(line[3]));
                attraction.setAttractionName(parseString(line[4]));
                attraction.setAttractionLatitude(parseDouble(line[5]));
                attraction.setAttractionLongitude(parseDouble(line[6]));
                attraction.setAttractionVicinity(parseString(line[7]));
                attraction.setAttractionRating(parseDouble(line[8]));
                attraction.setUserRatingsTotal(parseDouble(line[9]));
                attraction.setAttractionPhoneNumber(parseString(line[10]));
                attraction.setAttractionWebsite(parseString(line[11]));
                attraction.setOpeningHours(parseList(line[12]));
                attraction.setPriceLevel(parseIntFromDouble(line[13]));
                attraction.setTypes(parseList(line[14]));
                attraction.setInternationalPhoneNumber(parseString(line[15]));
                attraction.setUrl(parseString(line[16]));
                attraction.setIcon(parseString(line[17]));
                attraction.setFormattedHours(parseString(line[18]));
                attraction.setCategory(parseString(line[19]));
                attraction.setDescription(parseString(line[20]));
                attraction.setPrice(parseDouble(line[21]));
                attraction.setFree(parseBoolean(line[22]));
                attraction.setPopularTimes(parseString(line[23]));
                attraction.setTimeSpent(parseString(line[24]));
                attraction.setCurrentPopularity(parseDouble(line[25]));
                attractions.add(attraction);
            }
            reader.close();
        } catch (IOException e) {
            System.err.println("Error reading CSV file: " + e.getMessage());
            e.printStackTrace();
        } catch (NumberFormatException e) {
            System.err.println("Error parsing number from CSV file: " + e.getMessage());
            e.printStackTrace();
        } catch (Exception e) {
            System.err.println("Error processing CSV file: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private int parseInt(String value) {
        try {
            return value.isEmpty() ? 0 : Integer.parseInt(value);
        } catch (NumberFormatException e) {
            System.err.println("Error parsing int from value: " + value);
            return 0;
        }
    }

    private int parseIntFromDouble(String value) {
        try {
            return value.isEmpty() ? 0 : (int) Double.parseDouble(value);
        } catch (NumberFormatException e) {
            System.err.println("Error parsing int from double value: " + value);
            return 0;
        }
    }

    private double parseDouble(String value) {
        try {
            return value.isEmpty() ? 0.0 : Double.parseDouble(value);
        } catch (NumberFormatException e) {
            System.err.println("Error parsing double from value: " + value);
            return 0.0;
        }
    }

    private String parseString(String value) {
        return value.isEmpty() ? null : value;
    }

    private List<String> parseList(String value) {
        if (value.isEmpty()) {
            return new ArrayList<>();
        }
        return List.of(value.replace("[", "").replace("]", "").split(", "));
    }

    private boolean parseBoolean(String value) {
        return value.isEmpty() ? false : Boolean.parseBoolean(value);
    }

    public List<Attraction> getAttractions() {
        return attractions;
    }

    public Attraction getAttractionByIndex(int index) {
        return attractions.stream()
                .filter(attraction -> attraction.getIndex() == index)
                .findFirst()
                .orElse(null);
    }

    public List<Attraction> filterAndSortAttractions(String name, Boolean isFree, List<String> categories, String sortBy, String order) {
        return attractions.stream()
                .filter(attraction -> (name == null || attraction.getAttractionName().toLowerCase().contains(name.toLowerCase())) &&
                        (isFree == null || attraction.isFree() == isFree) &&
                        (categories == null || categories.isEmpty() || categories.contains(attraction.getCategory())))
                .sorted(getComparator(sortBy, order))
                .collect(Collectors.toList());
    }

        private Comparator<Attraction> getComparator(String sortBy, String order) {
        Comparator<Attraction> comparator;

        if ("price".equalsIgnoreCase(sortBy)) {
            comparator = Comparator.comparingDouble(Attraction::getPrice);
            // Default : ASC order by price
            if ("desc".equalsIgnoreCase(order)) {
                comparator = comparator.reversed();
            }
        } else {
            // Default : DESC order by rating
            comparator = Comparator.comparingDouble(Attraction::getAttractionRating).reversed();
            if ("asc".equalsIgnoreCase(order)) {
                comparator = Comparator.comparingDouble(Attraction::getAttractionRating);
            }
        }

        return comparator;
    }
}

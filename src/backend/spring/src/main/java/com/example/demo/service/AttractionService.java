//package com.example.demo.service;
//
//import com.example.demo.model.Attraction;
//import com.opencsv.CSVReader;
//import org.springframework.core.io.ClassPathResource;
//import org.springframework.core.io.Resource;
//import org.springframework.stereotype.Service;
//
//import java.io.InputStream;
//import java.io.InputStreamReader;
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.Comparator;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//public class AttractionService {
//
//    private List<Attraction> attractions = new ArrayList<>();
//
//    public AttractionService() {
//        loadAttractions();
//    }
//
//    private void loadAttractions() {
//        try {
//            // ClassPathResource to load file
//            Resource resource = new ClassPathResource("attractions.csv");
//            InputStream inputStream = resource.getInputStream();
//            CSVReader reader = new CSVReader(new InputStreamReader(inputStream));
//
//            reader.readNext();
//
//            String[] line;
//            while ((line = reader.readNext()) != null) {
//                Attraction attraction = new Attraction();
//                attraction.setIndex(parseInt(line[0]));
//                attraction.setTaxiZone(parseInt(line[1]));
//                attraction.setZone_name(parseString(line[2]));
//                attraction.setAttraction_place_id(parseString(line[3]));
//                attraction.setAttraction_name(parseString(line[4]));
//                attraction.setAttraction_latitude(parseDouble(line[5]));
//                attraction.setAttraction_longitude(parseDouble(line[6]));
//                attraction.setAttraction_vicinity(parseString(line[7]));
//                attraction.setAttraction_rating(parseDouble(line[8]));
//                attraction.setUser_ratings_total(parseInt(line[9]));
//                attraction.setAttraction_phone_number(parseString(line[10]));
//                attraction.setAttractionWebsite(parseString(line[11]));
//                attraction.setOpening_hours(parseString(line[12]));
//                attraction.setPrice_level(parseIntFromDouble(line[13]));
//                attraction.setTypes(parseList(line[14]));
//                attraction.setInternational_phone_number(parseString(line[15]));
//                attraction.setUrl(parseString(line[16]));
//                attraction.setIcon(parseString(line[17]));
//                attraction.setFormatted_hours(parseString(line[18]));
//                attraction.setCategory(parseString(line[19]));
//                attraction.setDescription(parseString(line[20]));
//                attraction.setPrice(parseDouble(line[21]));
//                attraction.setFree(parseBoolean(line[22]));
//                attraction.setPopular_times(parseString(line[23]));
//                attraction.setTime_spent(parseList(line[24]));
//                attraction.setCurrent_popularity(parseDouble(line[25]));
//                attractions.add(attraction);
//            }
//            reader.close();
//        } catch (IOException e) {
//            System.err.println("Error reading CSV file: " + e.getMessage());
//            e.printStackTrace();
//        } catch (NumberFormatException e) {
//            System.err.println("Error parsing number from CSV file: " + e.getMessage());
//            e.printStackTrace();
//        } catch (Exception e) {
//            System.err.println("Error processing CSV file: " + e.getMessage());
//            e.printStackTrace();
//        }
//    }
//
//    private int parseInt(String value) {
//        try {
//            return value.isEmpty() ? 0 : Integer.parseInt(value);
//        } catch (NumberFormatException e) {
//            System.err.println("Error parsing int from value: " + value);
//            return 0;
//        }
//    }
//
//    private int parseIntFromDouble(String value) {
//        try {
//            return value.isEmpty() ? 0 : (int) Double.parseDouble(value);
//        } catch (NumberFormatException e) {
//            System.err.println("Error parsing int from double value: " + value);
//            return 0;
//        }
//    }
//
//    private double parseDouble(String value) {
//        try {
//            return value.isEmpty() ? 0.0 : Double.parseDouble(value);
//        } catch (NumberFormatException e) {
//            System.err.println("Error parsing double from value: " + value);
//            return 0.0;
//        }
//    }
//
//    private String parseString(String value) {
//        return value.isEmpty() ? null : value;
//    }
//
//    private List<String> parseList(String value) {
//        if (value.isEmpty()) {
//            return new ArrayList<>();
//        }
//        return List.of(value.replace("[", "").replace("]", "").split(", "));
//    }
//
//    private boolean parseBoolean(String value) {
//        return value.isEmpty() ? false : Boolean.parseBoolean(value);
//    }
//
//    public List<Attraction> getAttractions() {
//        return attractions;
//    }
//
//    public Attraction getAttractionByIndex(int index) {
//        return attractions.stream()
//                .filter(attraction -> attraction.getIndex() == index)
//                .findFirst()
//                .orElse(null);
//    }
//
//    public List<Attraction> filterAndSortAttractions(String name, Boolean isFree, String category, String sortBy, String order) {
//        return attractions.stream()
//                .filter(attraction -> (name == null || attraction.getAttraction_name().toLowerCase().contains(name.toLowerCase())) &&
//                        (isFree == null || attraction.isFree() == isFree) &&
//                        (category == null || category.isEmpty() || attraction.getCategory().equalsIgnoreCase(category)))
//                .sorted(getComparator(sortBy, order))
//                .collect(Collectors.toList());
//    }
//
//    private Comparator<Attraction> getComparator(String sortBy, String order) {
//        Comparator<Attraction> comparator;
//
//        if ("price".equalsIgnoreCase(sortBy)) {
//            comparator = Comparator.comparingDouble(Attraction::getPrice);
//            if ("desc".equalsIgnoreCase(order)) {
//                comparator = comparator.reversed();
//            }
//        } else {
//            comparator = Comparator.comparingDouble(Attraction::getAttraction_rating).reversed();
//            if ("asc".equalsIgnoreCase(order)) {
//                comparator = Comparator.comparingDouble(Attraction::getAttraction_rating);
//            }
//        }
//
//        return comparator;
//    }
//}

package com.example.demo.service;

import com.example.demo.model.Attraction;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
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
            Resource resource = new ClassPathResource("attractions.csv");
            InputStream inputStream = resource.getInputStream();
            CSVReader reader = new CSVReader(new InputStreamReader(inputStream));

            reader.readNext(); // Skip the header

            String[] line;
            int lineNumber = 1; // Track line number
            while ((line = reader.readNext()) != null) {
                lineNumber++;
                try {
                    Attraction attraction = new Attraction();
                    attraction.setTaxi_zone(parseInt(line[0], lineNumber, "taxiZone"));
                    attraction.setZone_name(parseString(line[1], lineNumber, "zone_name"));
                    attraction.setAttraction_place_id(parseString(line[2], lineNumber, "attraction_place_id"));
                    attraction.setIndex(parseInt(line[3], lineNumber, "index"));
                    attraction.setAttraction_name(parseString(line[4], lineNumber, "attraction_name"));
                    attraction.setCategory(parseString(line[5], lineNumber, "category"));
                    attraction.setPrice(parseDouble(line[6], lineNumber, "price"));
                    attraction.setFree(parseBoolean(line[7], lineNumber, "isFree"));
                    attraction.setDescription(parseString(line[8], lineNumber, "description"));
                    attraction.setAttraction_latitude(parseDouble(line[9], lineNumber, "attraction_latitude"));
                    attraction.setAttraction_longitude(parseDouble(line[10], lineNumber, "attraction_longitude"));
                    attraction.setAttraction_vicinity(parseString(line[11], lineNumber, "attraction_vicinity"));
                    attraction.setAttraction_rating(parseDouble(line[12], lineNumber, "attraction_rating"));
                    attraction.setUser_ratings_total(parseInt(line[13], lineNumber, "user_ratings_total"));
                    attraction.setAttraction_phone_number(parseString(line[14], lineNumber, "attraction_phone_number"));
                    attraction.setAttractionWebsite(parseString(line[15], lineNumber, "attraction_website"));
                    attraction.setOpening_hours(parseString(line[16], lineNumber, "opening_hours"));
                    attraction.setPrice_level(parseIntFromDouble(line[17], lineNumber, "price_level"));
                    attraction.setTypes(parseList(line[18], lineNumber, "types"));
                    attraction.setInternational_phone_number(parseString(line[19], lineNumber, "international_phone_number"));
                    attraction.setUrl(parseString(line[20], lineNumber, "url"));
                    attraction.setIcon(parseString(line[21], lineNumber, "icon"));
                    attraction.setFormatted_hours(parseString(line[22], lineNumber, "formatted_hours"));
                    attraction.setPopular_times(parseString(line[23], lineNumber, "popular_times"));
                    attraction.setTime_spent(parseList(line[24], lineNumber, "time_spent"));
                    attraction.setCurrent_popularity(parseDouble(line[25], lineNumber, "current_popularity"));

                    attractions.add(attraction);
                } catch (Exception e) {
                    System.err.println("Error processing line " + lineNumber + ": " + e.getMessage());
                }
            }
            reader.close();
        } catch (IOException | CsvValidationException e) {
            System.err.println("Error reading CSV file: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private int parseInt(String value, int lineNumber, String columnName) {
        try {
            return value.isEmpty() ? 0 : Integer.parseInt(value);
        } catch (NumberFormatException e) {
            System.err.println("Error parsing int from value '" + value + "' in column '" + columnName + "' at line " + lineNumber);
            return 0;
        }
    }

    private int parseIntFromDouble(String value, int lineNumber, String columnName) {
        try {
            return value.isEmpty() ? 0 : (int) Double.parseDouble(value);
        } catch (NumberFormatException e) {
            System.err.println("Error parsing int from double value '" + value + "' in column '" + columnName + "' at line " + lineNumber);
            return 0;
        }
    }

    private double parseDouble(String value, int lineNumber, String columnName) {
        try {
            return value.isEmpty() ? 0.0 : Double.parseDouble(value);
        } catch (NumberFormatException e) {
            System.err.println("Error parsing double from value '" + value + "' in column '" + columnName + "' at line " + lineNumber);
            return 0.0;
        }
    }

    private String parseString(String value, int lineNumber, String columnName) {
        return value.isEmpty() ? null : value;
    }

    private List<String> parseList(String value, int lineNumber, String columnName) {
        if (value.isEmpty()) {
            return new ArrayList<>();
        }
        return List.of(value.replace("[", "").replace("]", "").split(", "));
    }

    private boolean parseBoolean(String value, int lineNumber, String columnName) {
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

    public List<Attraction> filterAndSortAttractions(String name, Boolean isFree, String category, String sortBy, String order) {
        return attractions.stream()
                .filter(attraction -> (name == null || attraction.getAttraction_name().toLowerCase().contains(name.toLowerCase())) &&
                        (isFree == null || attraction.isFree() == isFree) &&
                        (category == null || category.isEmpty() || attraction.getCategory().equalsIgnoreCase(category)))
                .sorted(getComparator(sortBy, order))
                .collect(Collectors.toList());
    }

    private Comparator<Attraction> getComparator(String sortBy, String order) {
        Comparator<Attraction> comparator;

        if ("price".equalsIgnoreCase(sortBy)) {
            comparator = Comparator.comparingDouble(Attraction::getPrice);
            if ("desc".equalsIgnoreCase(order)) {
                comparator = comparator.reversed();
            }
        } else if ("user_ratings_total".equalsIgnoreCase(sortBy)) {
            comparator = Comparator.comparingDouble(Attraction::getUser_ratings_total).reversed();
            if ("asc".equalsIgnoreCase(order)) {
                comparator = Comparator.comparingDouble(Attraction::getUser_ratings_total);
            }
        } else {
            comparator = Comparator.comparingDouble(Attraction::getAttraction_rating).reversed();
            if ("asc".equalsIgnoreCase(order)) {
                comparator = Comparator.comparingDouble(Attraction::getAttraction_rating);
            }
        }

        return comparator;
    }
}
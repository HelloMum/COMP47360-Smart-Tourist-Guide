package com.example.demo.service;

import com.example.demo.model.Attraction;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
public class AttractionCsvReader {

    public List<Attraction> readCsvFile(String fileName) {
        List<Attraction> attractions = new ArrayList<>();
        try {
            Resource resource = new ClassPathResource(fileName);
            InputStream inputStream = resource.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
            String line;
            // Skip the header if exists
            reader.readLine();
            while ((line = reader.readLine()) != null) {
                String[] values = line.split(",");
                Attraction attraction = new Attraction();
                attraction.setId(getValueOrNull(values, 0));
                attraction.setName(getValueOrNull(values, 1));
                attraction.setLat(parseDoubleOrNull(values, 2));
                attraction.setLon(parseDoubleOrNull(values, 3));
                attraction.setTourism(getValueOrNull(values, 4));
                attraction.setAddrCity(getValueOrNull(values, 5));
                attraction.setAddrPostcode(getValueOrNull(values, 6));
                attraction.setAddrState(getValueOrNull(values, 7));
                attraction.setAddrStreet(getValueOrNull(values, 8));
                attraction.setWebsite(getValueOrNull(values, 9));
                attraction.setOpeningHours(getValueOrNull(values, 10));
                attraction.setPhone(getValueOrNull(values, 11));
                attraction.setEmail(getValueOrNull(values, 12));
                attraction.setWheelchair(getValueOrNull(values, 13));
                attraction.setEle(parseDoubleOrNull(values, 14));
                attraction.setSource(getValueOrNull(values, 15));
                attraction.setWikidata(getValueOrNull(values, 16));
                attraction.setWikipedia(getValueOrNull(values, 17));
                attractions.add(attraction);
            }
            reader.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return attractions;
    }

    private Double parseDoubleOrNull(String[] values, int index) {
        try {
            return values.length > index && !values[index].trim().isEmpty() ? Double.parseDouble(values[index]) : null;
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private String getValueOrNull(String[] values, int index) {
        return values.length > index && !values[index].trim().isEmpty() ? values[index] : null;
    }
}

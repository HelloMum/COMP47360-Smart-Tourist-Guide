package com.example.demo.service;

import com.example.demo.model.EventData;
import com.example.demo.repository.EventRepository;
import com.example.demo.scrapers.EventScraper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class EventService {

    @Autowired
    private EventScraper eventScraper;

    @Autowired
    private EventRepository eventRepository;

    @Value("${yelp.limit}")
    private int limit;

    private LocalDateTime lastFetchTime = LocalDateTime.now();
    private int offset = 0;

    private static final double[][] ManhattanArea = {
            {-74.01767684712082, 40.69944848925064},
            {-73.97284612871574, 40.710877117448234},
            {-73.96286267239459, 40.75181798800992},
            {-73.93623847314616, 40.780435186864736},
            {-73.93694092134969, 40.78831518435655},
            {-73.92762697470815, 40.79675513156707},
            {-73.93369487060599, 40.81075087313991},
            {-73.93426644999563, 40.835494616341066},
            {-73.92015667469288, 40.858127698689714},
            {-73.90929920179866, 40.870808300256954},
            {-73.91155805341965, 40.87390994687627},
            {-73.9283482868783, 40.878820316228854},
            {-74.0236972184584, 40.7246353282834},
            {-74.01767684712082, 40.69944848925064}
    };

    // Determine whether a point is inside Manhattan
    private boolean isPointInPolygon(double latitude, double longitude, double[][] polygon) {
        int intersectCount = 0;
        for (int i = 0; i < polygon.length - 1; i++) {
            double[] p1 = polygon[i];
            double[] p2 = polygon[i + 1];
            if ((p1[1] > latitude) != (p2[1] > latitude)) {
                double x = (latitude - p1[1]) * (p2[0] - p1[0]) / (p2[1] - p1[1]) + p1[0];
                if (x > longitude) {
                    intersectCount++;
                }
            }
        }
        return (intersectCount % 2) == 1;
    }

    @Scheduled(fixedRate = 10800000)
    public void fetchAndSaveEvents() {
        long startDate = lastFetchTime.toEpochSecond(ZoneOffset.UTC);
        List<EventData> events = eventScraper.fetchYelpEvents(offset, startDate);
        if (events != null && !events.isEmpty()) {
            List<EventData> newEvents = events.stream()
                    .filter(event -> !eventRepository.existsByNameAndLatitudeAndLongitude(event.getName(), event.getLatitude(), event.getLongitude()))
                    .filter(event -> !event.getIs_canceled())
                    .filter(event -> {
                        LocalDateTime timeStart = LocalDateTime.parse(event.getTime_start(), DateTimeFormatter.ISO_DATE_TIME);
                        return timeStart.isBefore(LocalDateTime.now().plusDays(30));
                    })
                    .filter(event -> isPointInPolygon(event.getLatitude(), event.getLongitude(), ManhattanArea))
                    .collect(Collectors.toList());

            newEvents.forEach(event -> {
                event.setId(UUID.randomUUID());
                event.setFetchTime(LocalDateTime.now());
            });
            eventRepository.saveAll(newEvents);

            offset += events.size();
            if (events.size() < limit) {
                offset = 0;
                lastFetchTime = LocalDateTime.now();
            }
        }
        deleteUselessEvents();
    }

    public void deleteUselessEvents() {
        List<EventData> allEvents = eventRepository.findAll();
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

        List<EventData> uselessEvents = allEvents.stream()
                .filter(event -> event.getIs_canceled())
                .filter(event -> {
                    try {
                        LocalDateTime timeStart = LocalDateTime.parse(event.getTime_start(), formatter);
                        return timeStart.isAfter(now.plusDays(30));
                    } catch (Exception e) {
                        return false;
                    }
                })
                .filter(event -> {
                    try {
                        LocalDateTime timeEnd = LocalDateTime.parse(event.getTime_end(), formatter);
                        return timeEnd.isBefore(now);
                    } catch (Exception e) {
                        return true;
                    }
                })
                .filter(event -> !isPointInPolygon(event.getLatitude(), event.getLongitude(), ManhattanArea))
                .collect(Collectors.toList());

        eventRepository.deleteAll(uselessEvents);
    }

    public List<EventData> getAllEvents() {
        return eventRepository.findAll();
    }
}


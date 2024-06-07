package com.example.demo.service;

import com.example.demo.model.EventData;
import com.example.demo.repository.EventRepository;
import com.example.demo.scrapers.EventScraper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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

    // 从Scraper获取事件并保存
    @Scheduled(fixedRate = 3600000) // 每小时执行一次
    public void fetchAndSaveEvents() {
        List<EventData> events = eventScraper.fetchYelpEvents();
        if (events != null && !events.isEmpty()) {
            List<EventData> newEvents = events.stream()
                    .filter(event -> !eventRepository.existsByNameAndLatitudeAndLongitude(event.getName(), event.getLatitude(), event.getLongitude()))
                    .collect(Collectors.toList());

            newEvents.forEach(event -> {
                event.setId(UUID.randomUUID());
                event.setFetchTime(LocalDateTime.now());
            });
            eventRepository.saveAll(newEvents);
        }
        deleteExpiredEvents();
    }

    // 删除已过期的事件
    public void deleteExpiredEvents() {
        List<EventData> allEvents = eventRepository.findAll();
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

        List<EventData> expiredEvents = allEvents.stream()
                .filter(event -> {
                    try {
                        LocalDateTime endTime = LocalDateTime.parse(event.getTime_end(), formatter);
                        return endTime.isBefore(now);
                    } catch (Exception e) {
                        return false;
                    }
                })
                .collect(Collectors.toList());

        eventRepository.deleteAll(expiredEvents);
    }

    // 获取所有事件
    public List<EventData> getAllEvents() {
        return eventRepository.findAll();
    }
}

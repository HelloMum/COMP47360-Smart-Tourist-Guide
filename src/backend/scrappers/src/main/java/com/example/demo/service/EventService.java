package com.example.demo.service;

import com.example.demo.model.EventData;
import com.example.demo.repository.EventRepository;
import com.example.demo.scrapers.EventScraper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneId;
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

    private static final double[][] ManhattanArea = {
            {-74.4900261866312, 40.68686056618563},
            {-74.02247557630322, 40.68060952571861},
            {-74.00673931790989, 40.69061065576909},
            {-74.00158758353581, 40.70353031583642},
            {-73.9742063962419, 40.709181659436126},
            {-73.96306764293499, 40.751602379032676},
            {-73.9381111465915, 40.77824950423954},
            {-73.93571826054003, 40.781756164126875},
            {-73.93835978383461, 40.78482868075099},
            {-73.93197657063641, 40.791936029479984},
            {-73.92872339624913, 40.79449340657828},
            {-73.92810629188814, 40.80216517440272},
            {-73.93381326053665, 40.80916985685798},
            {-73.9329464094588, 40.81800623927862},
            {-73.93445994426258, 40.834713196012274},
            {-73.92834261566213, 40.84628029333956},
            {-73.92006444104246, 40.85808855226034},
            {-73.91165332965423, 40.86651028933875},
            {-73.9095237173859, 40.87232949008461},
            {-73.91295888114882, 40.87465683738827},
            {-73.91793162880116, 40.87546532210828},
            {-73.92124698194723, 40.8763637510383},
            {-73.92318565996821, 40.87815766160858},
            {-73.9291707921706, 40.8787628614993},
            {-73.95417515817823, 40.85108001891453},
            {-74.01551813710326, 40.75627158256748},
            {-74.03478207315514, 40.70272068669027},
            {-74.04416204237901, 40.70052281665727},
            {-74.04903271144373, 40.68685333783202}
    };

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
    @Transactional
    public void fetchAndSaveEvents() {
        // Retry mechanism to handle potential concurrency issues
        int retryCount = 0;
        boolean success = false;

        while (retryCount < 3 && !success) {
            try {
                // Delete all the data
                eventRepository.deleteAllInBatch();

                // Fetch the new data
                ZoneId newYorkZone = ZoneId.of("America/New_York");
                LocalDateTime nowInNewYork = LocalDateTime.now(newYorkZone);
                long startDate = nowInNewYork.toEpochSecond(ZoneOffset.UTC);
                long endDate = nowInNewYork.plusDays(30).toEpochSecond(ZoneOffset.UTC);
                List<EventData> events = eventScraper.fetchYelpEvents(0, startDate, endDate);

                if (events != null && !events.isEmpty()) {
                    List<EventData> newEvents = events.stream()
                            .filter(event -> !event.getIs_canceled())
                            .filter(event -> event.getName() != null && !event.getName().isEmpty())
                            .filter(event -> event.getEvent_site_url() != null && !event.getEvent_site_url().isEmpty())
                            .filter(event -> event.getImage_url() != null && !event.getImage_url().isEmpty())
                            .filter(event -> {
                                LocalDateTime timeStart = convertToLocalDateTime(event.getTime_start());
                                LocalDateTime timeEnd = event.getTime_end() != null ?
                                        convertToLocalDateTime(event.getTime_end()) :
                                        timeStart.plusHours(2);
                                if (!timeStart.toLocalDate().equals(timeEnd.toLocalDate())) {
                                    if (timeStart.plusHours(2).isAfter(timeStart.toLocalDate().atTime(23, 59))) {
                                        timeEnd = timeStart.toLocalDate().atTime(23, 59);
                                    } else {
                                        timeEnd = timeStart.plusHours(2);
                                    }
                                }
                                return timeStart.isAfter(nowInNewYork) &&
                                        timeStart.isBefore(nowInNewYork.plusDays(30)) &&
                                        timeEnd.isBefore(nowInNewYork.plusDays(30));
                            })
                            .filter(event -> isPointInPolygon(event.getLatitude(), event.getLongitude(), ManhattanArea))
                            .collect(Collectors.toList());

                    // Skip the duplicate events
                    for (EventData event : newEvents) {
                        boolean exists = eventRepository.existsEventByNameOrUrl(
                                event.getName(), event.getEvent_site_url(), event.getImage_url()
                        );

                        if (!exists) {
                            event.setId(UUID.randomUUID());
                            event.setFetchTime(LocalDateTime.now());
                            LocalDateTime timeStart = convertToLocalDateTime(event.getTime_start());
                            LocalDateTime timeEnd = event.getTime_end() != null ?
                                    convertToLocalDateTime(event.getTime_end()) :
                                    timeStart.plusHours(2);
                            if (!timeStart.toLocalDate().equals(timeEnd.toLocalDate())) {
                                if (timeStart.plusHours(2).isAfter(timeStart.toLocalDate().atTime(23, 59))) {
                                    timeEnd = timeStart.toLocalDate().atTime(23, 59);
                                } else {
                                    timeEnd = timeStart.plusHours(2);
                                }
                            }
                            event.setTime_start(formatLocalDateTime(timeStart));
                            event.setTime_end(formatLocalDateTime(timeEnd));
                            eventRepository.save(event);
                        }
                    }
                }
                success = true;
            } catch (Exception e) {
                retryCount++;
                if (retryCount >= 3) {
                    throw e; // Rethrow the exception if maximum retry count is reached
                }
            }
        }
    }

    private LocalDateTime convertToLocalDateTime(String dateTimeWithOffset) {
        OffsetDateTime offsetDateTime = OffsetDateTime.parse(dateTimeWithOffset, DateTimeFormatter.ISO_OFFSET_DATE_TIME);
        return offsetDateTime.atZoneSameInstant(ZoneId.of("America/New_York")).toLocalDateTime();
    }

    private String formatLocalDateTime(LocalDateTime localDateTime) {
        return localDateTime.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
    }

    public List<EventData> getAllEvents() {
        return eventRepository.findAll();
    }
}
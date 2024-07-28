package com.example.demo.repository;

import com.example.demo.model.Event;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@DataJpaTest
public class EventRepositoryTest {

    @Autowired
    private EventRepository repository;

    private Event createTestEvent(UUID id, String name, Boolean isFree, String category, String combinedCategory,
                                  LocalDateTime timeStart, LocalDateTime timeEnd) {
        Event event = new Event();
        event.setId(id);
        event.setName(name);
        event.setIs_free(isFree);
        event.setCategory(category);
        event.setCombined_category(combinedCategory);
        event.setTime_start(timeStart.toString());
        event.setTime_end(timeEnd.toString());
        event.setLatitude(40.77278620000001);
        event.setLongitude(-73.983104);
        event.setDescription("BAAND Together Dance Festival Dance Workshop With American Ballet Theatre - Thursday, August 01, 2024 at 5:00 pm - LeFrak Lobby, David Geffen Hall\n\nJoin...");
        event.setEvent_site_url("https://www.yelp.com/events/new-york-baand-together-dance-festival-dance-workshop-with-american-ballet-theatre-2?adjust_creative=L_ZMOhSyovpnXCXbbl1pCw&utm_campaign=yelp_api_v3&utm_medium=api_v3_event_search&utm_source=L_ZMOhSyovpnXCXbbl1pCw");
        event.setImage_url("https://s3-media4.fl.yelpcdn.com/ephoto/tyBget5rpvSPcE8lg5hA_Q/o.jpg");
        event.setAttending_count(1);
        event.setInterested_count(0);
        event.setIs_canceled(false);
        event.setIs_official(false);
        event.setFetchTime(LocalDateTime.now());
        event.setAddress("10 Lincoln Center Plaza, New York, NY 10023");
        event.setCity("New York");
        event.setState("NY");
        event.setZip_code("10023");
        return event;
    }

    @BeforeEach
    public void setUp() {
        repository.deleteAll();
        repository.save(createTestEvent(UUID.randomUUID(), "BAAND Together Dance Festival Dance Workshop With American Ballet Theatre", true, "performing-arts", "Art & Fashion",
                LocalDateTime.of(2024, 8, 1, 17, 0), LocalDateTime.of(2024, 8, 1, 19, 0)));
        repository.save(createTestEvent(UUID.randomUUID(), "Paid Art Exhibition", false, "Art", "Art,Exhibition",
                LocalDateTime.of(2024, 7, 21, 14, 0), LocalDateTime.of(2024, 7, 21, 16, 0)));
    }

    @Test
    public void testFindAll() {
        List<Event> events = repository.findAll();
        assertThat(events).hasSize(2);
    }

    @Test
    public void testFindById() {
        Event event = createTestEvent(UUID.randomUUID(), "Specific Event", true, "General", "General,Event",
                LocalDateTime.of(2024, 7, 22, 10, 0), LocalDateTime.of(2024, 7, 22, 12, 0));
        repository.save(event);

        Optional<Event> foundEvent = repository.findById(event.getId());
        assertThat(foundEvent).isPresent();
        assertThat(foundEvent.get().getName()).isEqualTo("Specific Event");
    }

    @Test
    public void testFindFilteredEventsWithoutDateRange() {
        List<Event> events = repository.findFilteredEventsWithoutDateRange(true, Arrays.asList("Art & Fashion"), "BAAND Together Dance Festival Dance Workshop With American Ballet Theatre");
        assertThat(events).hasSize(1);
        assertThat(events.get(0).getName()).isEqualTo("BAAND Together Dance Festival Dance Workshop With American Ballet Theatre");
    }

    @Test
    public void testFindFilteredEventsWithinDateRange() {
        List<Event> events = repository.findFilteredEventsWithinDateRange(
                "2024-07-20T00:00:00", "2024-08-02T23:59:59", null, Arrays.asList("Art & Fashion", "Art,Exhibition"), null);
        assertThat(events).hasSize(2);
    }
}
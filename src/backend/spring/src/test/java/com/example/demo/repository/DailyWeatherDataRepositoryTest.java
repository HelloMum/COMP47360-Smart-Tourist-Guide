package com.example.demo.repository;

import com.example.demo.model.DailyForecastData;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@DataJpaTest
public class DailyWeatherDataRepositoryTest {

    @Autowired
    private DailyWeatherDataRepository repository;

    @BeforeEach
    public void setUp() {
        repository.deleteAll();
        repository.save(createTestForecastData(1721404800L)); // 2024-07-20
        repository.save(createTestForecastData(1721491200L)); // 2024-07-21
        repository.save(createTestForecastData(1721577600L)); // 2024-07-22
    }

    private DailyForecastData createTestForecastData(long dt) {
        DailyForecastData data = new DailyForecastData();
        data.setId(UUID.randomUUID());
        data.setFetch_time(Timestamp.from(Instant.ofEpochSecond(dt)));
        data.setDt(dt);
        data.setTempDay(15.0);
        data.setRain(0.0);
        data.setSnow(0.0);
        data.setSpeed(5.0);
        data.setHumidity(60.0);
        data.setPressure(1013.0);
        data.setWeather_description("Sunny");
        data.setWeather_icon("01d");
        data.setWeather_main("Clear");
        return data;
    }

    @Test
    public void testFindForecastByDt() {
        List<DailyForecastData> results = repository.findForecastByDt(1721404800L);
        assertThat(results).hasSize(1);
        assertThat(results.get(0).getWeather_description()).isEqualTo("Sunny");
    }

    @Test
    public void testFindLatestForecast() {
        List<DailyForecastData> results = repository.findLatestForecast(PageRequest.of(0, 1));
        assertThat(results).hasSize(1);
        assertThat(results.get(0).getDt()).isEqualTo(1721404800L);
    }

    @Test
    public void testFindForecastsByDateRange() {
        List<DailyForecastData> results = repository.findForecastsByDateRange(1721404800L, 1721577600L);
        assertThat(results).hasSize(3);
        assertThat(results.get(0).getDt()).isEqualTo(1721404800L);
        assertThat(results.get(1).getDt()).isEqualTo(1721491200L);
        assertThat(results.get(2).getDt()).isEqualTo(1721577600L);
    }
}
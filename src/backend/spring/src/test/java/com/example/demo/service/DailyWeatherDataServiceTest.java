package com.example.demo.service;

import com.example.demo.model.DailyForecastData;
import com.example.demo.repository.DailyWeatherDataRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.PageRequest;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

class DailyWeatherDataServiceTest {

    @InjectMocks
    private DailyWeatherDataService dailyWeatherDataService;

    @Mock
    private DailyWeatherDataRepository dailyWeatherDataRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetLatestForecast() {
        // Arrange
        DailyForecastData forecastData = createSampleForecastData();
        when(dailyWeatherDataRepository.findLatestForecast(PageRequest.of(0, 30))).thenReturn(List.of(forecastData));

        // Act
        List<DailyForecastData> result = dailyWeatherDataService.getLatestForecast();

        // Assert
        assertThat(result).hasSize(1);
        assertThat(result.get(0)).isEqualTo(forecastData);
    }

    @Test
    void testGetForecastByDate() {
        // Arrange
        LocalDate date = LocalDate.of(2024, 7, 20);
        ZonedDateTime startOfDayET = date.atStartOfDay(ZoneId.of("America/New_York")).plusHours(12);
        long targetDt = startOfDayET.toEpochSecond();

        DailyForecastData forecastData = createSampleForecastData();
        forecastData.setDt(targetDt);

        when(dailyWeatherDataRepository.findForecastByDt(targetDt)).thenReturn(List.of(forecastData));

        // Act
        List<DailyForecastData> result = dailyWeatherDataService.getForecastByDate(date);

        // Assert
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getDt()).isEqualTo(targetDt);
    }

    @Test
    void testGetForecastByDateRange() {
        // Arrange
        LocalDate startDate = LocalDate.of(2024, 7, 20);
        LocalDate endDate = LocalDate.of(2024, 7, 22);

        ZonedDateTime startOfDayET = startDate.atStartOfDay(ZoneId.of("America/New_York")).plusHours(12);
        ZonedDateTime endOfDayET = endDate.atStartOfDay(ZoneId.of("America/New_York")).plusHours(12);

        long startEpochSecond = startOfDayET.toEpochSecond();
        long endEpochSecond = endOfDayET.toEpochSecond();

        DailyForecastData forecastData1 = createSampleForecastData();
        forecastData1.setDt(startEpochSecond);

        DailyForecastData forecastData2 = createSampleForecastData();
        forecastData2.setDt(endEpochSecond);

        when(dailyWeatherDataRepository.findForecastsByDateRange(startEpochSecond, endEpochSecond))
                .thenReturn(List.of(forecastData1, forecastData2));

        // Act
        List<DailyForecastData> result = dailyWeatherDataService.getForecastByDateRange(startDate, endDate);

        // Assert
        assertThat(result).hasSize(2);
        assertThat(result.get(0).getDt()).isEqualTo(startEpochSecond);
        assertThat(result.get(1).getDt()).isEqualTo(endEpochSecond);
    }

    private DailyForecastData createSampleForecastData() {
        DailyForecastData data = new DailyForecastData();
        data.setId(UUID.randomUUID());
        data.setFetch_time(null);
        data.setDt(0);
        data.setTempDay(273.15 + 20); // 20°C
        data.setSnow(0);
        data.setSpeed(1); // 1 m/s
        data.setHumidity(50);
        data.setPressure(1013);
        data.setWeather_description("clear sky");
        data.setWeather_icon("01d");
        data.setWeather_main("Clear");
        return data;
    }
}
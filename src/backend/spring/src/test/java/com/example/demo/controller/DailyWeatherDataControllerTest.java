package com.example.demo.controller;

import com.example.demo.model.DailyForecastData;
import com.example.demo.service.DailyWeatherDataService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(DailyWeatherDataController.class)
public class DailyWeatherDataControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DailyWeatherDataService dailyWeatherDataService;

    private DailyForecastData createTestForecastData(LocalDate date) {
        DailyForecastData data = new DailyForecastData();
        data.setId(UUID.randomUUID());
        data.setFetch_time(Timestamp.valueOf(date.atStartOfDay()));
        data.setDt(date.atStartOfDay(ZoneId.of("America/New_York")).toEpochSecond());
        data.setTempDay(15.0);
        data.setRain(0.0);
        data.setSnow(0.0);
        data.setSpeed(5.0);
        data.setHumidity(60.0);
        data.setPressure(1013.0);
        data.setWeather_description("Sunny");
        data.setWeather_icon("01d");
        data.setWeather_main("Clear");
        data.convertDtToDate();
        return data;
    }

    @Test
    public void testGetForecastByDateRange() throws Exception {
        DailyForecastData data1 = createTestForecastData(LocalDate.of(2024, 8, 1));
        DailyForecastData data2 = createTestForecastData(LocalDate.of(2024, 8, 2));

        List<DailyForecastData> forecastList = Arrays.asList(data1, data2);

        LocalDate startDate = LocalDate.of(2024, 8, 1);
        LocalDate endDate = LocalDate.of(2024, 8, 2);

        BDDMockito.given(dailyWeatherDataService.getForecastByDateRange(startDate, endDate)).willReturn(forecastList);

        mockMvc.perform(get("/weather/by_date_range/2024-08-01/2024-08-02"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].date", is("2024-08-01")))
                .andExpect(jsonPath("$[0].tempDay", is(15.0)))
                .andExpect(jsonPath("$[0].weather_description", is("Sunny")))
                .andExpect(jsonPath("$[1].date", is("2024-08-02")))
                .andExpect(jsonPath("$[1].tempDay", is(15.0)))
                .andExpect(jsonPath("$[1].weather_description", is("Sunny")));
    }
}
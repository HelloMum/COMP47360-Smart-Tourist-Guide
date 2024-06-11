package com.example.demo.service;

import com.example.demo.model.DailyForecastData;
import com.example.demo.repository.DailyWeatherDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class DailyWeatherDataService {

    @Autowired
    private DailyWeatherDataRepository repository;

    public List<DailyForecastData> getLatestForecast() {
        List<UUID> latestIdList = repository.findLatestId(PageRequest.of(0, 1));
        UUID latestId = latestIdList.isEmpty() ? null : latestIdList.get(0);
        return repository.findForecastByWeatherDataId(latestId);
    }

    public List<DailyForecastData> getForecastByDate(LocalDate date) {
        List<UUID> latestIdList = repository.findLatestId(PageRequest.of(0, 1));
        UUID latestId = latestIdList.isEmpty() ? null : latestIdList.get(0);
        List<DailyForecastData> latestForecasts = repository.findForecastByWeatherDataId(latestId);

        ZonedDateTime startOfDayET = date.atStartOfDay(ZoneId.of("America/New_York")).plusHours(12);
        long targetDt = startOfDayET.toEpochSecond();

        return latestForecasts.stream()
                .filter(forecast -> forecast.getDt() == targetDt)
                .collect(Collectors.toList());
    }

}

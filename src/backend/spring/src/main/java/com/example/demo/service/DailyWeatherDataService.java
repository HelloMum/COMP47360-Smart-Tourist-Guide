package com.example.demo.service;

import com.example.demo.model.DailyForecastData;
import com.example.demo.repository.DailyWeatherDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DailyWeatherDataService {

    @Autowired
    private DailyWeatherDataRepository repository;

    private static final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public List<DailyForecastData> getLatestForecast() {
        return repository.findLatestForecast(PageRequest.of(0, 30));
    }

    public List<DailyForecastData> getForecastByDate(LocalDate date) {
        // Convert the given date to the start of the day in New York time and add 12 hours to match the target timestamp
        ZonedDateTime startOfDayET = date.atStartOfDay(ZoneId.of("America/New_York")).plusHours(12);
        long targetDt = startOfDayET.toEpochSecond();

        return repository.findForecastByDt(targetDt).stream()
                .map(this::convertUnits)
                .collect(Collectors.toList());
    }

    public List<DailyForecastData> getForecastByDateRange(LocalDate startDate, LocalDate endDate) {
        // Ensure that endDate is exclusive by adding one day at the beginning of the day
        ZonedDateTime startOfDayET = startDate.atStartOfDay(ZoneId.of("America/New_York")).plusHours(12);
        ZonedDateTime endOfDayET = endDate.atStartOfDay(ZoneId.of("America/New_York")).plusHours(12);

        long startEpochSecond = startOfDayET.toEpochSecond();
        long endEpochSecond = endOfDayET.toEpochSecond();

        List<DailyForecastData> forecasts = repository.findForecastsByDateRange(startEpochSecond, endEpochSecond);
        return forecasts.stream()
                .map(this::convertUnits)
                .sorted(Comparator.comparing(DailyForecastData::getDt))
                .collect(Collectors.toList());
    }

    private DailyForecastData convertUnits(DailyForecastData data) {
        // Convert temperature from Kelvin to Celsius and format to 4 decimal places
        data.setTempDay(formatToFourDecimalPlaces(data.getTempDay() - 273.15));
        // Convert snow from millimeters to centimeters and format to 4 decimal places
        data.setSnow(formatToFourDecimalPlaces(data.getSnow() / 10));
        // Convert speed from meters/second to kilometers/hour and format to 4 decimal places
        data.setSpeed(formatToFourDecimalPlaces(data.getSpeed() * 3.6));
        data.convertDtToDate();
        return data;
    }

    private double formatToFourDecimalPlaces(double value) {
        return Math.round(value * 10000.0) / 10000.0;
    }
}
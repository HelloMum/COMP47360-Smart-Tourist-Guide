package com.example.demo.service;

import com.example.demo.model.DailyWeatherForecastData;
import com.example.demo.repository.DailyWeatherForecastRepository;
import com.example.demo.scrapers.DailyWeatherForecastScraper;
import com.example.demo.scrapers.DailyWeatherForecastScraper.WeatherDataRaw;
import com.example.demo.scrapers.DailyWeatherForecastScraper.DailyForecastDataRaw;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class DailyWeatherForecastService {

    private final DailyWeatherForecastRepository dailyWeatherForecastRepository;
    private final DailyWeatherForecastScraper dailyWeatherForecastScraper;

    @Autowired
    public DailyWeatherForecastService(DailyWeatherForecastRepository dailyWeatherForecastRepository,
                                       DailyWeatherForecastScraper dailyWeatherForecastScraper) {
        this.dailyWeatherForecastRepository = dailyWeatherForecastRepository;
        this.dailyWeatherForecastScraper = dailyWeatherForecastScraper;
    }

    @Scheduled(fixedRate = 3600000)
    public void updateDailyWeather() {
        WeatherDataRaw weatherDataRaw = dailyWeatherForecastScraper.fetchWeatherData();

        if (weatherDataRaw != null && weatherDataRaw.getList() != null && !weatherDataRaw.getList().isEmpty()) {
            // Delete old data
            dailyWeatherForecastRepository.deleteAll();

            // Save latest weather forecast
            List<DailyWeatherForecastData> dailyForecasts = weatherDataRaw.getList().stream()
                    .map(this::convertToDailyForecastData)
                    .collect(Collectors.toList());

            dailyWeatherForecastRepository.saveAll(dailyForecasts);
        }
    }

    private DailyWeatherForecastData convertToDailyForecastData(DailyForecastDataRaw raw) {
        DailyWeatherForecastData data = new DailyWeatherForecastData();
        data.setId(UUID.randomUUID());
        data.setFetchTime(LocalDateTime.now());
        data.setDt(raw.getDt());
        data.setSunrise(raw.getSunrise());
        data.setSunset(raw.getSunset());
        data.setPressure(raw.getPressure());
        data.setHumidity(raw.getHumidity());
        data.setClouds(raw.getClouds());
        data.setRain(raw.getRain());
        data.setSnow(raw.getSnow());
        data.setWindSpeed(raw.getSpeed());
        data.setWindDeg(raw.getDeg());
        data.setTemp(raw.getTemp());
        data.setFeels_like(raw.getFeels_like());
        if (raw.getWeather() != null && !raw.getWeather().isEmpty()) {
            DailyWeatherForecastData.Weather weather = raw.getWeather().get(0);
            data.setWeather(weather);
        }
        return data;
    }

    public List<DailyWeatherForecastData> getDailyForecasts() {
        return dailyWeatherForecastRepository.findAll();
    }
}
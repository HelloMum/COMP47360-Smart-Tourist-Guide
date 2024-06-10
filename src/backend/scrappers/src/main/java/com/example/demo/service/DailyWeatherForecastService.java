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
    public DailyWeatherForecastData getDailyWeather() {
        WeatherDataRaw weatherDataRaw = dailyWeatherForecastScraper.fetchWeatherData();

        if (weatherDataRaw != null && weatherDataRaw.getList() != null && !weatherDataRaw.getList().isEmpty()) {
            DailyWeatherForecastData weatherData = new DailyWeatherForecastData();
            weatherData.setId(UUID.randomUUID());
            weatherData.setCode(weatherDataRaw.getCode());
            weatherData.setMessage(weatherDataRaw.getMessage());
            weatherData.setCnt(weatherDataRaw.getCnt());
            weatherData.setCity(weatherDataRaw.getCity());
            weatherData.setFetchTime(LocalDateTime.now());

            List<DailyWeatherForecastData.DailyForecastData> dailyForecasts = weatherDataRaw.getList().stream()
                    .map(this::convertToDailyForecastData)
                    .collect(Collectors.toList());

            for (DailyWeatherForecastData.DailyForecastData dailyForecast : dailyForecasts) {
                dailyForecast.setDailyWeatherForecastData(weatherData);
            }
            weatherData.setList(dailyForecasts);

            dailyWeatherForecastRepository.save(weatherData);
            return weatherData;
        }
        return null;
    }

    private DailyWeatherForecastData.DailyForecastData convertToDailyForecastData(DailyForecastDataRaw raw) {
        DailyWeatherForecastData.DailyForecastData data = new DailyWeatherForecastData.DailyForecastData();
        data.setId(UUID.randomUUID());
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
}

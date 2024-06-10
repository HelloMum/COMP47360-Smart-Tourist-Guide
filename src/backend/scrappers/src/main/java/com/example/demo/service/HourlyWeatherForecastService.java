package com.example.demo.service;

import com.example.demo.model.HourlyWeatherForecastData;
import com.example.demo.repository.HourlyWeatherForecastRepository;
import com.example.demo.scrapers.HourlyWeatherForecastScraper;
import com.example.demo.scrapers.HourlyWeatherForecastScraper.WeatherDataRaw;
import com.example.demo.scrapers.HourlyWeatherForecastScraper.HourlyForecastDataRaw;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class HourlyWeatherForecastService {

    private final HourlyWeatherForecastRepository hourlyWeatherForecastRepository;
    private final HourlyWeatherForecastScraper hourlyWeatherForecastScraper;

    @Autowired
    public HourlyWeatherForecastService(HourlyWeatherForecastRepository hourlyWeatherForecastRepository,
                                        HourlyWeatherForecastScraper hourlyWeatherForecastScraper) {
        this.hourlyWeatherForecastRepository = hourlyWeatherForecastRepository;
        this.hourlyWeatherForecastScraper = hourlyWeatherForecastScraper;
    }

    @Scheduled(fixedRate = 3600000)
    public HourlyWeatherForecastData getHourlyWeather() {
        WeatherDataRaw weatherDataRaw = hourlyWeatherForecastScraper.fetchWeatherData();

        if (weatherDataRaw != null && weatherDataRaw.getList() != null && !weatherDataRaw.getList().isEmpty()) {
            HourlyWeatherForecastData weatherData = new HourlyWeatherForecastData();
            weatherData.setId(UUID.randomUUID());
            weatherData.setCod(weatherDataRaw.getCod());
            weatherData.setMessage(weatherDataRaw.getMessage());
            weatherData.setCnt(weatherDataRaw.getCnt());
            weatherData.setCity(weatherDataRaw.getCity());
            weatherData.setFetchTime(LocalDateTime.now());

            List<HourlyWeatherForecastData.HourlyForecastData> hourlyForecasts = weatherDataRaw.getList().stream()
                    .map(this::convertToHourlyForecastData)
                    .collect(Collectors.toList());

            for (HourlyWeatherForecastData.HourlyForecastData hourlyForecast : hourlyForecasts) {
                hourlyForecast.setHourlyWeatherForecastData(weatherData);
            }
            weatherData.setList(hourlyForecasts);

            hourlyWeatherForecastRepository.save(weatherData);
            return weatherData;
        }
        return null;
    }

    private HourlyWeatherForecastData.HourlyForecastData convertToHourlyForecastData(HourlyForecastDataRaw raw) {
        HourlyWeatherForecastData.HourlyForecastData data = new HourlyWeatherForecastData.HourlyForecastData();
        data.setId(UUID.randomUUID());
        data.setDt(raw.getDt());
        data.setVisibility(raw.getVisibility());
        data.setPop(raw.getPop());
        data.setDt_txt(raw.getDt_txt());
        data.setMain(raw.getMain());
        data.setClouds(raw.getClouds());
        data.setWind(raw.getWind());
        data.setRain(raw.getRain());
        data.setSnow(raw.getSnow());
        data.setSys(raw.getSys());
        if (raw.getWeather() != null && !raw.getWeather().isEmpty()) {
            HourlyWeatherForecastData.Weather weather = raw.getWeather().get(0);
            data.setWeather(weather);
        }
        return data;
    }
}

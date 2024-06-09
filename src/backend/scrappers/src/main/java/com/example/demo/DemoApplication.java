package com.example.demo;

import com.example.demo.service.CurrentWeatherService;
import com.example.demo.service.DailyWeatherForecastService;
import com.example.demo.service.EventService;
import com.example.demo.service.HourlyWeatherForecastService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DemoApplication implements CommandLineRunner {

    @Autowired
    private CurrentWeatherService currentWeatherService;

    @Autowired
    private HourlyWeatherForecastService hourlyWeatherForecastService;;

    @Autowired
    private DailyWeatherForecastService dailyWeatherForecastService;

    @Autowired
    private EventService eventService;

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        currentWeatherService.getCurrentWeather();
        System.out.println("=Current weather data is stored in current_weather_data table");
        hourlyWeatherForecastService.getHourlyWeather();
        System.out.println("Hourly weather forecast data is stored in tables");
        dailyWeatherForecastService.getDailyWeather();
        System.out.println("Daily weather forecast data is stored in tables");
        eventService.fetchAndSaveEvents();
        System.out.println("Event data is fetched and stored in events table");
    }
}

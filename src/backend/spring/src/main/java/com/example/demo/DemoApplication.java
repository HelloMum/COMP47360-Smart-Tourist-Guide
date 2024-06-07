package com.example.demo;

import com.example.demo.model.CurrentWeatherData;
import com.example.demo.model.DailyWeatherForecastData;
import com.example.demo.model.HourlyWeatherForecastData;
import com.example.demo.scrapers.CurrentWeatherScraper;
import com.example.demo.scrapers.DailyWeatherForecastScraper;
import com.example.demo.scrapers.HourlyWeatherForecastScraper;
import com.example.demo.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DemoApplication implements CommandLineRunner {

    @Autowired
    private CurrentWeatherScraper currentWeatherScraper;

    @Autowired
    private HourlyWeatherForecastScraper hourlyWeatherForecastScraper;

    @Autowired
    private DailyWeatherForecastScraper dailyWeatherForecastScraper;

    @Autowired
    private EventService eventService;

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        CurrentWeatherData currentWeatherData = currentWeatherScraper.fetchWeatherData();
        System.out.println("currentWeatherData is stored in weather_data table");
        HourlyWeatherForecastData hourlyWeatherForecastData = hourlyWeatherForecastScraper.fetchWeatherData();
        System.out.println("hourlyWeatherForecastData is stored in tables");
        DailyWeatherForecastData dailyWeatherForecastData = dailyWeatherForecastScraper.fetchWeatherData();
        System.out.println("dailyWeatherForecastData is stored in tables");
        eventService.fetchAndSaveEvents();
        System.out.println("Event data is fetched and stored in events table");
    }
}

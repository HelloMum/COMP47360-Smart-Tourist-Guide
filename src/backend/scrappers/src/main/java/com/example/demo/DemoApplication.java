package com.example.demo;

import com.example.demo.enviroment.environmentLoader;
import com.example.demo.service.DailyWeatherForecastService;
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
    private DailyWeatherForecastService dailyWeatherForecastService;

    @Autowired
    private EventService eventService;

    public static void main(String[] args) {
        environmentLoader.load(); // Load environment variables from .env file
        SpringApplication.run(DemoApplication.class, args);

    }

    @Override
    public void run(String... args){
        dailyWeatherForecastService.getDailyForecasts();
        System.out.println("Daily weather forecast data is stored in tables");
        eventService.fetchAndSaveEvents();
        System.out.println("Event data is fetched and stored in events table");
    }
}

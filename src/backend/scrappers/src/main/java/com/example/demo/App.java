package com.example.demo;

import com.example.demo.api.CurrentWeatherScraper;
import com.example.demo.api.HourlyWeatherForecastScraper;
import com.example.demo.model.CurrentWeatherData;
import com.example.demo.model.HourlyWeatherForecastData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EnableScheduling
public class App implements CommandLineRunner {

    @Autowired
    private CurrentWeatherScraper currentWeatherScraper;

    @Autowired
    private HourlyWeatherForecastScraper hourlyWeatherForecastScraper;

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        CurrentWeatherData currentWeatherData = currentWeatherScraper.fetchWeatherData();
        System.out.println("currentWeatherData is stored in weather_data table");
        HourlyWeatherForecastData hourlyWeatherForecastData = hourlyWeatherForecastScraper.fetchWeatherData();
        System.out.println("hourlyWeatherForecastData is stored in tables");
    }
}

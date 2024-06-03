package com.example.demo;

import com.example.demo.api.CurrentWeatherScraper;
import com.example.demo.model.CurrentWeatherData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EnableScheduling
public class App implements CommandLineRunner {

    @Autowired
    private CurrentWeatherScraper weatherScraper;

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        CurrentWeatherData weatherData = weatherScraper.fetchWeatherData();
        System.out.println(weatherData);
    }
}

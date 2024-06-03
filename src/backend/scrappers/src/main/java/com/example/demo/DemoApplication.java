package com.example.demo;

import com.example.demo.model.WeatherData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EnableScheduling
public class DemoApplication implements CommandLineRunner {

    @Autowired
    private WeatherScraper weatherScraper;

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        WeatherData weatherData = weatherScraper.fetchWeatherData();
        System.out.println(weatherData);
    }
}

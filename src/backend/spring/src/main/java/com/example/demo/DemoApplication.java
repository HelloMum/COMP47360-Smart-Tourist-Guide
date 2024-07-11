package com.example.demo;

import com.example.demo.enviroment.environmentLoader;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DemoApplication {

    public static void main(String[] args) {
        environmentLoader.load();
        SpringApplication.run(DemoApplication.class, args);
    }

}

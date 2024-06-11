package com.example.demo;

import com.example.demo.enviroment.environmentLoader;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        environmentLoader.load();
        SpringApplication.run(DemoApplication.class, args);
    }

}

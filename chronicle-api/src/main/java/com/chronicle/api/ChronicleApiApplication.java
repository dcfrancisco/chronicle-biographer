package com.chronicle.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.chronicle"})
public class ChronicleApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(ChronicleApiApplication.class, args);
    }
}

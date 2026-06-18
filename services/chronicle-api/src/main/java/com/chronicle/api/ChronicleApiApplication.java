package com.chronicle.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"com.chronicle"})
@EnableJpaRepositories(basePackages = {
        "com.chronicle.infrastructure.repository",
        "com.chronicle.infrastructure.settings"
})
@EntityScan(basePackages = {
        "com.chronicle.domain.model",
        "com.chronicle.infrastructure.settings"
})
public class ChronicleApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(ChronicleApiApplication.class, args);
    }
}

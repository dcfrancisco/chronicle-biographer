package com.chronicle.api;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(classes = ChronicleApiApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
public class FullFlowIntegrationTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15-alpine")
            .withDatabaseName("chronicle_test")
            .withUsername("postgres")
            .withPassword("postgres");

    @DynamicPropertySource
    static void properties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", () -> postgres.getJdbcUrl());
        registry.add("spring.datasource.username", () -> postgres.getUsername());
        registry.add("spring.datasource.password", () -> postgres.getPassword());
    }

    @Autowired
    private TestRestTemplate rest;

    @Test
    void fullMemoryToChapterFlow() {
        // create memory
        Map<String,Object> memory = Map.of(
                "userId", java.util.UUID.randomUUID().toString(),
                "canonicalText", "I climbed a mountain when I was 12.",
                "title", "Mountain"
        );

        ResponseEntity<Map> createResp = rest.postForEntity("/api/v1/memories", memory, Map.class);
        assertThat(createResp.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        Map body = createResp.getBody();
        assertThat(body).isNotNull();
        String id = body.get("id").toString();

        // analyze
        ResponseEntity<Observation[]> analyzeResp = rest.postForEntity("/api/v1/memories/" + id + "/analyze", null, Observation[].class);
        assertThat(analyzeResp.getStatusCode()).isEqualTo(HttpStatus.OK);

        // questions
        ResponseEntity<Object[]> qResp = rest.postForEntity("/api/v1/memories/" + id + "/questions", null, Object[].class);
        assertThat(qResp.getStatusCode()).isEqualTo(HttpStatus.CREATED);

        // hypotheses
        ResponseEntity<Object[]> hResp = rest.postForEntity("/api/v1/memories/" + id + "/hypotheses", null, Object[].class);
        assertThat(hResp.getStatusCode()).isEqualTo(HttpStatus.CREATED);

        // chapter
        ResponseEntity<Map> chapterResp = rest.postForEntity("/api/v1/memories/" + id + "/chapter", null, Map.class);
        assertThat(chapterResp.getStatusCode()).isEqualTo(HttpStatus.ACCEPTED);
    }

    static class Observation { public String text; }
}

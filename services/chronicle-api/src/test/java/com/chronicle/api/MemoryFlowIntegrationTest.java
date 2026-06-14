package com.chronicle.api;

import com.chronicle.api.ChronicleApiApplication;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest(classes = ChronicleApiApplication.class)
@Testcontainers
public class MemoryFlowIntegrationTest extends PostgresIntegrationTestSupport {
    @Test
    void contextLoads() {
        // smoke test to ensure Spring context starts
    }
}

package com.chronicle.api;

import com.chronicle.api.ChronicleApiApplication;
import com.chronicle.domain.model.Memory;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(classes = ChronicleApiApplication.class)
public class MemoryFlowIntegrationTest {
    @Test
    void contextLoads() {
        // smoke test to ensure Spring context starts
    }
}

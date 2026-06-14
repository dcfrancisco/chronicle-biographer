package com.chronicle.application.settings;

import com.chronicle.domain.settings.ProviderType;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProviderRegistry {
    private final List<ProviderDefinition> definitions = List.of(
            new ProviderDefinition(
                    ProviderType.OPENAI,
                    "OpenAI",
                    "gpt-5.5",
                    "text-embedding-3-large",
                    "https://api.openai.com/v1",
                    false,
                    "Chronicle's default provider today."),
            new ProviderDefinition(
                    ProviderType.ANTHROPIC,
                    "Anthropic",
                    "claude-sonnet-4-0",
                    "embedding-3-large",
                    "https://api.anthropic.com",
                    false,
                    "Ready for future support."),
            new ProviderDefinition(
                    ProviderType.GEMINI,
                    "Gemini",
                    "gemini-2.5-pro",
                    "text-embedding-004",
                    "https://generativelanguage.googleapis.com",
                    false,
                    "Ready for future support."),
            new ProviderDefinition(
                    ProviderType.OLLAMA,
                    "Ollama",
                    "llama3.1",
                    "nomic-embed-text",
                    "http://localhost:11434",
                    false,
                    "Local model hosting."),
            new ProviderDefinition(
                    ProviderType.OIP,
                    "OIP",
                    "disabled",
                    "disabled",
                    "",
                    true,
                    "Disabled placeholder for future Chronicle compatibility."));

    public List<ProviderDefinition> listProviders() {
        return definitions;
    }

    public ProviderDefinition findByProvider(ProviderType provider) {
        return definitions.stream()
                .filter(definition -> definition.provider() == provider)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unknown provider: " + provider));
    }
}

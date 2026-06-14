package com.chronicle.application.settings;

import com.chronicle.domain.settings.ProviderType;

public record ProviderDefinition(
        ProviderType provider,
        String label,
        String defaultModel,
        String defaultEmbeddingModel,
        String baseUrlPlaceholder,
        boolean disabled,
        String description) {
}

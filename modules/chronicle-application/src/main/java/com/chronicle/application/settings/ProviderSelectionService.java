package com.chronicle.application.settings;

import com.chronicle.application.port.repository.ProviderConfigurationRepositoryPort;
import com.chronicle.domain.settings.ProviderConfiguration;
import com.chronicle.domain.settings.ProviderPurpose;
import com.chronicle.domain.settings.ProviderType;
import com.chronicle.domain.settings.ValidationStatus;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class ProviderSelectionService {
    private final ProviderConfigurationRepositoryPort repository;
    private final ProviderRegistry providerRegistry;

    public ProviderSelectionService(ProviderConfigurationRepositoryPort repository, ProviderRegistry providerRegistry) {
        this.repository = repository;
        this.providerRegistry = providerRegistry;
    }

    public List<ProviderConfiguration> listConfigurations() {
        return repository.findAll();
    }

    public List<ProviderDefinition> listProviders() {
        return providerRegistry.listProviders();
    }

    public ProviderConfiguration getSelectedConfiguration(ProviderPurpose purpose) {
        return repository.findByPurpose(purpose).stream()
                .filter(ProviderConfiguration::isSelected)
                .findFirst()
                .orElseGet(() -> defaultConfiguration(purpose));
    }

    public ProviderConfiguration saveConfiguration(ProviderPurpose purpose, ProviderType provider, ProviderConfiguration request) {
        ProviderConfiguration existing = repository.findByPurposeAndProvider(purpose, provider).orElseGet(ProviderConfiguration::new);
        existing.setPurpose(purpose);
        existing.setProvider(provider);
        existing.setApiKey(request.getApiKey());
        existing.setModel(request.getModel());
        existing.setEmbeddingModel(request.getEmbeddingModel());
        existing.setBaseUrl(request.getBaseUrl());
        existing.setValidationStatus(request.getValidationStatus() == null ? ValidationStatus.PENDING : request.getValidationStatus());
        existing.setSelected(request.isSelected());
        existing.setUpdatedAt(Instant.now());
        if (existing.getCreatedAt() == null) {
            existing.setCreatedAt(Instant.now());
        }
        return repository.save(existing);
    }

    public ProviderConfiguration defaultConfiguration(ProviderPurpose purpose) {
        ProviderDefinition openAi = providerRegistry.findByProvider(ProviderType.OPENAI);
        ProviderConfiguration configuration = new ProviderConfiguration();
        configuration.setPurpose(purpose);
        configuration.setProvider(ProviderType.OPENAI);
        configuration.setApiKey("");
        configuration.setModel(openAi.defaultModel());
        configuration.setEmbeddingModel(openAi.defaultEmbeddingModel());
        configuration.setBaseUrl(openAi.baseUrlPlaceholder());
        configuration.setValidationStatus(ValidationStatus.VALID);
        configuration.setSelected(true);
        return configuration;
    }
}

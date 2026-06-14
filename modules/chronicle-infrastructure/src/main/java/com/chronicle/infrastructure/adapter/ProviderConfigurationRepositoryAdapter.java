package com.chronicle.infrastructure.adapter;

import com.chronicle.application.port.repository.ProviderConfigurationRepositoryPort;
import com.chronicle.domain.settings.ProviderConfiguration;
import com.chronicle.domain.settings.ProviderPurpose;
import com.chronicle.domain.settings.ProviderType;
import com.chronicle.domain.settings.ValidationStatus;
import com.chronicle.infrastructure.settings.ProviderConfigurationEntity;
import com.chronicle.infrastructure.settings.ProviderConfigurationJpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class ProviderConfigurationRepositoryAdapter implements ProviderConfigurationRepositoryPort {
    private final ProviderConfigurationJpaRepository repository;

    public ProviderConfigurationRepositoryAdapter(ProviderConfigurationJpaRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<ProviderConfiguration> findAll() {
        return repository.findAll().stream().map(this::toDomain).collect(Collectors.toList());
    }

    @Override
    public List<ProviderConfiguration> findByPurpose(ProviderPurpose purpose) {
        return repository.findByPurpose(purpose.name()).stream().map(this::toDomain).collect(Collectors.toList());
    }

    @Override
    public Optional<ProviderConfiguration> findByPurposeAndProvider(ProviderPurpose purpose, ProviderType provider) {
        return repository.findByPurposeAndProviderType(purpose.name(), provider.name()).map(this::toDomain);
    }

    @Override
    public ProviderConfiguration save(ProviderConfiguration configuration) {
        ProviderConfigurationEntity entity = toEntity(configuration);
        return toDomain(repository.save(entity));
    }

    private ProviderConfiguration toDomain(ProviderConfigurationEntity entity) {
        ProviderConfiguration configuration = new ProviderConfiguration();
        configuration.setId(entity.getId());
        configuration.setPurpose(ProviderPurpose.valueOf(entity.getPurpose()));
        configuration.setProvider(ProviderType.valueOf(entity.getProviderType()));
        configuration.setApiKey(entity.getApiKey());
        configuration.setModel(entity.getModel());
        configuration.setEmbeddingModel(entity.getEmbeddingModel());
        configuration.setBaseUrl(entity.getBaseUrl());
        configuration.setValidationStatus(ValidationStatus.valueOf(entity.getValidationStatus()));
        configuration.setSelected(entity.isSelected());
        configuration.setCreatedAt(entity.getCreatedAt());
        configuration.setUpdatedAt(entity.getUpdatedAt());
        return configuration;
    }

    private ProviderConfigurationEntity toEntity(ProviderConfiguration configuration) {
        ProviderConfigurationEntity entity = new ProviderConfigurationEntity();
        entity.setId(configuration.getId());
        entity.setPurpose(configuration.getPurpose().name());
        entity.setProviderType(configuration.getProvider().name());
        entity.setApiKey(configuration.getApiKey());
        entity.setModel(configuration.getModel());
        entity.setEmbeddingModel(configuration.getEmbeddingModel());
        entity.setBaseUrl(configuration.getBaseUrl());
        entity.setValidationStatus(configuration.getValidationStatus().name());
        entity.setSelected(configuration.isSelected());
        entity.setCreatedAt(configuration.getCreatedAt());
        entity.setUpdatedAt(configuration.getUpdatedAt());
        return entity;
    }
}

package com.chronicle.application.port.repository;

import com.chronicle.domain.settings.ProviderConfiguration;
import com.chronicle.domain.settings.ProviderPurpose;
import com.chronicle.domain.settings.ProviderType;

import java.util.List;
import java.util.Optional;

public interface ProviderConfigurationRepositoryPort {
    List<ProviderConfiguration> findAll();
    List<ProviderConfiguration> findByPurpose(ProviderPurpose purpose);
    Optional<ProviderConfiguration> findByPurposeAndProvider(ProviderPurpose purpose, ProviderType provider);
    ProviderConfiguration save(ProviderConfiguration configuration);
}

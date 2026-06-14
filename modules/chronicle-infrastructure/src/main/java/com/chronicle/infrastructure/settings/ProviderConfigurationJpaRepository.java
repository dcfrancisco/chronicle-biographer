package com.chronicle.infrastructure.settings;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProviderConfigurationJpaRepository extends JpaRepository<ProviderConfigurationEntity, UUID> {
    List<ProviderConfigurationEntity> findByPurpose(String purpose);
    Optional<ProviderConfigurationEntity> findByPurposeAndProviderType(String purpose, String providerType);
}

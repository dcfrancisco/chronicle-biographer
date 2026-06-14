package com.chronicle.api.controller;

import com.chronicle.application.settings.ProviderSelectionService;
import com.chronicle.api.generated.api.SettingsApi;
import com.chronicle.api.generated.model.AboutSection;
import com.chronicle.api.generated.model.ProviderConfigurationRequest;
import com.chronicle.api.generated.model.ProviderConfigurationResponse;
import com.chronicle.api.generated.model.ProviderDefinition;
import com.chronicle.api.generated.model.SettingsResponse;
import com.chronicle.api.generated.model.SettingsSection;
import com.chronicle.api.generated.model.StorageSection;
import com.chronicle.domain.settings.ProviderConfiguration;
import com.chronicle.domain.settings.ProviderPurpose;
import com.chronicle.domain.settings.ProviderType;
import com.chronicle.domain.settings.ValidationStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class SettingsController implements SettingsApi {
    private final ProviderSelectionService providerSelectionService;

    public SettingsController(ProviderSelectionService providerSelectionService) {
        this.providerSelectionService = providerSelectionService;
    }

    @Override
    public ResponseEntity<SettingsResponse> getSettings() {
        ProviderConfiguration ai = providerSelectionService.getSelectedConfiguration(ProviderPurpose.AI);
        ProviderConfiguration embedding = providerSelectionService.getSelectedConfiguration(ProviderPurpose.EMBEDDING);
        List<ProviderDefinition> registry = providerSelectionService.listProviders().stream()
                .map(this::toDefinitionResponse)
                .toList();

        SettingsResponse response = new SettingsResponse()
                .general(new SettingsSection().title("General").description("Core Chronicle settings.").value("Chronicle Biographer"))
                .aiProvider(toResponse(ai))
                .embeddingProvider(toResponse(embedding))
                .storage(new StorageSection()
                        .title("Storage")
                        .description("Persistence layer and artifact storage.")
                        .value("PostgreSQL + pgvector")
                        .detail("Local demo uses Postgres for configuration and Chronicle artifacts."))
                .about(new AboutSection()
                        .title("About")
                        .description("Chronicle settings surface.")
                        .version("0.1.0")
                        .note("AI Biographer prototype"))
                .providerRegistry(registry);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<ProviderConfigurationResponse> saveProviderConfiguration(
            String purpose,
            String provider,
            ProviderConfigurationRequest request) {
        ProviderConfiguration configuration = new ProviderConfiguration();
        configuration.setApiKey(request.getApiKey());
        configuration.setModel(request.getModel());
        configuration.setEmbeddingModel(request.getEmbeddingModel());
        configuration.setBaseUrl(request.getBaseUrl());
        configuration.setValidationStatus(request.getValidationStatus() == null
                ? ValidationStatus.PENDING
                : ValidationStatus.valueOf(request.getValidationStatus().name()));
        configuration.setSelected(Boolean.TRUE.equals(request.getSelected()));

        ProviderConfiguration saved = providerSelectionService.saveConfiguration(
                ProviderPurpose.valueOf(purpose),
                ProviderType.valueOf(provider),
                configuration);
        return ResponseEntity.ok(toResponse(saved));
    }

    private ProviderConfigurationResponse toResponse(ProviderConfiguration configuration) {
        return new ProviderConfigurationResponse()
                .purpose(ProviderConfigurationResponse.PurposeEnum.fromValue(configuration.getPurpose().name()))
                .provider(ProviderConfigurationResponse.ProviderEnum.fromValue(configuration.getProvider().name()))
                .apiKey(configuration.getApiKey())
                .model(configuration.getModel())
                .embeddingModel(configuration.getEmbeddingModel())
                .baseUrl(configuration.getBaseUrl())
                .validationStatus(ProviderConfigurationResponse.ValidationStatusEnum.fromValue(configuration.getValidationStatus().name()))
                .selected(configuration.isSelected());
    }

    private com.chronicle.api.generated.model.ProviderDefinition toDefinitionResponse(
            com.chronicle.application.settings.ProviderDefinition definition) {
        return new com.chronicle.api.generated.model.ProviderDefinition()
                .provider(com.chronicle.api.generated.model.ProviderDefinition.ProviderEnum.fromValue(definition.provider().name()))
                .label(definition.label())
                .defaultModel(definition.defaultModel())
                .defaultEmbeddingModel(definition.defaultEmbeddingModel())
                .baseUrlPlaceholder(definition.baseUrlPlaceholder())
                .disabled(definition.disabled())
                .description(definition.description());
    }
}

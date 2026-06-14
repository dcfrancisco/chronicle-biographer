package com.chronicle.domain.settings;

import java.time.Instant;
import java.util.UUID;

public class ProviderConfiguration {
    private UUID id;
    private ProviderPurpose purpose;
    private ProviderType provider;
    private String apiKey;
    private String model;
    private String embeddingModel;
    private String baseUrl;
    private ValidationStatus validationStatus;
    private boolean selected;
    private Instant createdAt;
    private Instant updatedAt;

    public ProviderConfiguration() {
        this.id = UUID.randomUUID();
        this.createdAt = Instant.now();
        this.validationStatus = ValidationStatus.PENDING;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public ProviderPurpose getPurpose() {
        return purpose;
    }

    public void setPurpose(ProviderPurpose purpose) {
        this.purpose = purpose;
    }

    public ProviderType getProvider() {
        return provider;
    }

    public void setProvider(ProviderType provider) {
        this.provider = provider;
    }

    public String getApiKey() {
        return apiKey;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getEmbeddingModel() {
        return embeddingModel;
    }

    public void setEmbeddingModel(String embeddingModel) {
        this.embeddingModel = embeddingModel;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public ValidationStatus getValidationStatus() {
        return validationStatus;
    }

    public void setValidationStatus(ValidationStatus validationStatus) {
        this.validationStatus = validationStatus;
    }

    public boolean isSelected() {
        return selected;
    }

    public void setSelected(boolean selected) {
        this.selected = selected;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}

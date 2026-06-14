package com.chronicle.infrastructure.repository;

import com.chronicle.domain.model.Artifact;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface ArtifactRepository extends JpaRepository<Artifact, UUID> {
}

package com.chronicle.application.port.repository;

import com.chronicle.domain.model.Observation;

import java.util.List;

public interface ObservationRepositoryPort {
    Observation save(Observation observation);
    List<Observation> saveAll(Iterable<Observation> observations);
}

package com.chronicle.infrastructure.adapter;

import com.chronicle.application.port.repository.ObservationRepositoryPort;
import com.chronicle.domain.model.Observation;
import com.chronicle.infrastructure.repository.ObservationJpaRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ObservationRepositoryAdapter implements ObservationRepositoryPort {
    private final ObservationJpaRepository jpa;

    public ObservationRepositoryAdapter(ObservationJpaRepository jpa) { this.jpa = jpa; }

    @Override
    public Observation save(Observation observation) { return jpa.save(observation); }

    @Override
    public List<Observation> saveAll(Iterable<Observation> observations) {
        List<Observation> out = new ArrayList<>();
        jpa.saveAll(observations).forEach(out::add);
        return out;
    }
}

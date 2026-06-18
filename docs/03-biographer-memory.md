# Biographer Memory

This is the design note for Chronicle's memory model. The MVP only uses a narrow subset of this model today; the rest is deferred.

Overview
--------
`Biographer Memory` is the structured representation of what Chronicle knows about a person. It is purpose-built to support narrative generation, investigation workflows, and provenance tracking.

Primary entities
- Observation
  - Definition: an extracted fact from an artifact (text snippet, photo metadata, audio transcript).
  - Key fields: `id`, `timestamp`, `sourceArtifactId`, `text`, `location`, `participants`, `metadata`

- Hypothesis
  - Definition: an interpretable claim tying observations together (e.g., "Moved to Seattle in 2010").
  - Key fields: `id`, `summary`, `linkedObservationIds`, `confidenceScore`, `status` (proposed|investigating|confirmed|rejected)

- Contradiction
  - Definition: explicit evidence that weakens or invalidates a hypothesis.
  - Key fields: `id`, `hypothesisId`, `observationId`, `explanation`

- Open Question
  - Definition: a discoverable gap the system wants to resolve (e.g., "When did X happen?").
  - Fields: `id`, `text`, `priority`, `linkedHypotheses`

- Investigation Plan
  - Definition: a sequence of automated tasks or human actions to gather evidence.
  - Fields: `id`, `tasks`, `status`, `results`

- Theme (Promotion)
  - When multiple hypotheses reach sustained high confidence and overlap by topic, they may be promoted into a `Theme`.
  - Theme fields: `id`, `title`, `summary`, `hypothesisIds`, `evidenceSummary`

Evidence & Provenance
----------------------
- Every `Observation`, `Hypothesis`, and `Theme` must trace back to one or more `Artifact`s.
- Provenance should include: `artifactId`, `extractionMethod` (ocr|nlp|human), `confidence`, `extractionTimestamp`.

Confidence model
----------------
- Use a normalized `confidenceScore` in [0..1].
- Combine signals: extraction confidence, corroborating observations, temporal proximity, source trust score.
- Record `confidenceHistory` for auditability.

When to promote
----------------
- Promote hypothesis → theme when:
  - `confidenceScore >= 0.85` AND
  - At least 3 independent `Observation` sources OR one primary artifact with high trust (e.g., legal docs).

How theories evolve
--------------------
- Keep hypotheses mutable. New contradictions reduce confidence and create `InvestigationPlan`s.
- Allow manual overrides by the user with `userConfidence` and `userNotes` fields.

Deferred API surface
--------------------
- `POST /memories/observations` — ingest observation
- `POST /memories/hypotheses` — propose hypothesis
- `POST /memories/investigations` — create investigation plan
- `GET /memories/themes` — list promoted themes

Examples
--------
- Observation: {"text": "Started work at Acme Corp", "timestamp":"2012-06-01", "artifactId":"email-123"}
- Hypothesis: {"summary":"Worked at Acme from 2012-2014","linkedObservationIds":[obs-1, obs-2],"confidenceScore":0.76}

# System Architecture (high-level)

This page summarizes the main components and their responsibilities.

Components:
- Ingestion: connectors and extractors for artifacts (files, photos, audio, social exports).
- Extraction: OCR, speech-to-text, NLP extractors that emit `Observation`s.
- Memory Store: canonical store for `Observation`, `Hypothesis`, `Theme`, with provenance.
- Biographer Engine: reasoning rules, hypothesis generation, confidence model.
- Writing Studio: UI for human editing, chapter assembly, and export.
- APIs: REST endpoints and async job endpoints for ingestion and investigation.

Data flow:
1. Ingest artifact → Extraction (sync/async)
2. Observations written to Memory Store
3. Biographer Engine scans Observations → proposes Hypotheses
4. Investigation tasks run (automated enrichment)
5. Themes promoted and surfaced to Writing Studio

# How Chronicle Thinks

This document describes the mental model used by Chronicle's Biographer: how observations become hypotheses, how contradictions are tracked, and how narratives are promoted.

Core concepts:
- Observation: a raw, timestamped fact extracted from an artifact.
- Hypothesis: an explanatory statement that links observations into a claim.
- Investigation: a plan to gather evidence for or against a hypothesis.
- Theme: a recurring pattern or topic that aggregates related hypotheses.
- Chapter: a curated narrative composed from themes and evidence.

Flow:
1. Ingest artifacts → extract `Observation`s.
2. Group related observations → propose `Hypothesis` candidates.
3. Run investigations (automated or human-assisted) to gather further evidence.
4. Promote confident hypotheses into `Theme`s.
5. Authors combine themes into `Chapter`s and `BookDraft`s.

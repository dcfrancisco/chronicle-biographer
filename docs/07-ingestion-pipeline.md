# Ingestion Pipeline

Chronicle Ingestion is a first-class capability. Ingestors produce `Artifact`s which are then transformed into `Observation`s and downstream models.

Sources (examples):
- PDF
- DOCX
- Markdown
- TXT
- Email (MBOX, EML)
- Photos (JPEG/HEIC) — EXIF, OCR on images
- Audio (MP3, WAV) — speech-to-text -> transcripts
- Chat exports (WhatsApp, iMessage, Slack)
- Social media exports (Facebook, Twitter, Instagram)

Outputs:
- Artifacts (raw file + metadata)
- Observations (extracted facts)
- Claims / Hypotheses (derived)
- Events, People, Places

Pipeline stages:
1. Ingest connector (upload or remote fetch)
2. Normalize & store artifact
3. Extract text/metadata (OCR, speech-to-text, archive parsing)
4. Run NLP extractors: named entities, dates, event detection
5. Emit `Observation`s to Memory Store and enqueue downstream reasoning

Metadata to capture per artifact:
- source, original filename, importTimestamp, sourceType, ownerUserId, trustScore

Priorities for a killer demo:
1. Support bulk import of multi-year archives (ZIP, MBOX, PDF, photos)
2. Fast async processing with progress feedback
3. Automatic theme detection and a concise summary card: "5 recurring themes, 3 unanswered questions"

Security & privacy:
- Data-at-rest encryption, per-tenant or per-user keys
- Audit logs for all ingestion and extraction steps

Example quick workflow:
1. Upload ZIP of 20 years of documents
2. System: extract → index → 10-minute pass (fast sampling)
3. Surface: top themes + open questions + evidence links

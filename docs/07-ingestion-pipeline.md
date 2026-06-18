# Ingestion Pipeline

Chronicle's current ingestion pipeline is local and synchronous.

Supported inputs now
- `PDF`
- `DOCX`
- `Markdown`
- `TXT`

Current stages
1. Upload the file.
2. Register the artifact.
3. Extract text locally.
4. Chunk the extracted text.
5. Build memory candidates.
6. Generate observations.
7. Generate hypotheses.

Current output
- A registered artifact.
- Chunks with provenance snippets.
- Memory candidates.
- Observations.
- Hypotheses.
- A chapter draft when requested from the memory flow.

Deferred
- ZIP or archive ingestion
- MBOX or email import
- Photos and OCR
- Audio and ASR
- Chat exports
- Social exports
- Remote fetch connectors
- Async workers
- Progress orchestration

The current demo should continue to describe only the supported local extraction path.

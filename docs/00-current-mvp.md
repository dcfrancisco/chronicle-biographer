# Current MVP

Chronicle's truthful MVP is the artifact-to-draft pipeline already exercised by the current API and demo UI.

What works now
- Upload a single artifact.
- Extract text locally from `txt`, `md`, `pdf`, and `docx`.
- Chunk the extracted content.
- Create memory candidates from chunks.
- Generate observations from memory analysis.
- Generate hypotheses from observations.
- Generate open questions from a memory.
- Generate a chapter draft from a memory and its observations.

Current tested flow
1. Upload an artifact through the Upload surface.
2. Register the artifact in the API.
3. Ingest it with local extraction and chunking.
4. Derive memory, observation, and hypothesis candidates.
5. Ask follow-up questions from the analyzed memory.
6. Produce a chapter draft from the same analyzed material.

Current surfaces
- `Upload` is the primary working surface.
- `Studio`, `Notebook`, `Books`, and `Settings` are prototype/mock surfaces backed by local demo data.

Deferred
- Interviews
- Timeline
- Relationships
- Themes dashboard
- Full notebook
- Book reader integration
- Workspace SaaS
- OIP provider
- Multi-provider switching
- OCR
- ASR
- Vector search
- Object storage
- Workers
- Kubernetes

 # Writing Studio

The Writing Studio is Chronicle's creative surface where users turn discovered themes into chapters and full book drafts. It emphasizes provenance, voice preservation, and iterative drafting.

Key product goals
- Make evidence insertion and citation effortless.
- Encourage iteration: auto-drafts, manual edits, and provenance-driven verification.
- Surface persona-driven suggestions (Editor, Historian, Skeptic) without removing user agency.

Primary features
- Draft editor with inline citations to `Artifact`s and `Observation`s.
- Theme-to-chapter scaffolding with drag/drop ordering and outline generation.
- Versioning, snapshots, and compare views for iterative editing.
- Export presets (PDF, EPUB, print-ready) including provenance metadata.

Typical flow
1. Convert selected `Theme` or `Memory` into a chapter scaffold.
2. The editor populates an initial draft with citation placeholders and suggested paragraphs.
3. Use the AI side panel to request expansions, tighten voice, or surface missing evidence.
4. Run a `Skeptic` verification pass to list contradictions and low-evidence claims.
5. Save snapshots and add the chapter to a `BookDraft` for later export.

UX considerations
- Evidence sidebar should show artifacts with quick-insert buttons and provenance snippets.
- Persona sliders let users balance Historian vs Philosopher vs Editor suggestions.
- Inline provenance badges (confidence) help users assess which claims need verification.

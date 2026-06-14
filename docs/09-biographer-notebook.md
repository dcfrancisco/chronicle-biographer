 # Biographer Notebook

The Biographer Notebook is the private research space for Chronicle's reasoning: a place where the AI keeps working notes, hypotheses, and investigation plans before surfacing them to users.

Goals
- Provide a lightweight, researcher-style interface for composing observations, sketching hypotheses, and organizing investigation plans.
- Keep AI notes private until confidence or human review promotes them.

Capabilities
- Natural-language queries against Subject and Biographer Memory, returning provenance-backed answers.
- Notebook cell types: `observation-query`, `hypothesis-sketch`, `investigation-plan`, `narrative-draft`.
- Promote a notebook entry into a user-visible `BiographerNote`, `Theme`, or `BookDraft`.
- Export notebook content to `BookDraft` or a read-only snapshot for sharing.

Behavior & UX
- Filter by type (Observation / Hypothesis / Question / Plan) and confidence.
- Allow quick escalation: "Share with user", "Ask interview question", "Add evidence".
- Display confidence badges and linked artifacts prominently to support review.

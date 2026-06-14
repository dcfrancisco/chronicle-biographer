 # Chronicle — AI Biographer

**Tagline:** A conversation with your life.

Chronicle helps people turn scattered documents, conversations, and media into a living, evidence-backed life story. It discovers themes, surfaces contradictions, and helps users compose legacy-grade artifacts with provenance and voice preservation.

Docs index

- [01-vision.md](docs/01-vision.md)
- [02-product-requirements.md](docs/02-product-requirements.md)
- [03-biographer-memory.md](docs/03-biographer-memory.md)
- [04-system-architecture.md](docs/04-system-architecture.md)
- [05-database-design.md](docs/05-database-design.md)
- [06-api-design.md](docs/06-api-design.md)
- [07-ingestion-pipeline.md](docs/07-ingestion-pipeline.md)
- [08-writing-studio.md](docs/08-writing-studio.md)
- [09-biographer-notebook.md](docs/09-biographer-notebook.md)
- [10-roadmap.md](docs/10-roadmap.md)
- [11-local-development.md](docs/11-local-development.md)

Frontend prototype

1. `cd apps/chronicle-web`
2. `npm install`
3. `npm run dev`

The frontend opens on the Upload experience at `/upload`.

Production build:

1. `cd apps/chronicle-web`
2. `npm run build`

Local startup

1. `cp .env.example .env`
2. `docker compose up --build`

The API starts at `http://localhost:8080` and Flyway bootstraps the database schema on startup.


Over time it becomes more than software.

It becomes a witness.

And eventually, a record of a life.

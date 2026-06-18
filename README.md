# Chronicle

## A conversation with your life.

Chronicle is an AI biographer that helps people understand, document, challenge, and preserve their life story.

Most software helps you remember.

Chronicle helps you understand.

Chronicle transforms documents, conversations, photos, memories, journals, and life experiences into a living, evidence-backed narrative. It discovers themes, surfaces contradictions, asks better questions, and helps create memoirs, manifestos, essays, and legacy artifacts while preserving provenance and voice.

---

## Project Structure

```text
apps/
  chronicle-web/        Next.js frontend
services/
  chronicle-api/        Spring Boot API
modules/
  chronicle-domain/     Core domain model
  chronicle-application/ Application services and ports
  chronicle-infrastructure/ Persistence, adapters, migrations, providers
  chronicle-ingestion/  Artifact ingestion pipeline
docs/
openapi/
docker-compose.yml
```

---

## Why Chronicle Exists

Most people leave behind thousands of pages of material:

* Documents
* Photos
* Emails
* Journals
* Notes
* Projects
* Conversations
* Social media posts

Yet very little of it becomes understanding.

Chronicle was created to answer questions that traditional note-taking systems cannot:

* Who am I?
* How did I become this person?
* What patterns define my life?
* What beliefs have changed?
* What lessons have I learned?
* What should survive after I'm gone?

---

## What Makes Chronicle Different

Chronicle is not:

* A chatbot
* A journal
* A note-taking application
* A document search engine
* A generic RAG platform

Chronicle is an AI Biographer.

It maintains multiple perspectives on a life:

### Subject Memory

What happened.

### Biographer Memory

What Chronicle believes.

### Relationship Memory

Who shaped the story.

### Narrative Memory

What story is emerging.

Over time, memories become observations.

Observations become hypotheses.

Hypotheses become themes.

Themes become chapters.

Chapters become books.

---

## Current Status

Chronicle is in active development.

Current focus:

```text
Upload
→ Memory
→ Observation
→ Hypothesis
→ Question
→ Chapter
```

The goal is to prove the core biographer experience before expanding into advanced timeline, relationship, publishing, and workspace capabilities.

---

## Documentation

### Product

* [01-vision.md](docs/01-vision.md)
* [02-product-requirements.md](docs/02-product-requirements.md)
* [03-biographer-memory.md](docs/03-biographer-memory.md)
* [04-system-architecture.md](docs/04-system-architecture.md)
* [05-database-design.md](docs/05-database-design.md)
* [06-api-design.md](docs/06-api-design.md)
* [07-ingestion-pipeline.md](docs/07-ingestion-pipeline.md)
* [08-writing-studio.md](docs/08-writing-studio.md)
* [09-biographer-notebook.md](docs/09-biographer-notebook.md)
* [10-roadmap.md](docs/10-roadmap.md)
* [11-local-development.md](docs/11-local-development.md)

---

## Frontend Prototype

The Chronicle UI lives in `apps/chronicle-web`.

```bash
cd apps/chronicle-web
npm install
npm run dev
```

The frontend currently opens on the Upload experience.

Production build:

```bash
cd apps/chronicle-web
npm run build
```

---

## Local Startup

```bash
cp .env.example .env
docker compose up --build
```

The API starts on:

```text
http://localhost:8080
```

Flyway automatically bootstraps the database schema on startup.

---

## Long-Term Vision

Chronicle should be able to spend years with a person.

Reading.

Listening.

Remembering.

Questioning.

Connecting ideas across decades.

Over time it becomes more than software.

It becomes a witness.

And eventually, a record of a life.

# Chronicle Workspace Rules

## Product Identity

Chronicle is an AI Biographer.

Chronicle is not:

* a chatbot
* a generic journal
* a generic RAG app
* a productivity assistant
* a document search tool
* therapy software

Chronicle helps a person understand, document, challenge, and preserve their life story.

The core experience is:

Memory → Observation → Hypothesis → Question → Chapter

Every feature should support that flow.

---

## Core Product Principles

### 1. Biography over chat

Do not make Chronicle chat-centric.

Chat may exist, but the product should feel like:

* writing with a biographer
* reviewing a research notebook
* reading an evolving memoir

### 2. Pushback matters

The AI should not simply agree with the subject.

It should respectfully surface:

* contradictions
* repeated patterns
* missing context
* changed beliefs
* unresolved questions

### 3. Two memories are required

Chronicle has separate memory systems.

Subject Memory:

* what happened
* artifacts
* memories
* events
* facts
* source material

Biographer Memory:

* what Chronicle believes
* observations
* hypotheses
* contradictions
* open questions
* investigation plans
* confidence scores

Do not merge these concepts.

### 4. Provenance is mandatory

Every AI-generated insight must be traceable to evidence.

Observations, hypotheses, contradictions, questions, themes, and chapters should reference:

* artifact id
* memory id
* chunk id
* source filename
* page number when available
* confidence score

### 5. Original artifacts are immutable

Uploaded artifacts must not be overwritten.

Derived data should be stored separately:

* chunks
* memories
* claims
* observations
* hypotheses
* chapters

### 6. The Biographer Notebook is the signature feature

Prioritize the Biographer Notebook over generic dashboards.

It should show:

* observations
* hypotheses
* open questions
* contradictions
* themes
* investigation plans
* supporting evidence

The notebook should feel like a professional biographer's research ledger.

---

## Architecture Rules

Use the monorepo structure:

apps/

* chronicle-web

services/

* chronicle-api

modules/

* chronicle-domain
* chronicle-application
* chronicle-infrastructure
* chronicle-ingestion

docs/
openapi/

Do not place frontend files in the repository root.

Do not place backend service code in the repository root.

---

## Java Architecture Rules

Use clean architecture / ports and adapters.

Dependency direction:

chronicle-domain

* no Spring dependencies
* no infrastructure dependencies

chronicle-application

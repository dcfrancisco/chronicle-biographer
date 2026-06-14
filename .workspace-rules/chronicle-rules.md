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

### 7. Workspaces are consumers, not owners

Chronicle may support multiple workspaces per user in the future, but workspaces do not own memories.

Subject Memory remains shared and immutable at the identity level.

Workspaces consume memories and produce workspace-specific outputs.

A single memory can appear in multiple workspaces without duplication.

Future workspace examples:

* Memoir
* Manifesto
* Biography
* Legacy
* Book
* Blog
* LinkedIn
* Newsletter
* Research
* Custom

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

OpenAPI First Development

Chronicle is contract-driven.

All external APIs must be defined in OpenAPI first.

Source of Truth:

openapi/chronicle-api.yaml

Generated Artifacts:

- Spring DTOs
- Spring interfaces
- TypeScript models
- TypeScript API client

Do not manually create request or response DTOs.

Do not manually duplicate API contracts.

When changing an API:

1. Update OpenAPI specification.
2. Regenerate code.
3. Implement business logic.
4. Update tests.

The OpenAPI specification is authoritative.

AI Provider Architecture

Chronicle must support multiple AI providers.

Chronicle is provider-agnostic.

Providers are interchangeable analysis engines.

Supported providers:

* OpenAI (default)
* Anthropic
* Google Gemini
* Ollama
* OIP (future)

Default Behavior

Fresh installations should use OpenAI.

Chronicle should work immediately after entering:

* API Key
* Model

No additional setup should be required.

Provider Registry

Do not hardcode providers.

Use:

AiProvider

Implementations:

* OpenAiProvider
* AnthropicProvider
* GeminiProvider
* OllamaProvider
* OipProvider

Provider selection must be configurable.

Configuration Model

System Configuration:

AI Provider
AI Model
Embedding Provider
Embedding Model

Example:

Provider:
OpenAI

Model:
gpt-5.5

Embedding Provider:
OpenAI

Embedding Model:
text-embedding-3-large

Future OIP Integration

OIP is treated as a provider.

Chronicle should not depend directly on OpenAI.

Chronicle should depend on AiProvider abstractions.

Future:

Chronicle
→ OIP
→ OpenAI / Anthropic / Ollama

This allows Chronicle to run:

* cloud-first
* local-first
* enterprise-private

without architecture changes.

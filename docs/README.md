Chronicle — docs

Files:
- PRD_Chronicle.md — Core product requirements document (created)
- ARCHITECTURE_AND_UX.md — Architecture and UX design (created)
- DATABASE_DESIGN.md — Database design (created)

Next suggested docs to generate:
- OpenAPI spec (docs-only)
- Architecture diagrams (Mermaid)
- Detailed DB schema (DDL)
- UX flow mockups (descriptions)

Database migrations (Flyway)
- src/main/resources/db/migration/V1__create_core_identity_and_artifacts.sql
- src/main/resources/db/migration/V2__create_memory_and_pgvector.sql
- src/main/resources/db/migration/V3__create_biographer_and_narrative_tables.sql

Local database setup (Postgres + pgvector)
1. Install PostgreSQL (13+) and the `pgvector` extension locally.
	- macOS (Homebrew):

```bash
brew install postgresql
brew install pgvector
```

2. Start Postgres and create a dev database and user:

```bash
brew services start postgresql
psql postgres
CREATE ROLE chronicle WITH LOGIN PASSWORD 'chronicle_dev_pwd';
CREATE DATABASE chronicle_dev OWNER chronicle;
\c chronicle_dev
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS vector;
```

3. Run Flyway migrations (example using Maven plugin or Flyway CLI):

```bash
# Using Flyway CLI (install flyway)
flyway -url=jdbc:postgresql://localhost:5432/chronicle_dev -user=chronicle -password=chronicle_dev_pwd migrate

# Or using Maven/Gradle configured in the project
mvn flyway:migrate
```

Notes:
- Tune `pgvector` index parameters after seeding sample data.
- Migrations included are V1..V3; add later migrations under `src/main/resources/db/migration`.

Tell me which doc to expand next.
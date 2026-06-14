# Local Development & Postgres Setup

This document collects local development instructions, Postgres/pgvector setup, Flyway migration hints, and Docker tips for running Chronicle locally.

Postgres + pgvector (macOS, Homebrew)

Install Postgres and pgvector:

```bash
brew install postgresql
brew install pgvector
brew services start postgresql
```

Create dev role and DB:

```bash
psql postgres
CREATE ROLE chronicle WITH LOGIN PASSWORD 'chronicle_dev_pwd';
CREATE DATABASE chronicle_dev OWNER chronicle;
\c chronicle_dev
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS vector;
```

Run Flyway migrations

Using Flyway CLI:

```bash
flyway -url=jdbc:postgresql://localhost:5432/chronicle_dev -user=chronicle -password=chronicle_dev_pwd migrate
```

Or via Maven plugin (project uses Flyway migrations in `src/main/resources/db/migration`):

```bash
mvn flyway:migrate
```

Docker (optional)

Run a Postgres container with pgvector (recommended for parity):

```bash
docker run --name chronicle-postgres -e POSTGRES_PASSWORD=chronicle_dev_pwd -e POSTGRES_USER=chronicle -e POSTGRES_DB=chronicle_dev -p 5432:5432 -d postgres:15
docker exec -it chronicle-postgres psql -U chronicle -d chronicle_dev -c "CREATE EXTENSION IF NOT EXISTS vector;"
```

Local-run tips
- Use the test Flyway migrations in `src/main/resources/db/migration` to bootstrap the schema.
- Seed a small dataset (sample artifacts) for local UI testing.
- Tune `pgvector` `lists` parameter after indexing sample data.

Secrets & privacy
- For local dev, use ephemeral dev passwords. For shared dev environments, use a secrets manager.

Next steps
- If you want, I can generate Flyway migration files for V1..V3 based on the `docs/DATABASE_DESIGN.md` DDL examples.

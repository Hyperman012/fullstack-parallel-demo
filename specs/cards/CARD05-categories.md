# CARD05: Categories (vertical slice, OUTSIDE-IN)

**Status:** READY
**Direction:** outside-in (UI → API → DB), unit tests with mocks/stubs at each layer (NOT e2e)
**Lane:**
- `frontend/src/components/Categories.tsx`, `frontend/src/components/Categories.test.tsx`, `frontend/src/categories.ts`
- `backend/app/categories_api.py`, `backend/app/categories_repo.py`, `backend/app/models.py` (Category class), `backend/alembic/versions/`, `backend/tests/test_categories_*.py`
- append-only hubs: `frontend/src/routes.tsx` (route entry), `backend/app/main.py` (router include)

**Provides:** a Categories UI view, `GET`/`POST /categories`, `categories` table.

## Acceptance Criteria

AC1: The Categories UI lists categories and can create one via a form (built against a mocked client).
AC2: `GET /categories` lists; `POST /categories` creates (201) and rejects a blank name (422) — endpoint built against a stubbed repository.
AC3: A category has an id and a name; persisted in a `categories` table (additive migration), wired in as the real repository.

## TDD — triangulate, build top-down with mocks (one green commit per step)

UI first (mock the `categories.ts` client), then API (stub the repository
dependency), then DB last (real repo + model + migration, then wire it in).
**UI:** renders empty state → renders a row (mock client) → form submit calls
the client (spy). **API:** GET list (fake repo) → POST 201 → POST blank→422.
**DB:** Category model+migration → repo.create returns id → repo.get returns
saved → repo.list returns multiple (triangulate); wire the real repo as the API's
default dependency. One RED→GREEN→commit→push each. No batching.

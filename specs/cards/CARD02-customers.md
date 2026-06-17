# CARD02: Customers (vertical slice)

**Status:** READY
**Direction:** inside-out (DB → API → UI)
**Lane:**
- `backend/app/models.py` (Customer class), `backend/app/customers_repo.py`, `backend/app/customers_api.py`, `backend/alembic/versions/`, `backend/tests/test_customers_*.py`
- `frontend/src/components/Customers.tsx`, `frontend/src/components/Customers.test.tsx`, `frontend/src/customers.ts`
- append-only hubs: `backend/app/main.py` (router include), `frontend/src/routes.tsx` (route entry)

**Provides:** `customers` table, `GET`/`POST /customers`, a Customers UI view.

## What ships

A full vertical slice for customers: persistence, API, and a UI list+create form.

## Acceptance Criteria

AC1: A customer has an id and a name; persisted in a `customers` table (additive migration).
AC2: `GET /customers` lists customers; `POST /customers` creates one (201) and rejects a blank name (422).
AC3: The Customers UI lists customers from the API and can create one via a form.

## TDD — triangulate each layer (one green commit per step)

**DB/repo:** create returns an id → get returns the saved row → list returns
multiple (triangulate) → list ordered/scoped. **API:** GET returns the list →
POST creates (201) → POST blank name → 422. **UI:** renders empty state →
renders a row from the API → submitting the form posts and shows the new row.

Each numbered behavior above is its own RED→GREEN→commit→push. Do NOT batch.

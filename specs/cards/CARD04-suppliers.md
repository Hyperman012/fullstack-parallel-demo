# CARD04: Suppliers (vertical slice, INSIDE-OUT)

**Status:** READY
**Direction:** inside-out (DB → API → UI)
**Lane:**
- `backend/app/models.py` (Supplier class), `backend/app/suppliers_repo.py`, `backend/app/suppliers_api.py`, `backend/alembic/versions/`, `backend/tests/test_suppliers_*.py`
- `frontend/src/components/Suppliers.tsx`, `frontend/src/components/Suppliers.test.tsx`, `frontend/src/suppliers.ts`
- append-only hubs: `backend/app/main.py` (router include), `frontend/src/routes.tsx` (route entry)

**Provides:** `suppliers` table, `GET`/`POST /suppliers`, a Suppliers UI view.

## Acceptance Criteria

AC1: A supplier has an id and a name; persisted in a `suppliers` table (additive migration).
AC2: `GET /suppliers` lists; `POST /suppliers` creates (201) and rejects a blank name (422).
AC3: The Suppliers UI lists suppliers from the API and can create one via a form.

## TDD — triangulate, build bottom-up (one green commit per step)

DB first, then API, then UI. **DB:** model+migration → repo.create returns id →
repo.get returns saved → repo.list returns multiple (triangulate). **API:** GET
list → POST 201 → POST blank→422. **UI:** empty state → renders a row (mock
fetch) → form submit posts and shows the row. One RED→GREEN→commit→push each. No batching.

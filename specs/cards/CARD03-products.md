# CARD03: Products (vertical slice)

**Status:** READY
**Direction:** inside-out (DB → API → UI)
**Lane:**
- `backend/app/models.py` (Product class), `backend/app/products_repo.py`, `backend/app/products_api.py`, `backend/alembic/versions/`, `backend/tests/test_products_*.py`
- `frontend/src/components/Products.tsx`, `frontend/src/components/Products.test.tsx`, `frontend/src/products.ts`
- append-only hubs: `backend/app/main.py` (router include), `frontend/src/routes.tsx` (route entry)

**Provides:** `products` table, `GET`/`POST /products`, a Products UI view.

## What ships

A full vertical slice for products: persistence, API, and a UI list+create form.

## Acceptance Criteria

AC1: A product has an id, a name, and a price; persisted in a `products` table (additive migration).
AC2: `GET /products` lists products; `POST /products` creates one (201) and rejects a negative price (422).
AC3: The Products UI lists products from the API and can create one via a form.

## TDD — triangulate each layer (one green commit per step)

**DB/repo:** create returns an id → get returns the saved row → list returns
multiple (triangulate) → list ordered. **API:** GET returns the list → POST
creates (201) → POST negative price → 422. **UI:** renders empty state →
renders a row from the API → submitting the form posts and shows the new row.

Each numbered behavior above is its own RED→GREEN→commit→push. Do NOT batch.

# fullstack parallel demo

A full-stack app (React UI + FastAPI + SQLite) built to show the
[card-pilot-toolkit](https://github.com/liminalarc/card-pilot-toolkit)
**trunk-based parallel** flow producing a realistic commit history:

- **Vertically-sliced cards** — each feature card touches DB → API → UI, so it
  generates many commits, not one.
- **Triangulated TDD** — each layer is driven out by several failing tests (fake
  it → triangulate → generalize), each a small green commit.
- **Real-time intermingling** — two cards build concurrently in separate
  worktrees, each pushing after every green test, so `main` reads like a team
  pairing: `customers: repo.create`, `products: repo.create`,
  `customers: repo.list`, …

Read the history to see it:

```sh
git log --graph --oneline
```

## Layout

- `backend/` — FastAPI + SQLAlchemy + Alembic, tested with pytest (`uv run pytest`).
- `frontend/` — React + Vite + TypeScript, tested with Vitest + Testing Library (`npm test`).

A feature card adds a model + migration (DB), a router (API), and a component
(UI), then appends one line to each registry hub (`backend/app/main.py`,
`frontend/src/routes.tsx`). Everything else is its own files — disjoint lanes.

## Run it

```sh
cd backend && uv sync && uv run alembic upgrade head && uv run uvicorn app.main:app --reload
cd frontend && npm install && npm run dev
```

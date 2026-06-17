"""FastAPI application + router registry.

Feature cards add a router module under app/ and register it in the ROUTER
REGISTRY block below (an append-only hub edit).
"""
from fastapi import FastAPI

app = FastAPI(title="fullstack parallel demo")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


# --- ROUTER REGISTRY (append one include_router per feature card) ---

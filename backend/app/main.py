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
from app.customers_api import router as customers_router  # noqa: E402

app.include_router(customers_router)
from app.products_api import router as products_router  # noqa: E402

app.include_router(products_router)
from app.suppliers_api import router as suppliers_router  # noqa: E402

app.include_router(suppliers_router)
from app.categories_api import router as categories_router  # noqa: E402

app.include_router(categories_router)

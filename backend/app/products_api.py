"""Products API router."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import products_repo
from app.db import get_session

router = APIRouter()


@router.get("/products")
def list_products(session: Session = Depends(get_session)) -> list[dict]:
    return [
        {"id": p.id, "name": p.name, "price": p.price}
        for p in products_repo.list(session)
    ]

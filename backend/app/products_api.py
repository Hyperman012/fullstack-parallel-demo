"""Products API router."""
from fastapi import APIRouter, Depends, status
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app import products_repo
from app.db import get_session

router = APIRouter()


class ProductIn(BaseModel):
    name: str
    price: float = Field(ge=0)


@router.get("/products")
def list_products(session: Session = Depends(get_session)) -> list[dict]:
    return [
        {"id": p.id, "name": p.name, "price": p.price}
        for p in products_repo.list(session)
    ]


@router.post("/products", status_code=status.HTTP_201_CREATED)
def create_product(
    payload: ProductIn, session: Session = Depends(get_session)
) -> dict:
    new_id = products_repo.create(session, name=payload.name, price=payload.price)
    product = products_repo.get(session, new_id)
    return {"id": product.id, "name": product.name, "price": product.price}

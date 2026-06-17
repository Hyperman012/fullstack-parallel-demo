"""Customers API router."""
from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app import customers_repo
from app.db import get_session

router = APIRouter()


class CustomerIn(BaseModel):
    name: str = Field(min_length=1)


@router.get("/customers")
def list_customers(session: Session = Depends(get_session)) -> list[dict]:
    return [{"id": c.id, "name": c.name} for c in customers_repo.list(session)]


@router.post("/customers", status_code=201)
def create_customer(
    payload: CustomerIn, session: Session = Depends(get_session)
) -> dict:
    new_id = customers_repo.create(session, payload.name)
    return {"id": new_id, "name": payload.name}

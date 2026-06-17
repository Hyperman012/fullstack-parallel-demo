"""Suppliers API router."""
from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app import suppliers_repo
from app.db import get_session

router = APIRouter()


class SupplierIn(BaseModel):
    name: str = Field(min_length=1)


@router.get("/suppliers")
def list_suppliers(session: Session = Depends(get_session)) -> list[dict]:
    return [{"id": s.id, "name": s.name} for s in suppliers_repo.list(session)]


@router.post("/suppliers", status_code=201)
def create_supplier(
    payload: SupplierIn, session: Session = Depends(get_session)
) -> dict:
    new_id = suppliers_repo.create(session, payload.name)
    return {"id": new_id, "name": payload.name}

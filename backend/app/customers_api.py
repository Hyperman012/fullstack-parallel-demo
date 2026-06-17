"""Customers API router."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import customers_repo
from app.db import get_session

router = APIRouter()


@router.get("/customers")
def list_customers(session: Session = Depends(get_session)) -> list[dict]:
    return [{"id": c.id, "name": c.name} for c in customers_repo.list(session)]

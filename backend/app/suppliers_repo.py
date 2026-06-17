"""Repository for Supplier persistence."""
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Supplier


def create(session: Session, name: str) -> int:
    supplier = Supplier(name=name)
    session.add(supplier)
    session.commit()
    session.refresh(supplier)
    return supplier.id


def get(session: Session, supplier_id: int) -> Supplier | None:
    return session.get(Supplier, supplier_id)


def list(session: Session) -> list[Supplier]:
    return [s for s in session.scalars(select(Supplier).order_by(Supplier.id))]

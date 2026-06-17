"""Repository for Customer persistence."""
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Customer


def create(session: Session, name: str) -> int:
    customer = Customer(name=name)
    session.add(customer)
    session.commit()
    session.refresh(customer)
    return customer.id


def get(session: Session, customer_id: int) -> Customer | None:
    return session.get(Customer, customer_id)


def list(session: Session) -> list[Customer]:
    return [c for c in session.scalars(select(Customer).order_by(Customer.id))]

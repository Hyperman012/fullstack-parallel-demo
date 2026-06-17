"""Repository for Customer persistence."""
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

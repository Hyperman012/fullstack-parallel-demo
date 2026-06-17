"""Repository for Product persistence."""
from sqlalchemy.orm import Session


def create(session: Session, name: str, price: float) -> int:
    return 1

"""Repository for Customer persistence."""
from sqlalchemy.orm import Session


def create(session: Session, name: str) -> int:
    return 1

"""Repository for Category persistence (real SQLAlchemy implementation)."""
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Category


def create(session: Session, name: str) -> int:
    category = Category(name=name)
    session.add(category)
    session.commit()
    session.refresh(category)
    return category.id


def get(session: Session, category_id: int) -> Category | None:
    return session.get(Category, category_id)


def list(session: Session) -> list[Category]:
    return [c for c in session.scalars(select(Category).order_by(Category.id))]

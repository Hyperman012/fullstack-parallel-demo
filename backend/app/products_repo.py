"""Repository for Product persistence."""
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Product


def create(session: Session, name: str, price: float) -> int:
    product = Product(name=name, price=price)
    session.add(product)
    session.commit()
    session.refresh(product)
    return product.id


def get(session: Session, product_id: int) -> Product | None:
    return session.get(Product, product_id)


def list(session: Session) -> "list[Product]":
    return [*session.scalars(select(Product).order_by(Product.id))]

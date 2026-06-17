"""ORM models. Feature cards add their model class here; each owns its own class."""
from sqlalchemy.orm import Mapped, mapped_column

from app.db import Base  # noqa: F401  (re-exported so Alembic's env imports models)


class Customer(Base):
    __tablename__ = "customers"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(nullable=False)


class Product(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()
    price: Mapped[float] = mapped_column()

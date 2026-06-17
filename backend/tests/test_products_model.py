from app.db import Base, engine, SessionLocal
from app.models import Product


def test_product_persists():
    Base.metadata.create_all(bind=engine)
    session = SessionLocal()
    try:
        product = Product(name="Widget", price=9.99)
        session.add(product)
        session.commit()
        session.refresh(product)
        assert product.id is not None
        assert product.name == "Widget"
        assert product.price == 9.99
    finally:
        session.close()

from app.db import Base, SessionLocal, engine
from app.models import Customer


def test_customer_persists():
    Base.metadata.create_all(bind=engine)
    session = SessionLocal()
    try:
        customer = Customer(name="Acme")
        session.add(customer)
        session.commit()
        session.refresh(customer)
        assert customer.id is not None
        assert customer.name == "Acme"
    finally:
        session.close()

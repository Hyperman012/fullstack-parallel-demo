from app.db import Base, SessionLocal, engine
from app.models import Supplier


def _session():
    Base.metadata.create_all(bind=engine)
    return SessionLocal()


def test_supplier_persists():
    session = _session()
    try:
        supplier = Supplier(name="Acme Supply")
        session.add(supplier)
        session.commit()
        session.refresh(supplier)
        assert supplier.id is not None
        assert supplier.name == "Acme Supply"
    finally:
        session.close()

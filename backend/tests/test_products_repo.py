from app.db import Base, engine, SessionLocal
from app import products_repo


def _session():
    Base.metadata.create_all(bind=engine)
    return SessionLocal()


def test_create_returns_an_id():
    session = _session()
    try:
        new_id = products_repo.create(session, name="Widget", price=9.99)
        assert new_id is not None
    finally:
        session.close()

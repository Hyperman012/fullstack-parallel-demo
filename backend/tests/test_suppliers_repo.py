from app.db import Base, SessionLocal, engine
from app import suppliers_repo


def _session():
    Base.metadata.create_all(bind=engine)
    return SessionLocal()


def test_create_returns_id():
    session = _session()
    try:
        new_id = suppliers_repo.create(session, "Acme")
        assert new_id is not None
    finally:
        session.close()

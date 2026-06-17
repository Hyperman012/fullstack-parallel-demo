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


def test_get_returns_saved_supplier():
    session = _session()
    try:
        new_id = suppliers_repo.create(session, "Globex")
        found = suppliers_repo.get(session, new_id)
        assert found is not None
        assert found.id == new_id
        assert found.name == "Globex"
    finally:
        session.close()


def test_list_returns_multiple():
    session = _session()
    try:
        suppliers_repo.create(session, "Initech")
        suppliers_repo.create(session, "Umbrella")
        names = [s.name for s in suppliers_repo.list(session)]
        assert "Initech" in names
        assert "Umbrella" in names
    finally:
        session.close()

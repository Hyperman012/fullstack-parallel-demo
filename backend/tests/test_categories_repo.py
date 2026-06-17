from app.db import Base, SessionLocal, engine
from app import categories_repo


def _session():
    Base.metadata.create_all(bind=engine)
    return SessionLocal()


def test_create_returns_id():
    session = _session()
    try:
        new_id = categories_repo.create(session, "Hardware")
        assert new_id is not None
    finally:
        session.close()


def test_get_returns_saved_category():
    session = _session()
    try:
        new_id = categories_repo.create(session, "Software")
        found = categories_repo.get(session, new_id)
        assert found is not None
        assert found.id == new_id
        assert found.name == "Software"
    finally:
        session.close()


def test_list_returns_multiple():
    session = _session()
    try:
        categories_repo.create(session, "Hardware")
        categories_repo.create(session, "Software")
        names = [c.name for c in categories_repo.list(session)]
        assert "Hardware" in names
        assert "Software" in names
    finally:
        session.close()

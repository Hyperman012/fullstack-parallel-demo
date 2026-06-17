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


def test_get_returns_the_saved_product():
    session = _session()
    try:
        new_id = products_repo.create(session, name="Gadget", price=4.50)
        product = products_repo.get(session, new_id)
        assert product.id == new_id
        assert product.name == "Gadget"
        assert product.price == 4.50
    finally:
        session.close()


def test_list_returns_multiple_products():
    session = _session()
    try:
        products_repo.create(session, name="Alpha", price=1.0)
        products_repo.create(session, name="Beta", price=2.0)
        names = {p.name for p in products_repo.list(session)}
        assert {"Alpha", "Beta"} <= names
    finally:
        session.close()

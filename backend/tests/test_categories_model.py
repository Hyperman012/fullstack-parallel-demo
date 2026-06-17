from app.db import Base, SessionLocal, engine
from app.models import Category


def test_category_persists():
    Base.metadata.create_all(bind=engine)
    session = SessionLocal()
    try:
        category = Category(name="Hardware")
        session.add(category)
        session.commit()
        session.refresh(category)
        assert category.id is not None
        assert category.name == "Hardware"
    finally:
        session.close()

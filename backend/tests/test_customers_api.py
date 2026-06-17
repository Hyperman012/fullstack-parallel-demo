from fastapi.testclient import TestClient

from app.db import Base, engine
from app.main import app

client = TestClient(app)


def setup_module():
    Base.metadata.create_all(bind=engine)


def test_get_customers_returns_list():
    response = client.get("/customers")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

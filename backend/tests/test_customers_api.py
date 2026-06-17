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


def test_post_customers_creates_and_returns_id():
    response = client.post("/customers", json={"name": "Wayne Enterprises"})
    assert response.status_code == 201
    body = response.json()
    assert body["id"] is not None
    assert body["name"] == "Wayne Enterprises"

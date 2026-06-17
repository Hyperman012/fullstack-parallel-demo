from fastapi.testclient import TestClient

from app.db import Base, engine
from app.main import app

client = TestClient(app)


def setup_module():
    Base.metadata.create_all(bind=engine)


def test_get_suppliers_returns_list():
    response = client.get("/suppliers")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_post_suppliers_creates_and_returns_id():
    response = client.post("/suppliers", json={"name": "Wayne Enterprises"})
    assert response.status_code == 201
    body = response.json()
    assert body["id"] is not None
    assert body["name"] == "Wayne Enterprises"


def test_post_suppliers_blank_name_returns_422():
    response = client.post("/suppliers", json={"name": ""})
    assert response.status_code == 422

from fastapi.testclient import TestClient

from app.db import Base, engine
from app.main import app

client = TestClient(app)


def setup_module():
    Base.metadata.create_all(bind=engine)


def test_get_products_returns_the_list():
    response = client.get("/products")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_post_products_creates_and_returns_201_with_id():
    response = client.post("/products", json={"name": "Widget", "price": 9.99})
    assert response.status_code == 201
    body = response.json()
    assert body["id"] is not None
    assert body["name"] == "Widget"
    assert body["price"] == 9.99

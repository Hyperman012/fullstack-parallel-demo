from fastapi.testclient import TestClient

from app.categories_api import get_repository
from app.main import app


class FakeCategoryRepository:
    def __init__(self) -> None:
        self._items: dict[int, dict] = {}
        self._next_id = 1

    def create(self, name: str) -> int:
        new_id = self._next_id
        self._next_id += 1
        self._items[new_id] = {"id": new_id, "name": name}
        return new_id

    def get(self, category_id: int) -> dict | None:
        return self._items.get(category_id)

    def list(self) -> list[dict]:
        return list(self._items.values())


def make_client(repo: FakeCategoryRepository) -> TestClient:
    app.dependency_overrides[get_repository] = lambda: repo
    return TestClient(app)


def teardown_function():
    app.dependency_overrides.clear()


def test_get_categories_returns_list():
    repo = FakeCategoryRepository()
    repo.create("Hardware")
    client = make_client(repo)
    response = client.get("/categories")
    assert response.status_code == 200
    body = response.json()
    assert body == [{"id": 1, "name": "Hardware"}]

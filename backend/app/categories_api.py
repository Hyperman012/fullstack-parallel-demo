"""Categories API router.

Built against a CategoryRepository dependency so tests can override it with a
fake in-memory repo. The default provider wires in the real SQLAlchemy repo.
"""
from typing import Protocol

from fastapi import APIRouter, Depends, status
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.db import get_session

router = APIRouter()


class CategoryIn(BaseModel):
    name: str = Field(min_length=1)


class CategoryRepository(Protocol):
    def create(self, name: str) -> int: ...

    def get(self, category_id: int) -> dict | None: ...

    def list(self) -> list[dict]: ...


class SqlCategoryRepository:
    """Real repository adapter backed by a SQLAlchemy session."""

    def __init__(self, session: Session) -> None:
        self._session = session

    def create(self, name: str) -> int:
        from app import categories_repo

        return categories_repo.create(self._session, name)

    def get(self, category_id: int) -> dict | None:
        from app import categories_repo

        category = categories_repo.get(self._session, category_id)
        if category is None:
            return None
        return {"id": category.id, "name": category.name}

    def list(self) -> list[dict]:
        from app import categories_repo

        return [
            {"id": c.id, "name": c.name}
            for c in categories_repo.list(self._session)
        ]


def get_repository(
    session: Session = Depends(get_session),
) -> CategoryRepository:
    return SqlCategoryRepository(session)


@router.get("/categories")
def list_categories(
    repo: CategoryRepository = Depends(get_repository),
) -> list[dict]:
    return repo.list()


@router.post("/categories", status_code=status.HTTP_201_CREATED)
def create_category(
    payload: CategoryIn,
    repo: CategoryRepository = Depends(get_repository),
) -> dict:
    new_id = repo.create(payload.name)
    return {"id": new_id, "name": payload.name}

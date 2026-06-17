"""merge heads

Revision ID: 8832e13f0675
Revises: 4494ff2b716f, 882da7d5d1db
Create Date: 2026-06-17 11:31:16.122737

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8832e13f0675'
down_revision: Union[str, Sequence[str], None] = ('4494ff2b716f', '882da7d5d1db')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass

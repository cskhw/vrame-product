"""empty message

Revision ID: 58e4d6d43584
Revises: 
Create Date: 2022-10-25 03:13:18.538395

"""
import uuid

from sqlalchemy import TIMESTAMP, Column, ForeignKey, String, Boolean, text, INTEGER, VARCHAR, NVARCHAR, func
from sqlalchemy.dialects.postgresql import UUID
from alembic.op import create_table, drop_table


# revision identifiers, used by Alembic.
revision = '58e4d6d43584'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    create_table(
        "users",
        Column("id", UUID(as_uuid=True), primary_key=True, nullable=False, default=uuid.uuid4),
        Column("name", String, unique=False, nullable=False),
        Column("email", String, unique=True, nullable=False),
        Column("pwshash", String, nullable=False),
        Column("photo", String, nullable=True),
        Column("verification_code", String, nullable=True),
        Column("is_active",Boolean, nullable=False, server_default='False'),
        Column("role",String, server_default='user', nullable=False),
        Column("created_at",TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")),
        Column("updated_at",TIMESTAMP(timezone=True), nullable=True)
    )

    create_table(
        "posts",
        Column('id',UUID(as_uuid=True), primary_key=True, nullable=False, default=uuid.uuid4),
        Column('user_id',UUID(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'), nullable=False),
        Column('title',String, nullable=False),
        Column('content',String, nullable=False),
        Column('category',String, nullable=False),
        Column('image',String, nullable=False),
        Column('created_at',TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")),
        Column('updated_at',TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")),
    )

def downgrade():
    drop_table("posts")
    drop_table("users")
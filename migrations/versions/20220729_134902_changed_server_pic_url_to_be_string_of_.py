"""changed server_pic_url to be string of 1000 from 255

Revision ID: 56d1027bb1a2
Revises: 70079d5191a9
Create Date: 2022-07-29 13:49:02.295695

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '56d1027bb1a2'
down_revision = '70079d5191a9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('servers', 'server_pic_url',
                    existing_type=sa.String(length=255), type_=sa.String(length=1000))

    # ### end Alembic commands ###
    # , sa.Column('server_pic_url', sa.String(length=255), nullable=True)


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('servers', 'server_pic_url',
                    existing_type=sa.String(length=1000), type_=sa.String(length=255))
    # ### end Alembic commands ###

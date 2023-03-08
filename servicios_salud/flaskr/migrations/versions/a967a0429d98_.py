"""empty message

Revision ID: a967a0429d98
Revises: 3113b800b6db
Create Date: 2023-03-01 20:03:02.755899

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a967a0429d98'
down_revision = 'bd1e087c687b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('caso', schema=None) as batch_op:
        batch_op.add_column(sa.Column('tipo_consulta', sa.String(length=20), server_default='', nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('caso', schema=None) as batch_op:
        batch_op.drop_column('tipo_consulta')

    # ### end Alembic commands ###

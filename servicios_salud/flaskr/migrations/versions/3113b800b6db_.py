"""empty message

Revision ID: 3113b800b6db
Revises: 1542d060eb7d
Create Date: 2023-03-01 16:59:43.953339

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3113b800b6db'
down_revision = '1542d060eb7d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('caso', schema=None) as batch_op:
        batch_op.add_column(sa.Column('consulta', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'consulta', ['consulta'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('caso', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('consulta')

    # ### end Alembic commands ###

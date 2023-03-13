"""empty message

Revision ID: a967a0429d98
Revises: 3113b800b6db
Create Date: 2023-03-01 20:03:02.755899

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a967a0429d98'
down_revision = '3113b800b6db'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('consulta')
    with op.batch_alter_table('caso', schema=None) as batch_op:
        batch_op.add_column(sa.Column('tipo_consulta', sa.String(length=20), server_default='', nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('caso', schema=None) as batch_op:
        batch_op.drop_column('tipo_consulta')

    op.create_table('consulta',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('tipo', sa.VARCHAR(length=30), nullable=True),
    sa.Column('caso', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['caso'], ['caso.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###

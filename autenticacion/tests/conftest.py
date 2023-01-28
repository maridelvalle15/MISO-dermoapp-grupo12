from flaskr import app
import pytest


@pytest.fixture
def client():
    app.app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"
    #app.app.config['TESTING'] = True
    
    with app.app.test_client() as client:
        yield client
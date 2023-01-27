from flaskr import app
import pytest

@pytest.fixture
def client():
    with app.app.test_client() as client:
        yield client
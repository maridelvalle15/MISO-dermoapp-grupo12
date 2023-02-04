from flaskr import app
import pytest, flask
from flaskr.models import *
from flaskr.utils.seeds import Seeds

@pytest.fixture
def client():

    seeds = Seeds()
    seeds.poblar_lesion_tipo('mac', 'macula')
    seeds.poblar_lesion_forma('ani', 'anillo')
    seeds.poblar_lesion_numero('dis', 'diseminada')
    seeds.poblar_lesion_distribucion('asi', 'asimetrica')
        
    with app.app.test_client() as client:
        
        yield client
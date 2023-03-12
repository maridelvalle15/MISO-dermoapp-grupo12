from flaskr import app
import pytest, flask
from flaskr.models import db,Caso,CitaMedica
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

@pytest.fixture
def headers():
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    return headers

@pytest.fixture
def crear_caso(request):
    caso = Caso(
        tipo_lesion=1,
        forma=1,
        numero_lesiones=1,
        distribucion=1,
        paciente_id=1,
        tipo_solucion=request.param[0]
    )
    db.session.add(caso)
    db.session.commit()

    return caso

@pytest.fixture
def crear_cita(request):
    try:
        caso = Caso(
            tipo_lesion=1,
            forma=1,
            numero_lesiones=1,
            distribucion=1,
            paciente_id=1,
            tipo_solucion='medico'
        )
        db.session.add(caso)
        db.session.commit()

        cita = CitaMedica(
            medico_id = request.param[0]
        )
        db.session.add(cita)
        db.session.commit()
        return cita
    except:
        db.session.rollback()

        return False
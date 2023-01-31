from flaskr import app
import pytest
from flaskr.models.logica import Logica
from flaskr.models import db,Ubicacion,Especialidad,Rol,UsuarioMedico
from flaskr.utils.seeds import Seeds

@pytest.fixture
def client():

    seeds = Seeds()
    seeds.poblar_ubicacion('Colombia', 'Bogota')
    seeds.poblar_rol('Medico')
    seeds.poblar_especialidad('Lunares')
        
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
def crear_usuario_medico():
    logica = Logica()

    password='password'
    email='email1'
    nombre='nombre'
    direccion='direccion'
    ubicacion=Ubicacion.query.first().id
    licencia='licencia'
    especialidad=Especialidad.query.first().id
    rol=Rol.query.filter(Rol.nombre=='Medico').first()

    usuario = logica.usuario_valido(email)

    if usuario is None:
        usuario = UsuarioMedico(
                    password=password,email=email,nombre=nombre,direccion=direccion,ubicacion_id=ubicacion,licencia=licencia,especialidad_id=especialidad)    
        usuario.roles.append(rol)
        db.session.add(usuario)
        db.session.commit()

    return usuario
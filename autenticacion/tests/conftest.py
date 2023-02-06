from flaskr import app
import pytest
from flaskr.models.logica import Logica
from flaskr.models import db,Ubicacion,Especialidad,Rol,UsuarioMedico,UsuarioPaciente
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

@pytest.fixture
def crear_usuario_paciente(request):
    logica = Logica()

    password='password'
    email=request.param[0]
    nombre='nombre'
    direccion='direccion'
    ubicacion=Ubicacion.query.first().id
    edad=30
    cedula=request.param[1]
    tipopiel="seca"
    rol=Rol.query.filter(Rol.nombre=='Paciente').first()

    usuario = logica.usuario_valido(email)

    if usuario is None:
        usuario = UsuarioPaciente(
                    password=password,email=email,nombre=nombre,direccion=direccion,ubicacion_id=ubicacion,
                    edad=edad,cedula=cedula,tipo_piel=tipopiel,imagen_piel='')    
        usuario.roles.append(rol)
        db.session.add(usuario)
        db.session.commit()

    return usuario
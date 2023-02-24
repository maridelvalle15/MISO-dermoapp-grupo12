from flaskr.models import Ubicacion, Especialidad
import pytest, json

class TestRegistro:
    def test_crear_usuario_existente(self,client,headers,crear_usuario_medico):

        usuario = crear_usuario_medico

        data = {
            'correo': usuario.email,
            'nombre': 'nombre prueba',
            'direccion': 'direccion prueba',
            'tipousuario': 'MEDICO'
        }

        response = client.post('/api/registro', data=json.dumps(data), headers=headers)

        assert response.status_code==400
        assert response.json['message'] == 'El usuario ya existe'

    def test_ubicacion_invalida(self,client,headers,crear_usuario_medico):

        usuario = crear_usuario_medico

        data = {
            'tipousuario': 'MEDICO',
            'correo': usuario.email + 'nuevoEmail',
            'nombre': 'nombre prueba',
            'direccion': 'direccion prueba',
            'pais': 'pais no valido',
            'ciudad': 'ciudad no valida',
        }

        response = client.post('/api/registro', data=json.dumps(data), headers=headers)

        assert response.status_code==400
        assert response.json['message'] == 'ubicacion no valida'

    def test_especialidad_invalida(self,client,headers,crear_usuario_medico):

        usuario = crear_usuario_medico

        ubicacion = Ubicacion.query.first()

        data = {
            'tipousuario': 'MEDICO',
            'correo': usuario.email + 'nuevoEmail1',
            'nombre': 'nombre prueba',
            'direccion': 'direccion prueba',
            'pais': ubicacion.pais,
            'ciudad': ubicacion.ciudad,
            'especialidad': 'especialidad no valida'
        }

        response = client.post('/api/registro', data=json.dumps(data), headers=headers)

        assert response.status_code==400
        assert response.json['message'] == 'especialidad no valida'

    def test_crear_usuario_medico_exitosamente(self,client,headers,crear_usuario_medico):
        usuario = crear_usuario_medico

        ubicacion = Ubicacion.query.first()
        especialidad = Especialidad.query.first()

        data = {
            'tipousuario': 'MEDICO',
            'correo': usuario.email + 'nuevoEmail2',
            'nombre': 'nombre prueba',
            'direccion': 'direccion prueba',
            'pais': ubicacion.pais,
            'ciudad': ubicacion.ciudad,
            'especialidad': especialidad.nombre,
            'licencia': 'XX12900s'
        }

        response = client.post('/api/registro', data=json.dumps(data), headers=headers)

        assert response.status_code==200
        assert response.json['message'] == 'usuario creado exitosamente'
        assert response.json['password'] != ''
        assert response.json['password'] is not None

    @pytest.mark.parametrize('crear_usuario_paciente', [['paciente', 'cedulapaciente']], indirect=True)
    def test_crear_usuario_paciente_exitosamente(self,client,crear_usuario_paciente):
        usuario = crear_usuario_paciente

        ubicacion = Ubicacion.query.first()
        data = {
            'tipousuario': 'PACIENTE',
            'correo': usuario.email + 'nuevoEmail',
            'nombre': 'nombre prueba',
            'direccion': 'direccion prueba',
            'pais': ubicacion.pais,
            'ciudad': ubicacion.ciudad,
            'edad': 30,
            'cedula': '1121',
            'tipopiel': 'oily',
            'imagen_piel': ''
        }

        response = client.post('/api/registro', data=data)

        assert response.status_code==200
        assert response.json['message'] == 'usuario creado exitosamente'
        assert response.json['password'] != ''
        assert response.json['password'] is not None

    def test_crear_tipo_usuario_no_valido(self,client):
        ubicacion = Ubicacion.query.first()
        data = {
            'tipousuario': 'otro',
            'correo': 'nuevoEmail1',
            'nombre': 'nombre prueba',
            'direccion': 'direccion prueba',
            'pais': ubicacion.pais,
            'ciudad': ubicacion.ciudad
        }

        response = client.post('/api/registro', data=data)

        assert response.status_code==400
        assert response.json['message'] == 'tipo de usuario no valido'
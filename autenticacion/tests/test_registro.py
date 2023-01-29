import json
from flaskr.models import Ubicacion, Especialidad

class TestRegistro:
    def test_crear_usuario_existente(self,client,headers,crear_usuario_medico):

        usuario = crear_usuario_medico

        data = {
            'email': usuario.email
        }

        response = client.post('/api/registro', data=json.dumps(data), headers=headers)

        assert response.status_code==400
        assert response.json['message'] == 'El usuario ya existe'

    def test_ubicacion_invalida(self,client,headers,crear_usuario_medico):

        usuario = crear_usuario_medico

        data = {
            'tipo_usuario': 'MEDICO',
            'email': usuario.email + 'nuevoEmail',
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
            'tipo_usuario': 'MEDICO',
            'email': usuario.email + 'nuevoEmail',
            'nombre': 'nombre prueba',
            'direccion': 'direccion prueba',
            'pais': ubicacion.pais,
            'ciudad': ubicacion.ciudad,
            'especialidad': 'especialidad no valida'
        }

        response = client.post('/api/registro', data=json.dumps(data), headers=headers)

        assert response.status_code==400
        assert response.json['message'] == 'especialidad no valida'

    def test_crear_usuario_exitosamente(self,client,headers,crear_usuario_medico):
        usuario = crear_usuario_medico

        ubicacion = Ubicacion.query.first()
        especialidad = Especialidad.query.first()

        data = {
            'tipo_usuario': 'MEDICO',
            'email': usuario.email + 'nuevoEmail',
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

import pytest
from flaskr.models import Usuario

class TestLogIn:
    @pytest.mark.parametrize('crear_usuario_paciente', [['paciente2', 'cedulapaciente2']], indirect=True)
    def test_login_exitoso_usuario_paciente(self,client,crear_usuario_paciente):
        usuario_paciente = crear_usuario_paciente

        usuario = Usuario.query.filter(Usuario.id == usuario_paciente.id).first()

        data = {
            'correo': usuario.email,
            'password': 'password'
        }

        response = client.post('/api/login', data=data)

        assert response.status_code==200
        assert response.json['message'] == 'Inicio de sesión exitoso'
        assert response.json['token'] != ''
        assert response.json['token'] is not None
        assert response.json['user_id'] == usuario.id

    def test_login_fallido(self,client):

        data = {
            'correo': 'correo@fallido',
            'password': 'password'
        }

        response = client.post('/api/login', data=data)

        assert response.status_code==404
        assert response.json['message'] == 'El usuario no existe'

    @pytest.mark.parametrize('crear_usuario_medico', [['medico2', 'cedulamedico2']], indirect=True)
    def test_login_exitoso_usuario_medico(self,client,crear_usuario_medico):
        usuario_medico = crear_usuario_medico

        usuario = Usuario.query.filter(Usuario.id == usuario_medico.id).first()

        data = {
            'correo': usuario.email,
            'password': 'password'
        }

        response = client.post('/api/login', data=data)

        assert response.status_code==200
        assert response.json['message'] == 'Inicio de sesión exitoso'
        assert response.json['token'] != ''
        assert response.json['token'] is not None
        assert response.json['user_id'] == usuario.id
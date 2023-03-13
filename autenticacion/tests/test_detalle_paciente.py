from flaskr.models import UsuarioPaciente
import pytest, json

@pytest.mark.parametrize('crear_usuario_paciente', [['detalle_paciente', 'detalle_cedulapaciente']], indirect=True)
class TestDetallePaciente():
    def test_solicitar_detalle_paciente(self,client,crear_usuario_paciente, headers):
        usuario_paciente = crear_usuario_paciente

        usuario = UsuarioPaciente.query.filter(UsuarioPaciente.id == usuario_paciente.id).first()

        data = {
            'correo': usuario.email,
            'password': 'password'
        }

        response1 = client.post('/api/login', data=json.dumps(data), headers=headers)
        token = response1.json['token']
        
        headers = {'Authorization': 'Bearer ' + token}

        response = client.get('/api/informacion-paciente/' + str(usuario.id), headers=headers)

        assert response.status_code==200
        assert "tipo_piel" in response.json
        assert "edad" in response.json
        assert "cedula" in response.json
        assert "ciudad" in response.json
        assert "nombre" in response.json
        assert "direccion" in response.json
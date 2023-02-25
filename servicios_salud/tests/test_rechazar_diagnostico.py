from flaskr.models import *
import json, pytest

class TestReclamarCaso:
    def test_medico_no_puede_rechazar_diagnostico(self,client,mocker):
        
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Medico", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''

        response = client.post('/api/rechazar-diagnostico')

        assert response.status_code==401
        assert response.json['message'] == 'Unauthorized'

    @pytest.mark.parametrize('crear_caso', [['']], indirect=True)
    def test_paciente_rechaza_diagnostico_exitosamente(self,client,mocker,headers,crear_caso):
        
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Medico", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''
        request_mock.return_value.status_code = 200

        caso = crear_caso

        data = {
            'caso_id': caso.id,
            'diagnostico': "diagnostico"
        }

        client.post('/api/diagnostico-paciente',data=json.dumps(data),headers=headers)

        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Paciente", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''
        request_mock.return_value.status_code = 200

        data2 = {
            'caso_id': caso.id,
        }

        response2 = client.post('/api/rechazar-diagnostico',data=json.dumps(data2),headers=headers)

        assert response2.status_code==200
        assert response2.json['message'] == 'Diagnostico rechazado exitosamente'
        assert response2.json['caso_id'] == caso.id

    @pytest.mark.parametrize('crear_caso', [['']], indirect=True)
    def test_paciente_no_rechaza_caso_sin_diagnostico(self,client,mocker,headers,crear_caso):
        
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Paciente", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''
        request_mock.return_value.status_code = 200
        caso = crear_caso
        data = {
            'caso_id': caso.id,
        }

        response2 = client.post('/api/rechazar-diagnostico',data=json.dumps(data),headers=headers)

        assert response2.status_code==400
        assert response2.json['message'] == 'No fue posible rechazar el diagnostico'
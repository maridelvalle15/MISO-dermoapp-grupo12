from flaskr.models import *
import json

class TestReclamarCaso:
    def test_paciente_no_puede_reclamar_caso_caso(self,client,mocker,headers,crear_caso):
        
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Paciente", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''

        caso = crear_caso
        data = {
            'caso_id': caso.id,
        }

        response = client.post('/api/reclamar-caso',data=json.dumps(data),headers=headers)

        assert response.status_code==401
        assert response.json['message'] == 'Unauthorized'

    def test_medico_reclama_caso(self,client,mocker,headers,crear_caso):
        
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Medico", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''
        request_mock.return_value.status_code = 200

        caso = crear_caso
        data = {
            'caso_id': caso.id,
        }

        response = client.post('/api/reclamar-caso',data=json.dumps(data),headers=headers)

        assert response.status_code==200
        assert response.json['message'] == 'Caso asignado'
        assert response.json['caso_id'] == caso.id

    def test_paciente_no_puede_obtener_casos_reclamados(self,client,mocker):
        
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Paciente", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''

        response = client.get('/api/reclamar-caso')

        assert response.status_code==401
        assert response.json['message'] == 'Unauthorized'

    def test_medico_obtiene_casos_reclamados(self,client,mocker):
        
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Medico", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''
        request_mock.return_value.status_code = 200

        response = client.get('/api/reclamar-caso')

        assert response.status_code==200
        assert "casos" in response.json
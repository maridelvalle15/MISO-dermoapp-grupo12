import json

class TestDetallePaciente():
    def test_paciente_no_puede_ver_detalle_paciente(self,client,mocker):
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Paciente", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''
        request_mock.return_value.status_code = 401

        response = client.get('/api/detalle-paciente/1')

        assert response.status_code==401
        assert response.json['message'] == 'Unauthorized'

    def test_medico_ve_detalle_paciente(self,client,mocker):
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Medico", "especialidad": "especialidad", \
            "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion", "edad": 3, "cedula": "1234", "tipo_piel": "piel", "ciudad":"bog"}\n'
        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''
        request_mock.return_value.status_code = 200

        response = client.get('/api/detalle-paciente/1')

        assert response.status_code==200
        assert "tipo_piel" in response.json
        assert "edad" in response.json
        assert "cedula" in response.json
        assert "ciudad" in response.json
        assert "nombre" in response.json
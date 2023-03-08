import json, pytest

class TestSolicitarTratamiento():
    def test_medico_no_puede_solicitar_tratamiento(self,client,mocker):
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Medico", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''
        request_mock.return_value.status_code = 401

        response = client.post('/api/solicitar-cita')

        assert response.status_code==401
        assert response.json['message'] == 'Unauthorized'

    @pytest.mark.parametrize('crear_caso', [['']], indirect=True)
    def test_paciente_solicita_tratamiento(self,client,mocker,headers,crear_caso):
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Medico", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''
        request_mock.return_value.status_code = 200

        caso = crear_caso

        data1 = {
            'caso_id': caso.id,
            'diagnostico': "diagnostico"
        }

        client.post('/api/diagnostico-paciente',data=json.dumps(data1),headers=headers)

        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Paciente", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        data = {
            'caso_id': caso.id
        }

        response = client.post('/api/solicitar-cita',data=json.dumps(data),headers=headers)

        assert response.status_code==200
        assert response.json['message'] == 'Tratamiento solicitado'
        assert response.json['caso_id'] == caso.id

    @pytest.mark.parametrize('crear_caso', [['']], indirect=True)
    def test_paciente_no_puede_solicitar_tratamiento_sin_diagnostico(self,client,mocker,headers,crear_caso):
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Paciente", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''
        request_mock.return_value.status_code = 200

        caso = crear_caso

        data = {
            'caso_id': caso.id
        }

        response = client.post('/api/solicitar-cita',data=json.dumps(data),headers=headers)

        assert response.status_code==400
        assert response.json['message'] == 'No pudo completarse la solicitud de tratamiento'
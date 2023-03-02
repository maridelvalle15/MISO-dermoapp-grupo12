import json, pytest

class TestConsulta():
    def test_medico_no_puede_definir_tipo_consulta(self,client,mocker):
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Medico", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''
        request_mock.return_value.status_code = 401

        response = client.post('/api/tipo-consulta')

        assert response.status_code==401
        assert response.json['message'] == 'Unauthorized'

    @pytest.mark.parametrize('crear_caso', [['']], indirect=True)
    def test_paciente_solicita_tipo_consulta_presencial(self,client,mocker,headers,crear_caso):
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Paciente", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''
        request_mock.return_value.status_code = 200

        caso = crear_caso
        data = {
            'caso_id': caso.id,
            'tipo_consulta': "Presencial"
        }

        response = client.post('/api/tipo-consulta',data=json.dumps(data),headers=headers)

        assert response.status_code==200
        assert response.json['message'] == 'Tipo de consulta asignado exitosamente'
        assert response.json['caso_id'] == caso.id

    @pytest.mark.parametrize('crear_caso', [['']], indirect=True)
    def test_paciente_solicita_tipo_consulta_telemedicina(self,client,mocker,headers,crear_caso):
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Paciente", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''
        request_mock.return_value.status_code = 200

        caso = crear_caso
        data = {
            'caso_id': caso.id,
            'tipo_consulta': "Telemedicina"
        }

        response = client.post('/api/tipo-consulta',data=json.dumps(data),headers=headers)

        assert response.status_code==200
        assert response.json['message'] == 'Tipo de consulta asignado exitosamente'
        assert response.json['caso_id'] == caso.id

    @pytest.mark.parametrize('crear_caso', [['']], indirect=True)
    def test_paciente_no_puede_solicitar_dos_veces_tipo_consulta(self,client,mocker,headers,crear_caso):
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Paciente", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''
        request_mock.return_value.status_code = 200

        caso = crear_caso
        data = {
            'caso_id': caso.id,
            'tipo_consulta': "Telemedicina"
        }

        client.post('/api/tipo-consulta',data=json.dumps(data),headers=headers)
        response = client.post('/api/tipo-consulta',data=json.dumps(data),headers=headers)

        assert response.status_code==400
        assert response.json['message'] == 'No fue posible asignar el tipo de consulta'

    @pytest.mark.parametrize('crear_caso', [['']], indirect=True)
    def test_paciente_solicita_tipo_consulta_no_permitido(self,client,mocker,headers,crear_caso):
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Paciente", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''
        request_mock.return_value.status_code = 200

        caso = crear_caso
        data = {
            'caso_id': caso.id,
            'tipo_consulta': "cualquiera"
        }

        response = client.post('/api/tipo-consulta',data=json.dumps(data),headers=headers)

        assert response.status_code==400
        assert response.json['message'] == 'Tipo de consulta no valida. Opciones validas: Presencial - Telemedicina'
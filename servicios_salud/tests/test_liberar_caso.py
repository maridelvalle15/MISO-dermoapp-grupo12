import json, pytest

class TestLiberarCaso():
    def test_paciente_no_puede_liberar_caso(self,client,mocker):
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Paciente", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''
        request_mock.return_value.status_code = 401

        response = client.post('/api/liberar-caso')

        assert response.status_code==401
        assert response.json['message'] == 'Unauthorized'

    @pytest.mark.parametrize('crear_caso', [['']], indirect=True)
    def test_medico_libera_caso_sin_diagnostico(self,client,mocker,headers,crear_caso):
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Medico", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''
        request_mock.return_value.status_code = 200

        caso = crear_caso
        data = {
            'caso_id': caso.id
        }

        response = client.post('/api/liberar-caso',data=json.dumps(data),headers=headers)

        assert response.status_code==200
        assert response.json['message'] == 'Caso liberado exitosamente'
        assert response.json['caso_id'] == caso.id

    @pytest.mark.parametrize('crear_caso', [['']], indirect=True)
    def test_medico_libera_caso_con_diagnostico(self,client,mocker,headers,crear_caso):
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

        data2 = {
            'caso_id': caso.id
        }

        response = client.post('/api/liberar-caso',data=json.dumps(data2),headers=headers)

        assert response.status_code==200
        assert response.json['message'] == 'Caso liberado exitosamente'
        assert response.json['caso_id'] == caso.id

    @pytest.mark.parametrize('crear_caso', [['']], indirect=True)
    def test_no_se_puede_liberar_caso_que_no_existe(self,client,mocker,headers,crear_caso):
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Medico", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''
        request_mock.return_value.status_code = 200

        caso = crear_caso

        data = {
            'caso_id': 0
        }

        response = client.post('/api/liberar-caso',data=json.dumps(data),headers=headers)

        assert response.status_code==400
        assert response.json['message'] == 'No fue posible liberar el caso'
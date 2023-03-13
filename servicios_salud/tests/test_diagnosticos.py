import json, pytest

class TestDiagnosticos():
    @pytest.mark.parametrize('crear_caso', [['']], indirect=True)
    def test_generar_diagnostico_automatico_correcto(self,client,headers,crear_caso):
        caso = crear_caso
        data = {
            'caso_id': caso.id,
        }

        response = client.post('/api/diagnostico-automatico',data=json.dumps(data),headers=headers)

        assert response.status_code==200
        assert "diagnostico" in response.json

    @pytest.mark.parametrize('crear_caso', [['']], indirect=True)
    def test_diagnostico_solo_se_genera_una_vez(self,client,headers,crear_caso):
        caso = crear_caso
        data = {
            'caso_id': caso.id,
        }

        response = client.post('/api/diagnostico-automatico',data=json.dumps(data),headers=headers)
        response2 = client.post('/api/diagnostico-automatico',data=json.dumps(data),headers=headers)

        assert response2.status_code==400
        assert response2.json['message'] == 'No es posible realizar un diagnóstico al caso asignado'

    def test_medico_no_puede_ver_diagnostico_automatico(self,client,mocker):
        
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Medico", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''

        response = client.get('/api/informacion-diagnostico/1')

        assert response.status_code==401
        assert response.json['message'] == 'Unauthorized'

    @pytest.mark.parametrize('crear_caso', [['']], indirect=True)
    def test_paciente_ve_diagnostico_automatico(self,client,mocker,headers,crear_caso):
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Paciente", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''
        request_mock.return_value.status_code = 200

        caso = crear_caso
        data = {
            'caso_id': caso.id,
        }

        client.post('/api/diagnostico-automatico',data=json.dumps(data),headers=headers)
        

        response = client.get('/api/informacion-diagnostico/'+str(caso.id))

        assert response.status_code==200
        assert "diagnostico" in response.json

    def test_medico_no_puede_solicitar_tipo_diagnostico_medico(self,client,mocker):
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Medico", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''

        response = client.post('/api/diagnostico-medico')

        assert response.status_code==401
        assert response.json['message'] == 'Unauthorized'

    @pytest.mark.parametrize('crear_caso', [['']], indirect=True)
    def test_paciente_solicita_tipo_diagnostico_medico(self,client,mocker,headers,crear_caso):
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Paciente", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''
        request_mock.return_value.status_code = 200

        caso = crear_caso
        data = {
            'caso_id': caso.id,
        }

        response = client.post('/api/diagnostico-medico',data=json.dumps(data),headers=headers)

        assert response.status_code==200
        assert response.json['message'] == 'Tipo de diagnostico medico asignado exitosamente'
        assert response.json['caso_id'] == caso.id

    @pytest.mark.parametrize('crear_caso', [['auto']], indirect=True)
    def test_caso_con_tipo_diagnostico_no_puede_reasignarse_para_diagnostico_medico(self,client,mocker,headers,crear_caso):
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Paciente", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''
        request_mock.return_value.status_code = 200

        caso = crear_caso
        data = {
            'caso_id': caso.id,
        }

        response = client.post('/api/diagnostico-medico',data=json.dumps(data),headers=headers)

        assert response.status_code==400
        assert response.json['message'] == 'No fue posible asignar el tipo de diagnostico al caso'

    def test_paciente_no_puede_generar_diagnostico_medico(self,client,mocker):
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Paciente", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''

        response = client.post('/api/diagnostico-paciente')

        assert response.status_code==401
        assert response.json['message'] == 'Unauthorized'

    @pytest.mark.parametrize('crear_caso', [['medico']], indirect=True)
    def test_medico_genera_diagnostico(self,client,mocker,headers,crear_caso):
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

        response = client.post('/api/diagnostico-paciente',data=json.dumps(data),headers=headers)

        assert response.status_code==200
        assert response.json['message'] == 'Diagnóstico generado'
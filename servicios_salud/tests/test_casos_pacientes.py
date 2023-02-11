class TestCasosPacientes:
    def test_paciente_no_puede_llamar_servicio_casos_pacientes(self,client,mocker):
        
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Paciente", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''

        response = client.get('/api/casos-pacientes')

        assert response.status_code==401
        assert response.json['message'] == 'Unauthorized'

    def test_medico_obtiene_casos_pacientes(self,client,mocker):
        
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Medico", "especialidad": "General", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'
        request_mock.return_value.status_code = 200

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''

        response = client.get('/api/casos-pacientes')

        assert response.status_code==200
        assert "casos" in response.json
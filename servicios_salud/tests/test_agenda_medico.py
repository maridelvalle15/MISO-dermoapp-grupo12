import json, pytest

class TestAgendaMedico():
    def test_paciente_no_ve_agenda_medico(self,client,mocker):
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Paciente", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''
        request_mock.return_value.status_code = 401

        response = client.get('/api/agenda-medico')

        assert response.status_code==401
        assert response.json['message'] == 'Unauthorized'

    @pytest.mark.parametrize('crear_cita', [['3']], indirect=True)
    def test_medico_ve_su_agenda(self,client,mocker,headers,crear_cita):
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Medico", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''
        request_mock.return_value.status_code = 200

        response = client.get('/api/agenda-medico', headers=headers)

        assert response.status_code==200
        assert "agenda" in response.json
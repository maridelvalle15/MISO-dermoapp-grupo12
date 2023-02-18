import json

class TestDiagnosticos():
    def test_generar_diagnostico_automatico_correcto(self,client,headers,crear_caso):
        caso = crear_caso
        data = {
            'caso_id': caso.id,
        }

        response = client.post('/api/diagnostico-automatico',data=json.dumps(data),headers=headers)

        assert response.status_code==200
        assert "diagnostico" in response.json

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